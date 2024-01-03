const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    Score:Number,
    
},{timestamps:true});

const questionsdb = new mongoose.model("questions",questionSchema)

module.exports = questionsdb