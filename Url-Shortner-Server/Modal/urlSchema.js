
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const URLSchema = new Schema({
    longURL :{type:String , required:true},
    shortURL:{type:String , required:true}
},{timestamps:true})

const URL = mongoose.model("Urls" , URLSchema);

module.exports = URL;