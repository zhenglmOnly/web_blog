const message = require("../../db/message");
const express = require("express");
const router = express.Router();
//提交留言
router.post("/createreply",(req,res)=>{
    let {user,content} = req.body.data;
    if(!user || !content){
        res.send({
            code:2,
            data:"数据格式错误！"
        });
        return;
    };
    message.create({
        user,
        content,
    }).then((d)=>{
        res.send({
            code:0,
            data:"提交留言成功！"
        });
    }).catch(()=>{
        res.send({
            code:2,
            data:"服务器错误！"
        });
    });

});
//提交回复留言
router.post("/parentreply",(req,res)=>{
    let {parentId,user,content,userName} = req.body.data;
    if (!parentId || !user || !content || !userName){
        res.send({
            code : 1,
            msg : "数据格式错误"
        });
        return;
    }
    message.findById(parentId).then((data)=>{
        message.updateOne({_id:parentId},{$push:{'children':{user,content,userName}}})
            .then((data)=>{
                res.send({
                    code:0,
                    data:"评论成功！",
                });
                console.log(data)
            })
            .catch((e)=>{
                res.send({
                    code:2,
                    data:"评论成功！",
                })
            });
    }).catch(()=>{
        res.send({
            code:0,
            data:[],
        })
    });

});
//获取留言
router.post("/replylist",(req,res)=>{
    let {skip,limit} = req.body.data;
    message.find({},{},{skip,limit,sort:{pv:-1}})
        .populate("user",{__id:1,aduser:1,img:1})
        .populate("children.user",{__id:1,aduser:1,img:1})
        .then(data=>{
            if(!data){
                res.send({
                    code:2,
                    data:[],
                })
            }else{
                res.send({
                    code:1,
                    data,
                })
            }

    }).catch((e)=>{
        res.send({
            code:2,
            data:[],
        })
    });
});


module.exports = router;
