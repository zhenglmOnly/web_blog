<template>
    <div id="Acontent">
        <div class="section" v-for="value in article">
            <div class="s_top">
                <div class="s_t_h4">
                    <router-link :to="'/article/'+value._id">
                        <span>【{{value.type}}】</span>{{value.title}}
                    </router-link>
                </div>
                <div class="s_time">
                    <p>{{value.date | date}} </p>
                    <p>{{value.date | month}}<span>月</span></p>
                    <p>{{value.date | year}} </p>
                </div>
            </div>
            <div class="s_main">
                <router-link :to="'/article/'+value._id">
                    <img :src="value.surface" alt="">
                    <i></i>
                </router-link>
                <div v-html="value.content"></div>
            </div>
            <div class="s_read">
                <router-link :to="'/article/'+value._id">继续阅读</router-link>
            </div>
            <div class="s_footer">
                <div class="s_f_tag">
                    <i class="el-icon-price-tag"></i>
                    <a href="javascript:">{{value.tag}}</a>
                </div>
                <div class="s_f_right">
                    <span class="s_f_read">
                        <i class="el-icon-view"></i><span>{{value.pv}}</span>
                    </span>
                    <span class="s_f_message">
                        <i class="el-icon-edit-outline"></i><span>{{value.pl}}</span>
                    </span>
                </div>

            </div>
        </div>
        <div class="conLoad" v-if="ifLoad">
            <span>加载中</span>
            <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
            </svg>
        </div>
        <div class="conNull" v-if="ifShow">
            <p>哼╭(╯^╰)╮，我也是有底线的。</p>
        </div>
    </div>
</template>

<script>
    import request from "../../api";
    const getArticleAll = request.getArticleAll;
    export default {
        name: "Acontent",
        data(){
            return {
                article: [],
                ifShow: false,//底线
                ifLoad: false,//加载
            }
        },
        computed:{
            id(){
                return this.$route.params.id;
            }
        },
        watch:{
            id(){
                document.documentElement.scrollTop = 0;
                this.getArticle()
            }
        },
        filters:{
            date(value){
                if(value)return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
            },
            month(value){
                if(value)return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
            },
            year(value){
                if(value)return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
            }
        },
        methods:{
            getArticle(){
                this.ifShow = this.ifLoad = false;
                getArticleAll(this.id,true).then((res)=>{
                    this.article = res.data.data;
                }).catch((err)=>{
                    console.log("失败",err)
                });
            },
            getWindowScroll(){
                if(this.ifLoad || this.ifShow)return;
                let height = document.documentElement.offsetHeight;
                let top = document.documentElement.scrollTop;
                let clientH = document.documentElement.clientHeight;



                if(top+clientH >= height-100){
                    this.ifLoad = true;
                    getArticleAll(this.id,false).then((res)=>{
                       this.ifLoad = false;
                       if(res.data.data.length){
                           this.article.push(...res.data.data);
                       }else{
                           this.ifShow = true;
                       }
                   }).catch(_=>{});
                }
            }
        },
        created(){
            this.getArticle();
        },
        mounted(){
            window.addEventListener("scroll",this.getWindowScroll);

        },
        destroyed(){
            window.removeEventListener("scroll",this.getWindowScroll);
        }
    }
</script>

