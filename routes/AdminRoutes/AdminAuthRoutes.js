const express = require("express");
const router = new express.Router();
const AdminAuthControllers = require("../../controllers/AdminController/AdminAuthController");

// admin auth routes
router.post("/register",AdminAuthControllers.AdminRegister);
router.post("/login",AdminAuthControllers.AdminLogin);
router.post("/logout",AdminAuthControllers.AdminLogOut);




module.exports = router;