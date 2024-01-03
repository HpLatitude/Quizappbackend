const adminDb = require("../../model/Admin/AdminSchema");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "aslkdjfkjasdfhaklsdjfhkjsd"


const adminauthenticate = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        
        const verifytoken = jwt.verify(token,SECRECT_KEY);
        
        console.log("first",verifytoken._id)
        const rootUser = await adminDb.findOne({_id:verifytoken._id});

        
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(400).json({ error: "Unauthorized no token provide" })
    }
}

module.exports = adminauthenticate;