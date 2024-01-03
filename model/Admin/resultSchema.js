const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    Score:Number,

},{timestamps:true});

const resultdb = new mongoose.model("resultdbs",questionSchema)

module.exports = resultdb