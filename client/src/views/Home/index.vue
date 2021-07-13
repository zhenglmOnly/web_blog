<template>
    <div class="Home" :style="{height:adaption+'px'}">
        <div class="nav">
            <div :class="['n_btn',navName?'bg':'']" @click="opens">
                <span :class="[navName?'top':'']"></span>
                <span :class="[navName?'middle':'']"></span>
                <span :class="[navName?'bottom':'']"></span>
            </div>
            <div class="n_con" v-show="navName">
                <ul>
                    <li><router-link to="/">首页</router-link></li>
                    <li><router-link to="blog/0">博客</router-link></li>
                    <li><router-link to="message">留言</router-link></li>
                </ul>
            </div>
        </div>
        <div class="h_tablecell">
            <div class="h_t_con load">
                <h3>博主</h3>
                <p>剑气纵横三万里,一剑光寒十九洲</p>

                <router-link to="blog/0">Enter blog</router-link>
            </div>
            <i class="el-icon-arrow-down load" :style="{left:iLeft+'px'}" @click="slideDownward"></i>
        </div>
        <div class="h_hotArticle">
            <div class="h_h_con">
                <div class="h_h_head load">
                    <h3>热门文章</h3>
                    <p>很想给你写封信,告诉你这里的天气.</p>
                    <p>昨夜的那场电影,还有我的心情.</p>
                </div>
                <div class="h_h_list">
                    <ul>
                        <li v-for="item in articleHot" class="load">
                            <router-link :to="'/article/'+item._id" class="img">
                                <img :src="item.surface" alt="">
                                <div class="mask">
                                    <i class="el-icon-link"></i>
                                </div>
                            </router-link>
                            <div class="con">
                                <router-link  :to="'/article/'+item._id"><h3 class="title">{{item.title}}</h3></router-link>
                                <span class="time">{{item.date}}</span>
                                <p>{{item.content}}</p>
                                <router-link :to="'/article/'+item._id" class="read">阅读更多</router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="h_aboutUnion">
            <ul>
                <li class="a_item load">
                    <a href="">关于</a>
                </li>
                <li class="a_item load">
                    <a href="">+友情链接</a>
                </li>
            </ul>
        </div>
        <div class="h_about">
            <div class="h_a_con">
                <h3 class="load">次元使者</h3>
                <p class="load">爱好游戏，动漫。闲来无事喜欢在一些不健康的场所虚度光阴，撸起代码就会废寝忘食。</p>
            </div>
        </div>
        <div class="foooter">
            <div class="main">
                <div class="f_top load">
                    <div class="img">
                        <h3>公众号</h3>
                        <img src="../../../src/assets/img/1537256147-APZCeYtgDH.jpg" alt="">
                    </div>
                    <div class="link">
                        <h3>相关链接</h3>
                        <ul>
                            <li> <router-link to="/blog/0"><i class="el-icon-s-order"></i>博文</router-link></li>
                            <li><router-link to="/message/"><i class="el-icon-s-comment"></i>留言</router-link></li>
                            <li><a href="javascripg:"><i class="el-icon-folder"></i>资源</a></li>
                            <li><router-link to="/dairy/"><i class="el-icon-notebook-1"></i>日记</router-link></li>
                            <li><a href="javascripg:"><i class="el-icon-document-copy"></i>归档</a> </li>
                        </ul>

                    </div>
                    <div class="contact">
                        <h3>联系我</h3>
                        <p><i class="el-icon-location-information"></i>地址: 广东省汕头市潮南区井都镇</p>
                        <p><i class="el-icon-chat-round"></i>QQ: 1454040230</p>
                        <p><i class="el-icon-message"></i>邮箱: zhenglm_web@163.com</p>
                    </div>
                </div>
            </div>
            <div class="f_bottom">
                <div class="main">
                    <p>Copyright © 2019-2020 博客 All Rights Reserved V.1.0.0 备案号:<span>蜀ICP备xxxxxxxx号</span></p>
                </div>

            </div>
        </div>
        <div class="getTop" v-if="top" @click="Topup"><i class="el-icon-upload2"></i></div>
    </div>
</template>

