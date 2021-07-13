const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleInfo = mongoose.model('articleInfo',new Schema({
    tags:[String],
    num :Number
}));
/*
articleInfo.create({
    tags:['个人日记','HTML5&CSS3','JavaScript','ASP.NET MVC','其他'],
    num :100
})
*/
module.exports = articleInfo;