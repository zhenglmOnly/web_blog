<template>
    <div>
        <div id="nav">
            <div class="main">
                <div class="n_m_logo">My blog</div>
                <div class="n_m_login">
                    <div class="n_m_l_false"  v-if="login.ifLogins">
                        <a href="javascript:"  @click="ifLogin=true">登录</a>|<a href="javascript:" @click="ifRegister=true">注册</a>
                    </div>
                    <div class="n_m_l_true" v-else>
                        <el-popover
                                placement="top-start"
                                width="200"
                                trigger="hover">
                            <p class="title" style="line-height:25px">您好！{{login.user}}，欢迎登陆</p>
                            <a
                                    type="primary"
                                    size="mini"
                                    href="javascript:"
                                    style="line-height:25px;color:blue"
                                    @click="ifShowAvatar=true">
                                修改头像</a>
                            <a href="javascript:" @click="outLogin" style="line-height:25px;color:blue">退出</a>
                            <img :src="login.photo" slot="reference"/>
                        </el-popover>
                    </div>
                </div>
                <div :class="['n_m_nav',show?'show':'']">
                    <ul :class="'list'+whichActive">
                        <li><router-link to="/">首页</router-link></li>
                        <li><router-link to="/blog/0">博客</router-link></li>
                        <li><router-link to="/dairy">日记</router-link></li>
                        <li><router-link to="/message">留言</router-link></li>
                        <li><router-link to="/links">友链</router-link></li>
                        <li><router-link to="/about">关于</router-link></li>
                    </ul>
                </div>
                <div class="n_btn" @click="show = !show">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <Register :dialogVisible="ifRegister" @handleClose="closeRegister"></Register>
        <Login :dialogVisible="ifLogin" @handleClose="closeLogin"></Login>
        <Avatar :dialogVisible="ifShowAvatar" @handleClose="closeAvatar"></Avatar>
    </div>

</template>

<script>
    import Login from"./Login";
    import Register from"./Register";
    import request from "../../api";
    import Avatar from"./Avatar"
    const getifLogin = request.getifLogin;
    const eaveLogin = request.eaveLogin;
    export default {
        name: "Nav",
        data(){
            return{
                show:false,
                routerList:["Home","Blog","Dairy","Message","Links","About"],
                alertKey:0,
                login:{
                    user: "",
                    photo:"",
                    ifLogins:false,
                },
                /*登录弹窗和注册弹窗*/
                ifShowAvatar:false,
                ifRegister:false,
                ifLogin:false,
            }
        },
        components:{
            Avatar,
            Login,
            Register,
        },
        computed:{
            whichActive(){
                let index = this.routerList.indexOf(this.$route.name);
                if(this.$route.name ==="Article")index = 1;
                return index+1;
            }
        },
        methods:{
            ifShowNav(){
                show = !show;
            },
            //注册
            /*openRegister() {
                const h = this.$createElement;
                this.$msgbox({
                    title: '注册',
                    message: h(Register,{key:this.alertKey++}),
                    showCancelButton: true,
                    showConfirmButton : true,
                    closeOnClickModal : false,
                    confirmButtonText: '立即注册',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            let mv = this;
                            (function(){
                                this.$refs['form'].validate((valid) => {
                                    if (valid) {
                                        postForm(this.form.user,this.form.pass,this.form.svgCode).then((res)=>{
                                            this.getCode();
                                            if(!res.data.code){  //注册成功
                                                this.$message({
                                                    type: 'success',
                                                    message: res.data.data,
                                                    duration : 2000
                                                });
                                                this.$refs['form'].resetFields();
                                                done();
                                                router.go(0);
                                                setTimeout(()=>{
                                                    mv.openLogin();
                                                },1000);
                                            }else{  //注册失败
                                                this.getCode();
                                                this.$message({
                                                    type: 'info',
                                                    message: res.data.data,
                                                    duration : 2000
                                                });
                                            }
                                        }).catch((err)=>{
                                            console.log(err)
                                        })
                                    } else {return false;}
                                });
                            }).call(instance.$children[2])
                        } else {
                            done();
                        }
                    }
                }).then(()=>{}).catch(()=>{});
            },*/
            closeRegister(){
                this.ifRegister = false;
            },
            //登录
            /*openLogin(){
                const h = this.$createElement;
                this.$msgbox({
                    title: '登陆',
                    message: h(Login, {key:this.alertKey++}),
                    showCancelButton: true,
                    showConfirmButton : true,
                    closeOnClickModal : false,
                    confirmButtonText: '立即登录',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            let mv = this;
                            (function(){
                                this.$refs['form'].validate((valid) => {
                                   if(valid){
                                        getLogin(this.form.user,this.form.pass).then((res)=>{
                                            //console.log(res)
                                            let d = res.data.code;
                                            if(!d){//登陆成功
                                                mv.ifLogins = true;
                                                console.log(res);
                                                this.$message({
                                                    type: 'success',
                                                    message: '登录成功',
                                                    duration : 2000
                                                });
                                                done();
                                            }else{ //登陆失败
                                                this.$message({
                                                    type: 'info',
                                                    message: d,
                                                    duration : 2000
                                                });
                                                this.$refs['form'].resetFields();
                                            }
                                        }).catch((e)=>{
                                            this.$message({
                                                type: 'info',
                                                message: "服务器错误",
                                                duration : 2000
                                            });
                                        })
                                    }
                                });
                            }).call(instance.$children[2]);
                        } else {
                            done();
                        }
                    }
                }).then(()=>{}).catch(()=>{});
            },*/
            closeLogin(){
                this.ifLogin = false;
                this.login.ifLogins = true;
            },
            //上传头像
            closeAvatar(){
                this.ifShowAvatar = false;
            },
            //退出登录
            outLogin(){
                eaveLogin().then((res)=>{
                    this.$message({
                        type: 'success',
                        message: res.data.data,
                        duration : 2000
                    });
                    this.$router.go(0);
                    this.login.ifLogins = false;
                }).catch((e)=>{
                    return false;
                })
            },
        },
        created(){
            //判断是否登陆
            getifLogin().then((res)=>{
                if(res.data.userInfo){
                    this.login.user = res.data.userInfo.aduser;
                    this.login.photo = res.data.userInfo.img;
                }else{
                    this.login.ifLogins = true;
                }
            }).catch(()=>{
            });
        },

    }
