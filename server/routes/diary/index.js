const express = require("express");
const router = express.Router();

const diary = require("../../db/diary");
router.post("/loadDiary",(req,res)=>{
    diary.find({},{},{sort:{time:-1}}).then((data)=>{
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