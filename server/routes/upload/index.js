const express = require("express");
const multer = require('multer');
const path = require("path");
const user = require("../../db/user");

let router = express.Router();


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../../public/img/upload/avatar"));
    },
    filename: function (req, file, cb) {
        let fileName="";
        if(req.session.login){
            fileName = req.session.login._id + file.originalname.match(/\.(jpg|jpeg|png)$/i)[0];
        }else{
            fileName =  file.fieldname + '-' + Date.now()+file.originalname.match(/\.(jpg|jpeg|png)$/i)[0];
        }
        cb(null,fileName)
    }
});

let upload = multer({ storage}).single('file');

/*头像上传*/
router.post("/avatar",(req,res)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
            res.sendStatus(500);
        } else if (err) {
            // 发生错误
            res.sendStatus(500);
        }

        // 一切都好
        if (!req.session.login){
            res.sendStatus(500);
            return;
        }
        user.updateOne(
        {_id:req.session.login._id},
        {img:'http://localhost:3000/img/upload/avatar/'+req.file.filename}
        ).then(()=>{
            req.session.login.img = 'http://localhost:3000/img/upload/avatar/'+req.file.filename;
            res.send('ok');
        }).catch(()=>{
            res.sendStatus(500);
        });
    })
});


module.exports = router;