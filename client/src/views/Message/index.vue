<template>
    <div id="Message">
        <Nav></Nav>
        <div class="main">
            <div class="m_conent">
                <div class="m_c_title">
                    <h2>留言板</h2>
                    <p>沟通交流，拉近你我！</p>
                </div>
                <div class="m_c_text">
                    <RichText @Sub="getTextCon"></RichText>
                </div>
            </div>
            <div class="m_list">
                <ul class="m_l_parent">
                    <li v-for="(item,pIndex) in form">
                        <div class="img">
                            <img :src="item.user.img" alt="">
                        </div>
                        <div class="con">
                            <div class="m_l_p_c_name">
                                <span>{{item.user.aduser}}</span>
                                <span>{{item.data}}</span>
                            </div>
                            <div class="text" v-html="item.content"></div>
                            <div class="m_l_p_c_parent">
                                <div class="Quick">
                                    <i class="layui-icon layui-icon-location"></i>
                                    <span>地址</span>
                                    <span class="time">{{item.data | getData}}</span>
                                    <a href="javascript:" @click="replayClick(pIndex)">
                                        {{(item.reply.onIndex[0]===pIndex && item.reply.onIndex[1]===undefined)?"收起":"回复"}}
                                    </a>
                                </div>
                                <ul class="m_l_p_c_c_child">
                                    <li v-for="(value,cIndex) in item.children">
                                        <div class="img">
                                            <img :src="value.user.img" alt="">
                                        </div>
                                        <div class="con">
                                            <span>{{value.user.aduser}}</span>
                                            回复
                                            <span>{{value.userName}}</span>
                                            <div class="text">{{value.content}}</div>
                                            <div class="Quick">
                                                <i class="layui-icon layui-icon-location"></i>
                                                <span>地址</span>
                                                <span class="time">{{value.data | getData}}</span>
                                                <a href="javascript:" @click="replayClick(pIndex,cIndex)">
                                                    {{(item.reply.onIndex[0]===pIndex && item.reply.onIndex[1]===cIndex)?"收起":"回复"}}
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="reply" v-if="item.reply.ifshow">
                                <textarea v-model="item.reply.text" :placeholder="'回复【'+item.reply.userName +'】:'"></textarea>
                                <button type="button" class="layui-btn  layui-btn-xs" @click="getReplyTextCon(pIndex)">提交回复</button>
                            </div>
                        </div>
                    </li>

                </ul>
                <div class="conLoad" v-if="ifLoad">
                    <span>加载中</span>
                    <svg viewBox="25 25 50 50"class="circular">
                        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                    </svg>
                </div>
                <div class="conNull" v-if="ifShow">
                    <p>没有更多了。</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import Nav from "../../components/Nav";
    import RichText from "../../components/RichText";
    import request from "../../../api";
    const getifLogin  = request.getifLogin;
    const createConent = request.createConent;
    const getreplylist = request.getreplylist;
    const getparentreply = request.getparentreply;
    function toTwp(num){
        return (num<10?"0":"") + num;
    }
    export default {
        name: "Message",
        data(){
            return{
                form:[],
                skip: 0,
                limit:3,
                ifLoad:false,
                ifShow:false,
            }
        },
        components:{
            Nav,
            RichText,
        },
        filters:{
            getData(val){
                let data = new Date(val),
                    YY = toTwp(data.getFullYear()),
                    MM = toTwp(data.getMonth()+1),
                    DD = toTwp(data.getDate()),
                    h = toTwp(data.getHours()),
                    m = toTwp(data.getMinutes()),
                    s = toTwp(data.getSeconds());
                return `${YY}年${MM}月${DD}日 ${h}:${m}:${s}`;
            }
        },
        watch:{
            tops(){
                if(this.ifShow || this.ifLoad)return;


                console.log(this.tops,"---",height)
                if(this.tops+clientH >= height-100){
                    //console.log (top+clientH ,"-----", height-100)
                    this.ifLoad = true;
                    this.timeI();
                }
            }
        },
        methods:{
            //提交留言
            getTextCon(val){
                if(!val){
                    layer.msg('内容不能为空！', {icon: 2});
                    return;
                }
                getifLogin().then((res)=>{
                    if(res.data.userInfo){
                        //已经登陆了，可以把数据提交到数据库
                        createConent({
                            user:res.data.userInfo._id,
                            content:val
                        }).then((res)=>{
                            layer.msg(res.data.data, {icon:1});
                            this.$router.go(0);
                            //this.fnreplyList();
                        }).catch((e)=>{
                            layer.msg(res.data.data, {icon: 2});
                        })
                    }else{
                        //未登录
                        layer.msg('请先登陆！', {icon: 2});
                    }
                }).catch((e)=>{
                    layer.msg('服务器错误', {icon: 2});
                })
            },
            //回复留言按钮
            replayClick(pIndex,cIndex){
                getifLogin().then((res)=>{
                    if(res.data.userInfo){
                        //已经登陆了
                        if(pIndex === undefined)return;
                        let pIndexData = this.form[pIndex];
                        if(pIndex === pIndexData.reply.onIndex[0] && cIndex === pIndexData.reply.onIndex[1]){
                            //收起
                            pIndexData.reply.ifshow = false;
                            pIndexData.reply.onIndex = [];
                        }else{
                            //回复
                            pIndexData.reply.ifshow = true;
                            pIndexData.reply.onIndex = [pIndex,cIndex];
                        }
                        if(cIndex !== undefined){
                        //子级的回复
                            this.form[pIndex].reply.userName = this.form[pIndex].children[cIndex].user.aduser;
                        }else{
                        //父级的回复
                            this.form[pIndex].reply.userName = this.form[pIndex].user.aduser;
                        }
                    }else{
                        layer.msg('请先登陆！', {icon: 2});
                    }
                }).catch((e)=>{
                    layer.msg('服务器错误,请稍后再试！', {icon: 2});
                })
            },
            //提交回复留言
            getReplyTextCon(pIndex){
                if(!this.form[pIndex].reply.text){
                    layer.msg('内容不能为空！', {icon: 2});
                    return;
                }
                getifLogin().then((res)=>{
                    if(res.data.userInfo){
                        getparentreply({
                            parentId:this.form[pIndex]._id,
                            userName:this.form[pIndex].reply.userName,
                            content:this.form[pIndex].reply.text,
                            user:res.data.userInfo._id
                        }).then((res)=>{
                            layer.msg('留言成功!', {icon: 1});
                            this.form[pIndex].reply.onIndex = [];
                            this.form[pIndex].reply.text = "";
                            this.form[pIndex].reply.ifshow = false;
                            this.$router.go(0);
                            this.fnreplyList();
                        }).catch((e)=>{
                            console.log("服务器错误");
                        });

                    }else{
                        layer.msg('请先登陆！', {icon: 2});
                    }
                }).catch((e)=>{
                    layer.msg('服务器错误,请稍后再试！', {icon: 2});
                });

            },
            //获取留言列表
            fnreplyList(cb){
                this.limit += 5;
                getreplylist({
                    skip:this.skip,
                    limit:this.limit,
                }).then((res)=>{
                    let data = res.data.data;
                    if(data.length){
                        let d = data.map((item)=>{
                            item.reply={
                                user:"",
                                content:"",
                                userName:"",
                                data:new Date()+"",
                                ifshow:false,
                                onIndex:[],
                            };
                            return item;
                        });
                        this.form=d;
                    }else{
                        this.ifShow = true;
                    }
                    this.ifShow = true;
                }).catch((e)=>{
                    this.ifShow = true;
                });
            },
            //滚动加载
            getWindowScroll() {
                if (this.ifLoad || this.ifShow) return;
                let height = document.documentElement.offsetHeight;
                let clientH = document.documentElement.clientHeight;
                let top = document.documentElement.scrollTop;
                if (top + clientH >= height - 200) {
                    this.ifLoad = false;
                    this.limit += 5;
                    getreplylist({
                        skip: this.skip,
                        limit: this.limit,
                    }).then((res) => {
                        let data = res.data.data;
                        if (data.length) {
                            let d = data.map((item) => {
                                item.reply = {
                                    user: "",
                                    content: "",
                                    userName: "",
                                    data: new Date() + "",
                                    ifshow: false,
                                    onIndex: [],
                                };
                                return item;
                            });
                            this.form = d;
                        } else {
                            this.ifShow = true;
                        }
                        this.ifShow = true;
                    }).catch((e) => {
                    });
                }
            }

        },
        created(){
            //初始化留言列表
            this.fnreplyList();
        },
        mounted(){
            window.addEventListener("scroll",this.getWindowScroll);
        },
        destroyed(){
            window.removeEventListener("scroll",this.getWindowScroll);
        },
    }
