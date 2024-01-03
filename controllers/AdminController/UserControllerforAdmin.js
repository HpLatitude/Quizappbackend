const userDbAdmin = require("../../model/Admin/UserSchemaforAdmin");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "jhkhjgsdgvfsdasfkjhsdf";
const nodemailer = require("nodemailer");


// email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// user register for admin
exports.Register = async (req, res) => {
    const { username, email, experienceLevel } = req.body;

    if (!username || !email || !experienceLevel) {
        res.status(400).json({ error: "All fields are require" });
    } else {
        try {
            const preuser = await userDbAdmin.findOne({ email: email });

            if (preuser) {
                res.status(400).json({ error: "This user is already exist in our db" });
            } else {
                const Userdata = await new userDbAdmin({
                    username, email, experienceLevel
                });

                await Userdata.save();

                res.status(200).json({ message: "user register sucessfully done" })
            }
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

// SendEmail
exports.SendEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: "Enter Your Email" })
    } else {
        try {
            const checkUser = await userDbAdmin.findOne({email:email});

            // token generate
            const token = jwt.sign({_id:checkUser._id},SECRET_KEY,{
                expiresIn:"600s"
            });


            if(token){
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Quiz App Project",
                    html: `<a href="https://localhost:3000/quiz/${checkUser.id}/${token}"> Click Here</a>`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Succsfully" })
                    }
                })
            }else{
                res.status(400).json({error:"user not found"})
            }
        } catch (error) {
            res.status(400).json({ error: error })
        }
    }
}

// Verify

exports.Verify = async(req,res)=>{
    const {id,token} = req.params;

    try {
        const verifyToken = jwt.verify(token,SECRET_KEY);
        if(verifyToken._id){
            res.status(200).json({message:"Valid user"})
        }else{
            res.status(400).json({error:"your session time out please generate new link"})
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
}