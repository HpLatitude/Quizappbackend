const mongoose = require("mongoose");
const validator = require("validator")


// user schema for admin
const userSchemaforAdmin = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    experienceLevel:{
        type:Number,
        required:true
    }
},{timestamps:true});

// usermodel for admin
const userDbAdmin = new mongoose.model("userDbAdmins",userSchemaforAdmin);
module.exports = userDbAdmin;