</script>

<style lang="less" scoped>
    #nav{
        position:fixed;
        top:0;
        left:0;
        z-index: 999;
        width:100%;
        height:60px;
        background-color:#fff;
        border:1px solid #c9c9c9;
        overflow:hidden;
        >.main{
            box-sizing:border-box;
            width:100%;
            max-width:1260px;
            height:60px;
            margin:0 auto;
            padding:0 50px;
            overflow:hidden;
            @media screen and (min-width: 320px) and (max-width: 480px) {
                padding:0;
            }
            >.n_m_logo{
                float:left;
                width:150px;
                height:60px;
                line-height:60px;
                text-align:center;
                font-size:40px;
                font-family:BarbaraHand;
                background-color:#fff;
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    //float:right;
                    position:absolute;
                    left:30%;
                }
                @media only screen and (min-width: 414px) and (max-width: 768px){
                    position:absolute;
                    left:34%;
                }
                @media only screen and (min-width: 768px) and (max-width: 1024px){
                    position:absolute;
                    left:40%;
                }
            }
            >.n_m_login{
                float:right;
                height:60px;
                line-height:60px;
                box-sizing:border-box;
                a{
                    display:inline-block;
                    color:#000;
                    text-decoration:underline;
                }
                >.n_m_l_false{
                    a{
                        width:30px;
                        margin:0 2px;
                        text-align:center;
                        font-size:14px;
                    }
                }
                .n_m_l_true{
                    img{
                        width:35px;
                        height:35px;
                        border-radius:50%;
                        cursor:pointer;
                    }
                    /deep/.el-popover{
                        a{
                            position:relative;
                            top:6px;
                            left:5px;
                            height:30px;
                            line-height:30px;
                        }
                    }
                }
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    position:absolute;
                    left:15px;
                }
                @media only screen and (min-width: 321px) and (max-width: 1024px){
                    position:absolute;
                    left:15px;
                }
            }
            >.n_m_nav{
                float:right;
                width:576px;
                margin-right:8%;
                transition:all 0.4s;
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    position:fixed;
                    left:0;
                    top:60px;
                    width:100%;
                    z-index:-1;
                    background-color:#fff;
                    transform:translateX(-800px);
                    opacity:0;
                }
                @media only screen and (min-width: 321px) and (max-width: 1024px) {
                    position:fixed;
                    left:0;
                    top:60px;
                    width:100%;
                    z-index:-1;
                    background-color:#fff;
                    transform:translateX(-800px);
                    opacity:0;
                }
                ul{
                    display:flex;
                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        display:block;
                    }
                    @media only screen and (min-width: 321px) and (max-width: 1024px) {
                        display:block;
                    }
                    li{
                        flex:1;
                        @media screen and (min-width: 320px) and (max-width: 480px) {
                            display:block;
                            width:100%;
                            flex:none;
                        }
                        @media only screen and (min-width: 321px) and (max-width: 1024px) {
                            display:block;
                            width:100%;
                            flex:none;
                        }
                        a{
                            display:block;
                            width:100%;
                            height:60px;
                            position:relative;
                            line-height:60px;
                            text-align:center;
                            font-weight:400;
                            font-size:15px;
                            color:#212220;
                            transition: .3s;
                            &::after{
                                content:"";
                                position:absolute;
                                left:0;
                                bottom:0;
                                right:0;
                                width:0px;
                                height:2px;
                                margin:0 auto;
                                background-color:transparent;
                                transition: .5s;
                            }
                            &:hover{
                                color:yellowgreen;
                            }
                            &:hover:after{
                                background-color:yellowgreen;
                                width:100%;
                            }
                        }
                    }
                    &.list1 li:nth-child(1),
                    &.list2 li:nth-child(2),
                    &.list3 li:nth-child(3),
                    &.list4 li:nth-child(4),
                    &.list5 li:nth-child(5),
                    &.list6 li:nth-child(6){
                        a{
                            color:yellowgreen;
                            &::after{
                                background-color:yellowgreen;
                                width:100%;
                            }
                        }
                    }
                }
            }
            >.show{
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    transform:translateX(0px);
                    opacity:1;
                }
                @media only screen and (min-width: 321px) and (max-width: 1024px) {
                    transform:translateX(0px);
                    opacity:1;
                }
            }
            >.n_btn{
                display:none;
                position:absolute;
                top:10px;
                right:24px;
                width:40px;
                height:40px;
                border-radius:50%;
                overflow:hidden;
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    display:block;
                }
                @media only screen and (min-width: 321px) and (max-width: 1024px) {
                    display:block;
                }
                span{
                    display:block;
                    width:28px;
                    height:2px;
                    background-color:rgba(0,0,0,0.2);
                    border-radius:5px;
                    margin:5px auto;
                    transition:all 0.5s;
                    &:nth-child(1){
                        margin-top:12px;
                    }
                    &.top{
                        transform:rotate(45deg)translate(5px,5px);
                    }
                    &.middle{
                        transform:rotate(-45deg);
                    }
                    &.bottom{
                        display:none;
                    }
                }
            }
        }
    }
    /deep/.avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    /deep/.avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
</style>