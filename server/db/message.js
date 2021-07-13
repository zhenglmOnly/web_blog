
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const message = mongoose.model("message",new Schema({
    user : {type: Schema.Types.ObjectId,ref:"user",required:true},
    content : {type: String,required:true},
    data : {type:Date,default:Date.now},
    children : [//子留言
        {
            user : {type: Schema.Types.ObjectId,ref:"user",required:true},
            content : {type: String,required:true},
            userName: {type: String,required:true},
            data : {type:Date,default:Date.now},
        }
    ]
}));
module.exports = message;