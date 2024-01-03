const mongoose = require("mongoose");

// category schema
const CategorySchema = new mongoose.Schema({
    categoryName:String,
    description:{
        type:String,
        required:false
    }
},{timestamps:true});

// category model
const categoryDb = new mongoose.model("categoryDBs",CategorySchema);

module.exports = categoryDb;