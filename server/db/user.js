const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const userSchema = new Schema({
    aduser:{type:String,required:true},
    pass:{type:String,required:true},
    img:{type:String,default:"http://localhost:3000/img/hdImg.jpg"},
    regDate:{type:Number,default:new Date().getTime()},
    administration:{type:Boolean,default:false},
    jurisdiction : {type:Boolean,default: false},
});

userSchema.pre("save",function(next){
    //密码加密
    let pass = this.pass;
    this.pass = crypto.createHash("sha256").update(pass).digest("hex");
    next();
});

const user = mongoose.model('user',userSchema);

module.exports = user;