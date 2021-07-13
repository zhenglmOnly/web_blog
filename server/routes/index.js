var express = require('express');
var router = express.Router();

//文章相关接口
router.use('/article',require("./article/index"));
//注册相关接口
router.use('/register',require("./register/index"));
//登陆相关接口
router.use('/login',require("./login/index"));
//留言相关接口
router.use('/message',require("./message/index"));
//日记相关接口
router.use('/diary',require("./diary/index"));
//友联相关接口
router.use('/union',require("./union/index"));
//上传相关接口
router.use('/upload',require("./upload/index"));
//上传相关接口
router.use('/search',require("./search/index"));

module.exports = router;
