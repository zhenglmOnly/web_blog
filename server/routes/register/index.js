const express = require("express");
const svg = require("svg-captcha");
const router = express.Router();
const user = require("../../db/user");

//获取验证码
router.post("/getvcode",(req,res)=>{
    let captcha = svg.create();
    if(req.session.registerTime){
        let t_ = new Date() - req.session.registerTime;
        if(t_<=10000){
            res.send({
                code:1,
                data:"请求过于频繁！",
                time:10000-t_,
            });
        }
    }
    req.session.registerVCode = captcha;//用户获取的验证码
    req.session.registerTime = new Date();//用户获取验证码的时间

    res.send({
        code:0,
        data:captcha.data,
        time:10000,
    });
});
//判断验证码
router.post("/checkVcode",(req,res)=>{
    let {vcode} = req.body;
    if(!vcode || vcode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase()){
        res.send({
            code:1,
            data:"验证码错误！",
        });
    }else{
        res.send({
            code:0,
            data:"验证成功！",
        });
    }
});

//注册
router.post("/register",(req,res)=>{
    let {aduser,pass,svgCode} = req.body;
    req.session.registerVCodeTime = 0;//用户注册的时间
    if(!aduser || !pass || !svgCode){
        res.send({
            code:1,
            data:"注册失败，请填完信息！",
        });
        return;
    }
    if(svgCode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase()){
        res.send({
            code:2,
            data:"验证码错误！",
        });
        return;
    }
    if(!/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(aduser) || !/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(pass)){
        res.send({
            code:2,
            data:"用户名或密码格式错误！",
        });
        return;
    }
    user.findOne({aduser}).then((data)=>{
        if(data){
            res.send({
                code:3,
                data:"用户已存在！",
            });
        }else{
            user.create({aduser,pass}).then((d)=>{
                res.send({
                    code:0,
                    data:"注册成功！",
                });
            }).catch((e)=>{
                res.send({
                    code:4,
                    data:"服务器错误！",
                });
            })
        }
    }).catch((e)=>{
        res.send({
            code:4,
            data:"服务器错误！",
        });
    })



});

module.exports = router;