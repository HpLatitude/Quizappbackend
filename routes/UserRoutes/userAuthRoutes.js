const express = require("express");
const router = new express.Router();
const userAuthControllers = require("../../controllers/UserController/userControllers");

// user routes
router.post("/register",userAuthControllers.Register)
// router.post("/login",userAuthControllers.Login)

module.exports = router;