</script>

<style lang="less" scoped>
    #Message{
        width:100%;
        height:100%;
        >.main{
            padding-top:81px;
            @media screen and (min-width: 320px) and (max-width: 480px) {
                padding:81px 15px;
            }
            @media only screen and (min-width: 321px) and (max-width: 1024px) {
                padding:81px 15px;
            }
            >.m_conent{
                width:100%;
                background-color:#fff;
                >.m_c_title{
                    text-align:center;
                    h2{
                        padding:10px 0;
                    }
                    p{
                        margin:10px 0;
                    }
                }
                >.m_c_text{
                    padding:10px;
                    margin:5px;
                }
                button{
                    margin-top:15px;
                }
            }
            >.m_list{
                background-color:rgba(255,255,255,0.95);
                >.m_l_parent{
                    >li{
                        position:relative;
                        margin:20px 0;
                        padding:20px;
                        border-bottom:1px dashed #666;
                        .img{
                            position:absolute;
                            width:45px;
                            height:45px;
                            img{
                                width:45px;
                                height:45px;
                            }
                        }
                        .con{
                            color:brown;
                           margin-left:50px;
                            .time{
                                margin:0 10px;
                            }
                            >.m_l_p_c_name{
                                span:nth-child(1){
                                    color:blue;
                                }
                                span:nth-child(2){
                                    margin-left:5px;
                                    color:blueviolet;
                                }
                            }
                            >.text{
                                color:#000;
                                margin:5px 0 15px 0;
                            }
                            >.m_l_p_c_parent{
                                .Quick{
                                    color:#999;
                                    padding-bottom:5px;
                                    border-bottom:1px dashed #3333;
                                    a{
                                        display:inline-block;
                                        color:green;
                                    }
                                }
                                >.m_l_p_c_c_child{
                                    padding:5px;
                                    .con{
                                        >span{
                                             color:blue;
                                        }
                                    }
                                    .Quick{
                                        border-bottom:0;
                                    }
                                }
                            }
                            >.reply{
                                textarea{
                                    display:block;
                                    resize:none;
                                    padding:5px;
                                    width:100%;
                                    height:60px;
                                }
                                button{
                                    display:block;
                                    margin-top:10px;
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
        }
    }
</style>