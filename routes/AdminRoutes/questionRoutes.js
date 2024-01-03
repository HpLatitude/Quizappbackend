const express = require("express");
const router = new express.Router();
const QuestionController = require("../../controllers/AdminController/questionControllers");

// question routes
router.post("/create",QuestionController.Addquestions);
router.get("/getquestion",QuestionController.GetQuestions);


module.exports = router