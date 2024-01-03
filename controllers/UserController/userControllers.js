const userDB = require("../../model/User/userschema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const userDbAdmin = require("../../model/Admin/UserSchemaforAdmin");


// email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


exports.Register = async (req, res) => {
    const { username, email, password, categoryid } = req.body;

    if (!username || !email || !password || !categoryid) {
        res.status(400).json({ error: "all fields are required" });
    } else {
        try {
            const preuser = await userDbAdmin.findOne({ email: email });


            // if (preuser) {
            //     res.status(400).json({ error: "This user is already exist" });
            // } else {
            const userData = new userDB({
                username, email, password, categoryid, experienceLevel: preuser.experienceLevel
            });

            // here password hasing


            await userData.save();
            // token generate
            const token = await userData.generateAuthtoken();

            await userData.save();


            const userfinaldata = await userDB.findOne({ _id: userData._id }).select({ "password": 0 })

            const result = {
                userfinaldata,
                token
            }
            res.status(200).json(result)
            // }
        } catch (error) {
            console.log("error", error)
            res.status(400).json({ error: error })
        }
    }
}

// exports.Login = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         res.status(400).json({ error: "fill all the details" })
//     }

//     try {
//         const userValid = await userDB.findOne({ email: email });

//         if (userValid) {

//             const isMatch = await bcrypt.compare(password, userValid.password);

//             if (!isMatch) {
//                 res.status(400).json({ error: "invalid details" })
//             } else {

//                 // token generate
//                 const token = await userValid.generateAuthtoken();

//                 if (token) {
//                     const mailOptions = {
//                         from: process.env.EMAIL,
//                         to: email,
//                         subject: "Quiz App Project",
//                         html: `<a href="https://localhost:3000/quiz/${userValid.id}/${token}"> Click Here</a>`
//                     }

//                     transporter.sendMail(mailOptions, (error, info) => {
//                         if (error) {
//                             console.log("error", error);
//                             res.status(400).json({ error: "email not send" })
//                         } else {
//                             console.log("Email sent", info.response);
//                             res.status(200).json({ message: "Email sent Succsfully" })
//                         }
//                     })
//                 }

//                 const result = {
//                     userValid,
//                     token
//                 }
//                 res.status(200).json(result)
//             }
//         } else {
//             res.status(400).json({ error: "This user is not exist in db" })
//         }

//     } catch (error) {
//         console.log("catch block error", error)
//         res.status(400).json({ error: error });

//     }
// }