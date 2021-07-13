import axios from 'axios';
axios.defaults.baseURL='http://localhost:3000';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';

export default {
    //获取文章类目
    getArticleInfo(){
        return axios.post('/article/getInfo');
    },
    //获取热门文章
    getArticleHot(data){
        return axios.post('/article/getHot',{data});
    },
    //获取文章列表
    getArticleAll:(function(){
        let skip = 0,limit = 5;
        return function(index=0,ifFalse=false){
            if(ifFalse){
                skip = 0;
                limit = 5;
            }
            let tag = ["","HTML&Css","JavaScript","Vue&React","Other","Node"][index];
            let data = {skip,limit,tag};
            skip += limit;
            return axios.post('/article/getAll',data);
        };
    })(),
    //获取一篇文章
    getArticleOne(Id){
        return axios.post('/article/getarticleread',{Id})
    },
    //搜索文章关键字
    getsecrchList(data){
            return axios.post('/search/getsecrch',{data});
    },
    //提交文章评论
    getarticlereply(data){
        return axios.post('/article/articlereply',{data})
    },
    //提交文章评论回复
    getarticlechilder(data){
        return axios.post('/article/articlereplychilder',{data})
    },

    //获取验证码图片
    getVerification(){
        return axios.post('/register/getvcode');
    },
    //验证码匹配
    getcheckVcode(vcode){
        return axios.post('/register/checkVcode',{vcode});
    },
    //提交注册表
    postForm(aduser,pass,svgCode){
        return axios.post('/register/register',{aduser,pass,svgCode});
    },
    //登陆
    getLogin(aduser,pass){
        return axios.post('/login/login',{aduser,pass});
    },
    //判断用户是否登陆
    getifLogin(){
        return axios.post('/login/ifLogin');
    },
    //退出登录
    eaveLogin(){
        return axios.post('/login/outLogin');
    },
    //提交留言
    createConent(data){
        return axios.post('/message/createreply',{data});
    },
    //提交回复留言
    getparentreply(data){
        return axios.post('/message/parentreply',{data});
    },
    //获取留言
    getreplylist(data){
        return axios.post('/message/replylist',{data});
    },
    /*getreplylist:(function(){
        let skip = 0,limit = 3;
        return function(){
            let data = {skip,limit};
            skip += limit;
            return axios.post('/message/replylist',data);
        }
    })(),*/
    //获取日记
    loadDiary(){
        return axios.post('/diary/loadDiary');
    },
    //获取友联
    loadUnion(){
        return axios.post('/union/loadUnion');
    },
    //最近访客
    getvisitor(){
        return axios.post('/login/visitor');
    }
};