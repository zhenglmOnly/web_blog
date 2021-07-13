var session = require("express-session");
var connectMongo = require("connect-mongo")(session);

module.exports = session({
    secret : "zheng",
    cookie : {maxAge:30*60*1000}, //给前端设置的cookie有效期时长
    rolling : true,//每次用户和后端交互时（访问连接，ajax...），刷新cookie有效期
    resave : false,
    saveUninitialized : false,
    store : new connectMongo({url : "mongodb://localhost:27017/blog"}),
});