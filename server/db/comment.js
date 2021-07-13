const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const comment = mongoose.model('comment',new Schema({
        /*artId:{type:String,ref:"article",required:true},//关联文章
        comment:[
         {//父评论
             user: {type: Schema.Types.ObjectId, ref: "user", required: true},
             content: {type: String, required: true},
             data: {type: Date, default: Date.now},

             children: [//子评论
                 {
                     user: {type: Schema.Types.ObjectId, ref: "user", required: true},
                     content: {type: String, required: true},
                     userName: {type: String, required: true},
                     data: {type: Date, default: Date.now},
                 }
             ],
         }
     ],*/
    artId:{type:String, ref: "article", required: true},//关联文章
    user: {type: Schema.Types.ObjectId, ref: "user", required: true},
    content: {type: String, required: true},
    data: {type: Date, default: Date.now},
    children: [//子留言
        {
            user: {type: Schema.Types.ObjectId, ref: "user", required: true},
            content: {type: String, required: true},
            userName: {type: String, required: true},
            data: {type: Date, default: Date.now},
        }
    ],

}));

module.exports = comment;