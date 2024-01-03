const express = require("express");
const router = new express.Router();
const AdminAuthenticate = require("../../middleware/Admin/Adminmiddleware");
const Usercontrollerforadmin = require("../../controllers/AdminController/UserControllerforAdmin");

// routes
router.post("/register",AdminAuthenticate,Usercontrollerforadmin.Register);

// email send routes for user
router.post("/emailsend",AdminAuthenticate,Usercontrollerforadmin.SendEmail);

router.get("/userverify/:id/:token",Usercontrollerforadmin.Verify);

module.exports = router;