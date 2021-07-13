const express = require('express');
const router = express.Router();

let article = require('../../db/article');
let comment = require('../../db/comment');
let articleInfo = require('../../db/articleInfo');
//获取文章类目
router.post('/getInfo',(req,res)=>{
    articleInfo.findOne({},{__v:0})
        .then((data)=>{
            res.send({
                code:0,
                msg:"请求成功",
                data
            })
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误",
                data:null
            })
        })
});
//获取热门文章8篇
router.post('/getHot',(req,res)=>{
    let {skip,limit} = req.body.data;
    article.find({},{__v:0},{sort:{pv:-1},skip:skip,limit:limit})
        .then((data)=>{
            console.log(data.length);
            res.send({
                code:0,
                data
            })
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误",
                data:null
            })
        })
});
//获取文章列表
router.post('/getAll',(req,res)=>{
    let {skip,limit,tag} = req.body;
    let tags = tag?{tag}:{};
    article.find(tags,{__v:0},{skip,limit,sort:{pv:-1}})
        .then((data)=>{
            console.log(data);
            res.send({
                code:0,
                data
            });
        })
        .catch(()=>{
            res.send({
                code:4,
                msg:"服务器错误",
                data:null
            })
        })
});


//获取一篇文章
router.post("/getarticleread",(req,res)=>{
    let {Id} = req.body;
    article.findById(Id,{surface:0,__v:0})
        .then((data)=>{
            comment.find({artId:Id},{surface:0,__v:0,},{sort:{pv:-1}})
                .populate("user",{__id:1,aduser:1,img:1})
                .populate("children.user",{__id:1,aduser:1,img:1})
                .then((d)=>{
                    if(d){
                        res.send({
                            code: 0,
                            data1:d,
                            data2:data,
                        });
                    }else{
                        res.send({
                            code: 0,
                            data2:data,
                        });
                    };
                })
        })
        .catch((e)=>{
            console.log("没找到")
        });
});
//提交文章评论
router.post("/articlereply",(req,res)=>{
    let {artId,user,content} = req.body.data;
    if(!artId || !user || !content){
        res.send({
            code:2,
            data:"数据格式错误！"
        });
        return;
    };
    comment.create({artId,user,content}).then((data)=>{
            res.send({
                code:1,
                data,
            });
            console.log(data);
        }).catch(()=>{
            res.send({
                code:2,
                data:"失败"
            });
        });
});

//提交文章评论回复
router.post("/articlereplychilder",(req,res)=>{
    let {_id,user,content,userName} = req.body.data;
    if(!_id || !user || !content || !userName){
        res.send({
            code:2,
            data:"数据格式错误！"
        });
        return;
    };
    comment.findById(_id).then((data)=>{
        comment.updateOne({_id},{$push:{'children':{user,content,userName}}})
            .then((data2)=>{
                res.send({
                    code: 0,
                    msg:"提交成功",
                });
            }).catch((e)=>{
                res.send({
                    code: 2,
                    msg:"服务器错误",
                });
            });

         /*for (let i = 0;i<data.comment.length-1;i++) {
            if (data.comment[i]._id == parentId) {
                  let a = data.comment[i]._id;
                comment.updateOne({_id:a},{$push:{'children':{user,content,userName}}})
                    .then((data)=>{
                        console.log("1",data);
                    }).catch((e)=>{
                    console.log("0",e)
                });
            }else{

             }
         }*/
    }).catch((e)=>{
        console.log("没找到~",e)
    });

});



module.exports = router;