<script>
    import request from "../../../api/index";
    const getArticleHot = request.getArticleHot;
    //获取DOM距离页面顶部的距离
    function getT(obj){
        let top = 0;
        while(obj !== document.body){
            top+=obj.offsetTop;
            obj = obj.offsetParent;
        }
        return top;
    }
    export default {
        name: "Home",
        data(){
            return {
                adaption:0,
                iLeft:0,
                articleHot:[],
                skip:0,
                limit:3,
                top:false,
                navName:false,
            }
        },
        methods:{
            getWindowHeight(){
                this.adaption = window.innerHeight;
                this.iLeft = (window.innerWidth/2)-30;
            },
            //动画执行
            getload(){
                let load = document.querySelectorAll(".load");
                let scrollTop = document.documentElement.scrollTop + window.innerHeight;
                //item.getBoundingClientRect().top
                load.forEach(item=>{
                    if( scrollTop > getT(item)+100){
                        item.classList.add("loading");
                    }
                });
                if(document.documentElement.scrollTop>300){
                    this.top = true;
                }
            },
            //下滑箭头
            slideDownward(){
                let height = window.innerHeight;
                let time = setInterval(()=>{
                    document.documentElement.scrollTop += 50;
                    if(document.documentElement.scrollTop>=height)clearInterval(time);
                },13);
            },
            //置顶
            Topup(){
                let time = setInterval(()=>{
                    document.documentElement.scrollTop -= 50;
                    if(document.documentElement.scrollTop<=0)clearInterval(time);
                },13);
            },
            //打开导航
            opens(){
                this.navName = !this.navName;
            }
        },
        created(){
            //获取热门文章
            getArticleHot({
                skip:this.skip,
                limit:this.limit,
            }).then((res)=>{
                this.articleHot = res.data.data;
            }).catch((err)=>{
                console.log("失败",err);
            });
        },
        mounted(){
            this.getWindowHeight();
            window.addEventListener("resize",this.getWindowHeight);
            this.getload();
            window.addEventListener("scroll",this.getload);
        },
        destroyed(){
            window.removeEventListener("resize",this.getWindowHeight);
            window.removeEventListener("scroll",this.getload);
        }
    }
</script>


