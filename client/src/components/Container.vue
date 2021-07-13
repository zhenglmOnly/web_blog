<template>
    <div id="Container">
        <div class="section">
            <div class="mains">
                <Acontent></Acontent>
            </div>
            <div class="aside">
                <div :class="['search',{'fixed':ifFixed}]">
                    <div class="s_main">
                        <label for="searc">
                            <input id="searc" placeholder="请输入内容" v-model="searchInfo" @input="handleInput"></input>
                            <i class="el-icon-search"></i>
                        </label>
                        <ul class="result" v-if="resultShow">
                            <li v-for="(item,index) in resultList">
                                <router-link :to="'/article/'+item._id">
                                    {{item.title}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="s_article">
                        <ul @mouseleave="handleMouseleave">
                            <li @mouseenter="handleMouseenter(index)" v-for="(value,index) in getAllarticle">
                                <router-link :to="'/blog/'+index">{{value}}</router-link>
                            </li>
                        </ul>
                        <div :style="{top:coverIndex*40+'px'}"></div>
                    </div>
                </div>
                <!--右边浮块    手机或平板设备显示-->
                <div class="sliderNav_btn" @click="ifSliderNav = !ifSliderNav"><i class="icon el-icon-arrow-left"></i></div>
                <div :class="['slidernav',ifSliderNav?'shownav':'']"   @click="ifSliderNav = !ifSliderNav">
                    <div class="s_item"  @click="ifSliderNav = !ifSliderNav">
                        <h3>文章分类</h3>
                        <ul>
                            <li v-for="(value,index) in getAllarticle">
                                <router-link :to="'/blog/'+index">{{value}}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="hot oItem">
                    <h4 class="h_title">热门文章</h4>
                    <div class="list">
                        <ul>
                            <li v-for="(value,index) in articleHot">
                                <span>{{index+1}}</span>
                                <router-link :to="'/article/'+value._id">{{value.title}}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="topRecommendation oItem">
                    <h4 class="t_title">置顶推荐</h4>
                    <div class="list">
                        <ul>
                            <li >
                                <span>1</span>
                                <router-link :to="'/article/'+gettopRecommendation._id">{{gettopRecommendation.title}}</router-link>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="recommend oItem">
                    <h4 class="t_title">最近访客</h4>
                    <ul>
                        <li v-for="(item,index) in visitor">
                            <a href="javascript:">
                                <img :src="item.img" alt="">
                                <span>{{item.aduser}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Acontent from './Acontent';
    import request from '../../api/index';
    let getArticleInfo = request.getArticleInfo;
    let getArticleHot = request.getArticleHot;
    let getsecrchList = request.getsecrchList;
    let getvisitor = request.getvisitor;
    export default {
        name: "Container",
        components:{
            Acontent
        },
        data(){
            return{
                ifFixed: false,
                ifSliderNav:false,
                searchInfo: '',//搜索
                Index:null,
                secrchTime:null,
                resultShow:false,//搜索列表显示隐藏
                resultList:[],//搜索列表
                article:[],//文章分类
                articleHot:[],//热门文章
                coverIndex:this.$route.params.id*1,//文章分类 top值的参数
                visitor:[],//最近访客
                skip:0,
                limit:8,

            }
        },
        computed:{
            getAllarticle(){
                return ['全部文章',...this.article]
            },
            gettopRecommendation(){
                return this.articleHot[0]||{};
            },
        },
        methods:{
            handleMouseenter(index){
                this.coverIndex = index;
            },
            handleMouseleave(){
                this.coverIndex = this.$route.params.id*1;
            },
            handleWindowScroll(){
                let scrollTop = document.documentElement.scrollTop;
                this.ifFixed = scrollTop>=900;
            },
            handleInput(){
                clearTimeout(this.secrchTime);
                this.secrchTime = setTimeout(()=>{
                    let text = this.searchInfo.trim();
                    if(!text){
                        this.resultShow = false;
                        return
                    }
                    this.resultShow = false;
                    getsecrchList(text).then((res)=>{
                        if(res.data.code ===1){
                            this.resultShow = true;
                            this.resultList = res.data.data;
                        }else{
                            this.resultList = [];
                        }
                        console.log(res)
                    }).catch((e)=>{

                    });
                },500);
            },
        },
        watch:{
            $route(to,from){
                this.$router.go(0);
            }
        },
        created(){
            getArticleInfo().then((res)=>{
                this.article = res.data.data.tags;
            }).catch((err)=>{
                console.log("失败",err);
            });
            getArticleHot({
                skip:this.skip,
                limit:this.limit,
            }).then((res)=>{
                this.articleHot = res.data.data
            }).catch((err)=>{
                console.log("失败",err);
            });
            getvisitor().then((res)=>{
                this.visitor = res.data.data;
            }).catch((err)=>{
                this.visitor = [];
                console.log(err)
            });
        },
        mounted(){
            this.handleWindowScroll();
            window.addEventListener("scroll",this.handleWindowScroll);
        },
        destroyed(){
            window.removeEventListener("scroll",this.handleWindowScroll);
        }
    }
</script>

<style lang="less" scoped>
    #Container{
        width:100%;
        padding-top:81px;
        >.section{
            box-sizing:border-box;
            max-width:1260px;
            margin:0 auto;
            padding:0 50px;
            &::after{
                content:"";
                display:block;
                clear:both;
            }

            @media screen and (min-width: 320px) and (max-width: 480px) {
                padding:0 15px;
            }
            @media only screen and (min-width: 321px) and (max-width: 1024px) {
                padding:0 15px;
            }
            >.mains{
                float:left;
                width:calc(100% - 300px - 20px);
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    width:100%;
                }
                @media only screen and (min-width: 321px) and (max-width: 1024px) {
                    width:100%;
                }
            }
            >.aside{
                float:right;
                width:300px;
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    width:100%;
                }
                @media only screen and (min-width: 321px) and (max-width: 1024px) {
                    width:100%;
                }
                >.search{
                    background-color:#fff;
                    &.fixed{
                        position:fixed;
                        z-index:9;
                        animation:searchMove .5s 1 ease-in-out;
                        animation-fill-mode:forwards;
                    }

                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        display:none;
                    }
                    @media only screen and (min-width: 321px) and (max-width: 1024px) {
                        display:none;
                    }
                    @keyframes searchMove{
                        0%{top:-500px}
                        40%{top:81px}
                        65%{top:60px}
                        100%{top:81px}
                    }
                    >.s_main{
                        position:relative;
                        width:100%;
                        height:80px;
                        padding:20px;
                        box-sizing:border-box;
                        background-color:saddlebrown;
                        label{
                            position:relative;
                            display:block;
                            width:100%;
                            height:40px;
                            z-index:70;
                            input{
                                width:100%;
                                height:40px;
                                padding:0 20px;
                                font-size:16px;
                                border:0px;
                                border-radius:20px;
                                outline:none;
                                box-sizing:border-box;
                            }
                            i{
                                display:block;
                                position:absolute;
                                top:8px;
                                right:8px;
                                width:22px;
                                height:22px;
                                line-height:22px;
                                font-size:20px;
                                font-weight:700;
                                text-align:center;
                                color:yellowgreen;
                                cursor:pointer;
                            }
                        }
                        >.result{
                            position:absolute;
                            top:42px;
                            left:19px;
                            width:260px;
                            padding:20px 0;
                            border:1px solid saddlebrown;
                            border-top:1px solid transparent;
                            border-bottom-left-radius:16px;
                            border-bottom-right-radius:16px;
                            background-color:#fff;
                            z-index:60;
                            li{
                                a{
                                    padding:10px;
                                    transition: all 0.3s;
                                    &:hover{
                                        background-color:#eaeaea;
                                    }
                                    span{
                                        font-weight:600;
                                        color:greenyellow;
                                    }
                                }
                            }
                        }
                    }
                    >.s_article{
                        width:100%;
                        height:240px;
                        margin-top:20px;
                        padding-bottom:20px;
                        position:relative;
                        ul{
                            li{
                                position:relative;
                                z-index:20;
                                height:40px;
                                a{
                                    display:block;
                                    width:200px;
                                    height:40px;
                                    margin:0 30px;
                                    padding:0 20px;
                                    line-height:40px;
                                    font-size:16px;
                                    color:#787977;
                                }
                            }
                        }
                        div{
                            position:absolute;
                            top:0px;
                            right:0px;
                            width:100%;
                            height: 40px;
                            border-right:6px solid #484947;
                            transition:.3s;
                            background-color:#f8f9f7;
                            box-sizing:border-box;
                        }
                    }
                }
                >.sliderNav_btn{
                    position:fixed;
                    right:0;
                    top:40%;
                    width:19px;
                    height:30px;
                    i{
                        font-size:26px;
                        font-weight:700;
                        color:#fff;
                        height:30px;
                        line-height:30px;
                    }
                }
                >.slidernav{
                    display:none;
                    position:fixed;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                    opacity:1;
                    background-color:rgba(0,0,0,0.9);
                    z-index:99;
                    >.s_item{
                        position:absolute;
                        top:61px;
                        right:0;
                        width:150px;
                        height:100%;
                        padding:20px 8px 0;
                        background-color:dimgrey;
                        text-align:center;
                        h3{
                            margin-bottom:8px;
                            padding-bottom:8px;
                            border-bottom:1px solid yellowgreen;
                            color:#fff;
                        }
                        ul{
                            li{
                                height:25px;
                                line-height:25px;
                                margin:10px auto;
                                a{
                                    color:#fff;
                                    border:1px solid greenyellow;
                                    background-color:yellowgreen;
                                }
                            }
                        }
                    }
                }
                >.shownav{
                    display:block;
                }
                >.oItem{
                    width:100%;
                    margin-top:20px;
                    background-color:#fff;
                    h4{
                        margin:0 20px;
                        padding:15px 5px;
                        font-size:18px;
                        font-weight:400;
                        border-bottom:1px solid #e8e9e7;
                    }
                }
                >.hot,.topRecommendation{
                    width:100%;
                    >.list{
                        ul{
                            padding:10px 0 10px 20px;
                            li{
                                width:100%;
                                position:relative;
                                span{
                                    display:block;
                                    position:absolute;
                                    top:4px;
                                    left:0;
                                    width:22px;
                                    height:22px;
                                    line-height:22px;
                                    text-align:center;
                                    border-radius:50%;
                                    background-color: #edefee;
                                }
                                a{
                                    height:32px;
                                    margin:3px 0;
                                    padding:0 30px;
                                    line-height:32px;
                                    color:#787977;
                                    overflow:hidden;
                                    &:hover{
                                        color:yellowgreen;
                                        text-decoration:underline;
                                    }
                                }
                            }
                            li:nth-child(1) span{
                                color:#fff;
                                background-color: #e24d46;

                            }
                            li:nth-child(2) span{
                                color: #fff;
                                background-color: #2ea7e0;
                            }
                            li:nth-child(3) span{
                                color:#fff;
                                background-color: #6bc30d;
                            }
                        }
                    }
                }
                >.recommend{
                    ul{
                        display:flex;
                        flex-wrap:wrap;
                        padding:10px 22px;
                        li{
                            margin:0 2px 4px 2px;
                            a{
                                position:relative;
                                width:60px;
                                height:60px;
                                img{
                                    width:60px;
                                    height:60px;
                                }
                                span{
                                    display:block;
                                    position:absolute;
                                    left:0;
                                    bottom:0;
                                    width:60px;
                                    height:25px;
                                    font-size:12px;
                                    line-height:25px;
                                    text-align:center;
                                    color:#fff;
                                    overflow:hidden;
                                    text-overflow:ellipsis;
                                    white-space:nowrap;
                                    background-color:rgba(0,0,0,.2);
                                }
                            }
                        }
                    }
                }
            }
        }

    }
</style>