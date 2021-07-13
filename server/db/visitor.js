const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = mongoose.model('vistitor',new Schema({
    user:{type: Schema.Types.ObjectId,ref:"user",required:true},
    date:{type:Number,default:new Date().getTime()},
}));

module.exports = user;