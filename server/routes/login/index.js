const express = require("express");
const router = express.Router();
const user = require("../../db/user");
const visitor = require("../../db/visitor");
const crypto = require("crypto");
//登陆
router.post("/login",(req,res)=>{
    if (req.session.login) {
        res.send({
            code:2,
            data:"已经登录，请退出之后再登录"
        });
        return;
    }
    let {aduser,pass} = req.body;
    user.findOne({aduser}).then((data)=>{
        if(data !== null){
            if(data.pass === crypto.createHash("sha256").update(pass).digest("hex")){
                req.session.login = data;
                res.send({
                    code:0,
                    data:"登陆成功",
                });
                visitor.findOne({user:req.session.login._id},{},{}).then((data)=>{
                    if(data){
                        data.date = new Date().getTime();
                    }else{
                        //添加到最近访客
                        visitor.create({user:data._id})
                            .then(_=>{})
                            .catch(_=>{});
                    }
                }).catch((e)=>{
                    console.log(e)
                });
            }else{
                res.send({
                    code:2,
                    data:"密码错误",
                });
            }
        }else{
            res.send({
                code:2,
                data:"用户名不存在",
            });
        }

    }).catch((e)=>{
        res.send({
            code:4,
            data:"服务器错误！",
        });
    })
});

//判断是否已经登陆
router.post("/ifLogin",(req,res)=>{

    let data = req.session.login;
    let resData = false;
    if(data){
        delete data.pass;
        delete data.__v;
        resData = data;
        res.send({
            code:1,
            userInfo:resData,
        });
    }else{
        res.send({
            code:2,
            userInfo:"",
        });
    }
});

//退出登录
router.post("/outLogin",(req,res)=>{
    req.session.destroy();
    res.send({
        code:0,
        data:"退出成功"
    });
});


//最近访客
router.post("/visitor",(req,res)=>{
    user.find({},{_id:1,img:1,aduser:1},{skip:0,limit:12}).then((data)=>{
        res.send({
            code:0,
            data,
        });
    }).catch((e)=>{
        res.send({
            code:0,
            data:[],
        });
    })
})

module.exports = router;