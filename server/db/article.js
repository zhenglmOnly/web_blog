const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let articleSchema = new Schema({
    type : {type: String,required:true},
    title : {type: String,required:true},
    date : {type:Date,default:Date.now},
    newdate : {type:Date,default:Date.now},
    updateDate:{type:Date,default:Date.now},
    surface : {type: String,default:'http://localhost:3000/img/hdImg.jpg'},
    content : {type: String,required:true},
    tag : {type:String,required:true},
    pl : {type:String,default:0},
    pv : {type:String,default:0},
});
articleSchema.pre("update",function(next){
    this.update = new Date;
    next();
})
const article = mongoose.model('article',articleSchema);

/*
for(let i =0;i<50;i++){
    article.create({
        type:['原创','转载'][(Math.random()*2)|0],
        title:`第${i+1}篇文章`,
        content:('内容为：'+i+i+i+i+'这是测试假数据文章内容 '+i+' '+':').repeat(10),
        tag:['个人日记','HTML5&CSS3','JavaScript','ASP.NET MVC','其他'][(Math.random()*5)|0],
    })
}
*/


module.exports = article;