<style lang="less" scoped>
    #Acontent{
        margin-right:20px;
        width:100%;
        overflow:hidden;
        >.section{
            min-width:374px;
            margin-bottom:20px;
            padding:20px 30px;
            background-color:#fff;
            animation:show 0.7s 1;
            animation-fill-mode:forwards;
            @keyframes show{
                from{opacity:0.5;transform:scale(0.5)}
                to{opacity:1;transform:scale(1)}
            }
            @media screen and (min-width: 320px) and (max-width: 480px) {
                min-width:100%;
                padding:20px;
                box-sizing:border-box;
            }
            @media only screen and (min-width: 321px) and (max-width: 1024px) {
                min-width:100%;
                box-sizing:border-box;
            }
            >.s_top{
                position:relative;
                >.s_t_h4{
                    width:100%;
                    margin-right:96px;
                    padding:5px 0 5px 0;
                    border-bottom:1px solid #e8e9e7;
                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        width:100%;
                        margin-right:0;
                    }
                    @media only screen and (min-width: 768px) and (max-width: 1024px) {
                        margin-right:0;
                        width:86%;
                    }
                    span{
                        height:30px;
                        line-height:30px;
                        font-size:16px;
                        color:#2ea7e0;
                    }
                    a{
                        display:inline-block;
                        font-size:18px;
                        height:30px;
                        line-height:30px;
                        color:#333;
                        &:hover{
                            color:#6bc30d;
                            text-decoration:underline;
                        }
                        @media screen and (min-width: 320px) and (max-width: 480px) {
                            width:100%;
                            overflow:hidden;
                        }
                        @media only screen and (min-width: 321px) and (max-width: 1024px) {
                            width:100%;
                            overflow:hidden;
                        }
                    }
                }
                .s_time{
                    position:absolute;
                    top:-16px;
                    right:0;
                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        display:none;
                    }
                    p{
                        display:inline-block;
                        font-size:16px;
                        color:#989997;
                        &:nth-child(1){
                            display:block;
                            position:relative;
                            top:2px;
                            font-size:36px;
                            font-weight:700;
                            text-align:center;
                            color:#6bc30d;
                        }
                        &:nth-child(3){
                            margin-left:15px;
                        }

                    }
                }
            }
            >.s_main{
                margin-top:20px;
                min-height: 200px;
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    margin-right:0;
                }
                a{
                    position:relative;
                    float:left;
                    width:300px;
                    height:180px;
                    border:1px solid #e8e9e7;
                    overflow:hidden;
                    margin-right:20px;
                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        float:none;
                        width:100%;
                        margin-right:0;
                    }
                    i{
                        position:absolute;
                        top:0;
                        left:0;
                        height:200px;
                        transform:translateX(-40px;) skew(-4deg);
                        box-shadow:0 0 30px 20px rgba(255,255,255,0.4);
                    }
                    &:hover i{
                        transform:translateX(350px;) skew(-4deg);
                    }
                    img{
                        width:100%;
                        height:100%;

                    }
                }
                div{
                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        margin:15px 0;
                    }
                }
            }
            >.s_read{
                position:relative;
                height:40px;
                line-height:40px;
                a{
                    color:#000;
                    font-weight:600;
                    &:hover{
                        color:#6bc30d;
                        text-decoration:underline;
                    }
                }
                &::after{
                    content:"";
                    display:block;
                    position:absolute;
                    top: 20px;
                    left: 100px;
                    width:86%;
                    height:1px;
                    background-color:#d0d0d0;
                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        width:68%;
                    }

                }
            }
            >.s_footer{
                display:flex;
                justify-content:space-between;
                >.s_f_tag{
                    i{
                        font-size:16px;
                    }
                    a{
                        display:inline-block;
                        margin-left:6px;
                        color: #fff;
                        background: #6bc30d;
                    }
                }
                >.s_f_right{
                    >.s_f_read{
                        i{
                           margin:0 10px;
                        }
                    }
                    >.s_f_message{
                        margin-left:20px;
                        i{
                            margin:0 10px;
                        }
                    }
                }

            }
        }
        >.conLoad{
            margin-bottom:20px;
            text-align:center;
            background-color:#fff;
            span{
                margin-right:10px;
                color:#666;
            }
            >.circular{
                vertical-align: middle;
                height:42px;
                width:42px;
                animation:loading-rotate 2s linear infinite;
                >.path{
                    animation: loading-dash 1.5s ease-in-out infinite;
                    stroke-dasharray: 90,150;
                    stroke-dashoffset: 0;
                    stroke-width: 2;
                    stroke: #409eff;
                    stroke-linecap: round;
                }
                @keyframes loading-dash{
                    0%{
                        stroke-dasharray:1,200;
                        stroke-dashoffset:0;
                    }
                    50%{
                        stroke-dasharray:90,150;
                        stroke-dashoffset:-40px;
                    }
                    100%{
                        stroke-dasharray:90,150;
                        stroke-dashoffset:-120px;
                    }
                }
            }
            @keyframes loading-rotate{
                100% {
                    transform: rotate(1turn);
                }
            }


        }
        >.conNull{
            padding:10px 0;
            text-align:center;
            background-color:#fff;
        }
    }
</style>