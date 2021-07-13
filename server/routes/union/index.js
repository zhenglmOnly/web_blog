const express = require("express");
const router = express.Router();
const user = require("../../db/union");

router.post("/loadUnion",(req,res)=>{
    user.find({}).then((data)=>{
        if(data){
            res.send({
                code: 1,
                data
            });
        }else{
            res.send({
                code: 2,
                msg:"服务器错误",
                data:[]
            });
        }

    })
});


module.exports = router;