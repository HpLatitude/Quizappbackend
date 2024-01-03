const express = require("express");
const router = new express.Router();
const ScoreController = require("../../controllers/AdminController/ScoreController");
const userauthenticate = require("../../middleware/User/Usermiddleware");


// Score routes
router.post("/submit",userauthenticate,ScoreController.SubmitQuiz);


module.exports = router;