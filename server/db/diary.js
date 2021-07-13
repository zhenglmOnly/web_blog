const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diary = mongoose.model('diary',new Schema({
    content:{type: String,required:true},
    time:{type:Date,default:Date.now},
}));
module.exports = diary;