const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const union = mongoose.model('union',new Schema({
    title:{type:String,required:true},
    hrefs:{type:String,required:true},
    imgs:{type:String,default:"http://localhost:3000/img/hdImg.jpg"},
    desc:{type:String,default:"此大佬什么也没留下~"},
}));

module.exports = union;