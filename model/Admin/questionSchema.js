const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    questions:String,
    answers:[],
    categoryid:String,
    experienceLevel:{
        type:Number,
        required:true
    }
},{timestamps:true});

const questionsdb = new mongoose.model("questions",questionSchema)

module.exports = questionsdb