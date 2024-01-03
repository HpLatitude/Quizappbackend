const adminDB = require("../../model/Admin/AdminSchema");
const bcrypt = require("bcryptjs");

// admin register
exports.AdminRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ error: "all fields are required" });
    }

    try {
        const preuser = await adminDB.findOne({ email: email });

        if (preuser) {
            res.status(400).json({ error: "This admin is already exist" });
        } else {
            const adminData = new adminDB({
                name, email, password
            });

            // here password hasing

            await adminData.save();
            res.status(200).json(adminData);
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

// admin login
exports.AdminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill all the details" })
    }

    try {
        const userValid = await adminDB.findOne({ email: email });


        if (userValid) {

            const isMatch = await bcrypt.compare(password, userValid.password);


            if (!isMatch) {
                res.status(400).json({ error: "invalid details" })
            } else {

                // token generate
                const token = await userValid.generateAuthtoken();

                const AdminInfo = await adminDB.findOne({ email: email }).select({ "email": 1 });

                const result = {
                    AdminInfo,
                    token
                }
                res.status(200).json(result)
            }
        } else {
            res.status(400).json({ error: "This Admin is not exist in db" })
        }

    } catch (error) {
        console.log("catch block error", error)
        res.status(400).json({ error: error });

    }
}

// admin logout
exports.AdminLogOut = async (req, res) => {

}