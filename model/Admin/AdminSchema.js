const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "aslkdjfkjasdfhaklsdjfhkjsd"

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
}, { timestamps: true });

// password hashing
adminSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next()
});


// token generate
adminSchema.methods.generateAuthtoken = async function () {
    try {
        let newtoken = jwt.sign({ _id: this._id }, SECRECT_KEY, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: newtoken });
console.log("newtoken",newtoken)
        await this.save();
        return newtoken;
    } catch (error) {
        res.status(400).json({ error: error })
    }
}


// model
const adminDB = new mongoose.model("admins",adminSchema);
module.exports = adminDB;