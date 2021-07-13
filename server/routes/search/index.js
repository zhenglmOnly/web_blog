const express = require('express');
const router = express.Router();

let article = require('../../db/article');

//搜索文章关键字
router.post('/getsecrch',(req,res)=>{
    let keywords = req.body.data;
    if (!keywords) {
        res.send({
            code: 2,
            msg: "请传入关键词参数",
            data: []
        });
        return;
    }
    let reg = new RegExp(keywords,'i');
    article.find(
        {$or:[{title:reg},{tag:reg}]},
        {_id:1,title:1},
        {skip:0,limit:5,sort:{pv:-1}})
        .then((data)=>{
            if(data.length){
                res.send({
                    code: 1,
                    msg: "查找成功！",
                    data
                });
            }else{
                res.send({
                    code: 2,
                    msg: "没找到！",
                    data:null,
                });
            }

        })
        .catch((e)=>{
            res.send({
                code: 2,
                msg: "查找失败！",
                data:[]
            });
        })
});


module.exports = router;