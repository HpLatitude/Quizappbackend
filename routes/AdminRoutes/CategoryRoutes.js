const express = require("express");
const router = new express.Router();
const QuestionCategoryController = require("../../controllers/AdminController/questionCategoryController");
const AdminAuthenticate = require("../../middleware/Admin/Adminmiddleware");

// category routes
router.post("/create",AdminAuthenticate,QuestionCategoryController.CreateCategory);
router.get("/getcategory",QuestionCategoryController.GetCategory);
router.delete("/deletecategory/:categoryid",AdminAuthenticate,QuestionCategoryController.DeleteCategory);
router.patch("/updatecategory/:categoryid",AdminAuthenticate,QuestionCategoryController.UpdateCategory);


module.exports = router;