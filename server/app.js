var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

//数据库连接
mongoose.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true ,useUnifiedTopology: true})
    .then(()=>{
        console.log("数据库连接成功")
    })
    .catch(()=>{
        console.log("数据库连接失败")
    });

var app = express();

app.use(logger('dev'));//日志
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//允许跨域
app.use((req,res,next)=>{
    res.header({
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Origin':req.headers.origin || '*',
        'Access-Control-Allow-Headers':'Content-Type',
        'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type':'application/json; charset=utf-8' //内容格式
    });
    if(req.method === 'OPTIONS'){//在发送post请求之前会先发送options请求，当options成了之后它才会把post请求发过来（options它是为了帮助post的）
        res.sendStatus(200);
    }else{
        next();
    }
});

//设置session
app.use(require("./session"));

app.use('/', require('./routes/index'));

module.exports = app;