<style lang="less" scoped>
    .main{
        max-width:1170px;
        margin: 0 auto;
        color:#fff;
    }
    .Home{
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.5);
        >.nav{
            >.n_btn{
                position:fixed;
                top:50px;
                right:50px;
                z-index:9999;
                width:40px;
                height:40px;
                border-radius:50%;
                overflow:hidden;
                background-color:rgba(0,0,0,0.2);
                transition:all 0.5s;
                &:hover{
                    background-color:lawngreen;
                }
                &.bg{
                    background-color:#cccccc;
                }
                span{
                    display:block;
                    width:28px;
                    height:2px;
                    background-color:#fff;
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
            >.n_con{
                position:fixed;
                top:0;
                right:0;
                width:150px;
                height:100%;
                z-index:999;
                text-align:center;
                animation: show 0.3s;
                &::after{
                    content:"";
                    display:block;
                    position:absolute;
                    top:0;
                    left:0;
                    width:200%;
                    height:150%;
                    background-color:#fff;
                    transform:rotate(-11deg)translate(-36px, -43px);
                }
                ul{
                    position:absolute;
                    top:150px;
                    right:0;
                    width:100%;
                    margin:0 auto;
                    z-index:999;
                    li{
                        padding:0 20px;
                        height:50px;
                        line-height:50px;

                        a{
                            font-size:18px;
                            &:hover{
                                color:limegreen;
                            }
                        }

                    }
                }
                @keyframes show{
                    to{transform:translateX(0px)}
                    from{transform:translateX(30px)}
                }

            }
        }
        >.h_tablecell{
            width:100%;
            height:100%;
            text-align:center;
            color:#fff;
            overflow:hidden;
            >.h_t_con{
                width:100%;
                height:154px;
                position:absolute;
                top:0;
                bottom:0;
                margin:auto;
                &.loading{
                    animation:scale 0.5s;
                }
                h3{
                    font-size:35px;
                    line-height:56px;
                }
                p{
                    margin-bottom:25px;
                    font-size:16px;
                }
                a{
                    display:inline-block;
                    padding:10px;
                    color:#fff;
                    background-color:blue;
                }
            }
            i{
                position:absolute;
                bottom:60px;
                width:30px;
                height:30px;
                margin:auto;
                display:block;
                font-size:30px;
                font-weight:600;
                color:#fff;
                padding:8px;
                border-radius:50%;
                background-color:transparent;
                cursor:pointer;
                transition:background 0.4s;
                &.loading{
                    animation:up 0.8s;
                }
                &:hover{
                    background-color:#0000FF;
                }

            }
            @keyframes scale{
                to{
                    opacity:1;
                    transform: scale(1);
                }
                from{
                    opacity:0;
                    transform: scale(0.1);
                }
            }
            @keyframes up{
                to{
                    opacity:1;
                    transform: translateX(0px);
                }
                from{
                    opacity:0;
                    transform: translateY(20px);
                }
            }

        }
        >.h_hotArticle{
            >.h_h_con{
                margin:0 auto;
                padding:100px 15px;
                overflow:hidden;
                >.h_h_head{
                    width:100%;
                    height:136px;
                    text-align:center;
                    &.loading{
                        animation:top 2s;
                    }

                    h3{
                        display:inline-block;
                        font-size:30px;
                        padding-bottom:20px;
                        margin-bottom:20px;
                        position:relative;
                        &::after{
                            content:"";
                            display:block;
                            width:50px;
                            height:2px;
                            position:absolute;
                            bottom:0;
                            left:36px;
                            background-color:greenyellow;
                        }
                    }
                    @keyframes top{
                        to{
                            transform: translateY(0px);
                            opacity:1;
                        }
                        from{
                            transform: translateY(-233px);
                            opacity:0;
                        }
                    }
                }
                >.h_h_list{
                    width:100%;
                    margin-top:10px;
                    ul{
                        display:flex;
                        flex-wrap:wrap;
                        overflow:hidden;
                        li{
                            width:31%;
                            margin:0 10px;
                            box-sizing:border-box;
                            background-color:#f2f2f2;
                            @media screen and (min-width: 320px) and (max-width: 480px) {
                                width:100%;
                                margin:20px auto;
                            }
                            @media screen and (min-width: 321px) and (max-width: 1024px) {
                                width:90%;
                                margin:20px auto;
                            }
                            >.img{
                                position:relative;
                                overflow:hidden;
                                img{
                                    width:100%;
                                    min-height:244px;
                                    max-height:244px;
                                    transition:all 0.3s;
                                }
                                .mask{
                                    position:absolute;
                                    top:0;
                                    left:0;
                                    width:100%;
                                    height:0;
                                    text-align:center;
                                    background-color:rgba(0,0,0,0.3);
                                    transition: height 0.3s;
                                    i{
                                        position:absolute;
                                        top:0;
                                        left:45%;
                                        display:inline-block;
                                        padding:10px;
                                        font-size:40px;
                                        color:#fff;
                                        background-color:#000;
                                        opacity:0;
                                        transition:all 0.3s;
                                    }
                                }
                                &:hover .mask{
                                    height:100%;
                                }
                                &:hover .mask i{
                                    opacity:1;
                                    top:35%;

                                }
                                &:hover img{
                                    transform: scale(1.1);
                                }
                            }
                            >.con{
                                margin:25px 0;
                                padding:0 10px;
                                a{
                                    margin-bottom:5px;
                                    h3{
                                    }
                                }
                                span{
                                    display:block;
                                    margin-bottom:15px;
                                    color:#cccccc;
                                }
                                p{
                                    height:55px;
                                    color:#666;
                                    margin-bottom:15px;
                                    overflow:hidden;
                                }
                                >.read{
                                    color:dodgerblue;
                                }
                            }
                        }
                        li:nth-child(1){
                            &.loading{animation:bottom 0.5s;}
                        }
                        li:nth-child(2){
                            &.loading{animation:bottom 1s;}
                        }
                        li:nth-child(3){
                            &.loading{animation:bottom 1.5s;}
                        }
                        @keyframes bottom{
                            to{
                                transform: translateY(0px);
                            }
                            from{
                                transform: translateY(333px);
                            }
                        }
                    }
                }
            }
        }
        >.h_aboutUnion{
            height:270px;
            background:url("../../../src/assets/img/22.jpg")center fixed no-repeat;
            position:relative;
            ul{
                display:flex;
                justify-content:center;
                position:absolute;
                top:0;
                bottom:0;
                margin:auto;
                width:100%;
                height:42px;
                >.a_item{
                    position:relative;
                    a{
                        position:relative;
                        width:178px;
                        padding:10px;
                        margin:0 10px;
                        height:16px;
                        text-align:center;
                        border:1px solid #fff;
                        color:#fff;
                        z-index:1;
                        @media screen and (min-width: 320px) and (max-width: 480px) {
                            width:115px;
                        }
                    }
                    &::after{
                        content:"";
                        display:block;
                        position:absolute;
                        top:0;
                        left:11px;
                        width:0;
                        height:37px;
                        background-color:limegreen;
                        z-index:0;
                        transition: all 0.4s;
                    }
                    &:hover::after{
                        width:198px;
                    }
                }
                >.a_item:nth-child(1){
                    &.loading{animation:left 1.8s;}

                }
                >.a_item:nth-child(2){
                    &.loading{animation:right 1.8s;}

                }
            }
        }
        >.h_about{
            height:270px;
            position:relative;
            >.h_a_con{
                width:100%;
                height:80px;
                position:absolute;
                top:0;
                bottom:0;
                margin:auto;
                text-align:center;
                overflow:hidden;
                h3{
                    height:60px;
                    line-height:60px;
                    font-size:30px;
                    &.loading{
                        animation: left 0.6s;
                    }

                }
                p{
                    &.loading{
                        animation: right 0.6s;
                    }

                }

            }
        }
        >.foooter{
            overflow:hidden;
            background-color:#0C0C0C;
            .main{
                overflow:hidden;
                >.f_top{
                    display:flex;
                    flex-wrap:wrap;
                    padding:60px 0;
                    overflow:hidden;
                    &.loading{animation: name 1s;}
                    div{
                        width:33.33%;
                        @media screen and (min-width: 320px) and (max-width: 480px) {
                            width:100%;
                            margin-bottom:15px;
                        }
                        h3{
                            width:100%;
                            height:24px;
                            margin-bottom:20px;
                        }
                    }
                    >.img{
                        img{
                            width:120px;
                            height:120px;
                        }
                    }
                    >.link{
                        ul{
                            display:flex;
                            flex-wrap:wrap;
                            li{
                                width:50%;
                                height:19px;
                                margin-bottom:10px;
                                a{
                                    color:#fff;
                                    i{
                                        display:inline-block;
                                        margin-right:10px;
                                    }
                                    &:hover{
                                        color:forestgreen;
                                    }
                                }
                            }

                        }

                    }
                    >.contact{
                        p{
                            height:19px;
                            margin-bottom:10px;
                            i{
                                display:inline-block;
                                margin-right:10px;
                            }
                        }
                    }
                    @keyframes name{
                        to{
                            transform: translateY(0px);
                            opacity:1;
                        }
                        from{
                            transform: translateY(233px);
                            opacity:0;
                        }
                    }
                }
            }
            >.f_bottom{
                width:100%;
                height:43px;
                background-color:#000;
                >.main{
                    max-width:1170px;
                    p{
                        height:43px;
                        line-height:43px;
                        text-align:center;
                        color:#C9C5C5;
                        span{
                            font-weight:600;
                            color:#fff;
                        }
                    }
                }

            }
        }
        >.getTop{
            position:fixed;
            bottom:20px;
            right:20px;
            width:50px;
            height:50px;
            cursor:pointer;
            text-align:center;
            border-radius:50%;
            background-color:rgba(0,0,0,0.5);
            transition:all 0.3s;
            i{
                display:block;
                line-height:50px;
                font-size:32px;
                font-weight:700;
                color:#fff;
            }
            &:hover{
                background-color:#787977;
            }
        }
    }
    @keyframes left{
        to{
            transform: translateX(0px);
        }
        from{
            transform: translateX(-333px);
        }
    }
    @keyframes right{
        to{
            transform: translateX(0px);
        }
        from{
            transform: translateX(333px);
        }
    }

</style>