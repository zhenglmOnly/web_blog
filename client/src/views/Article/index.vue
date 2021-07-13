<template>
    <div id="Article">
        <Nav></Nav>
        <div class="a_read">
            <div class="main">
                <div class="a_r_top">
                    <div class="a_r_t_h4">
                        <h3>【 {{extendList.title}} 】</h3>
                        <p class="a_r_t_grey">
                            <span>作者：</span>
                            <span>博主</span>
                            <span>围观群众： {{extendList.pv}}</span>
                            <span>更新于：{{extendList.date | getTime}}</span>
                        </p>
                    </div>
                    <div class="a_r_time">
                        <p>{{extendList.date | date}} </p>
                        <p>{{extendList.date | month}}<span>月</span></p>
                        <p>{{extendList.date | year}}</p>
                    </div>
                </div>
                <div class="a_r_con">
                    <div class="content" v-html="extendList.content"></div>
                    <div class="copyright">
                        <p>非特殊说明，本文版权归 博主 所有，转载请注明出处.</p>
                        <p>本文标题： 博主</p>
                        <p>本文网址： http://localhost:8080/blog/read/5e89a06e9cd62b07b4535a19</p>
                    </div>
                </div>
                <div class="nextinfo">
                    <div>
                        上一篇： <router-link to="">使用Css3制作文章</router-link>
                    </div>
                    <div>
                        下一篇：<router-link to="">6条文章</router-link>
                    </div>
                </div>
                <div class="a_r_pl">
                    <div class="a_r_p_title">
                        <h4>文章评论</h4>
                    </div>
                    <textarea id="demo" style="display: none;"></textarea>
                    <button  type="button" class="layui-btn layui-btn" @click="getplcon">提交评论</button>
                </div>
                <div class="a_r_plCon">
                    <ul class="a_r_plC_parent">
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
                                <div class="a_r_plC_c_parent">
                                    <div class="Quick">
                                        <i class="layui-icon layui-icon-location"></i>
                                        <span>地址</span>
                                        <span class="time">{{item.data}}</span>
                                        <a href="javascript:" @click="replayClick(pIndex)">
                                            {{(item.reply.onIndex[0]===pIndex && item.reply.onIndex[1]===undefined)?"收起":"回复"}}
                                        </a>
                                    </div>
                                    <ul class="a_r_plC_c_c_child">
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
                                                    <span class="time">{{value.data | getTime}}</span>
                                                    <a href="javascript:" @click="replayClick(pIndex,cIndex)">
                                                        {{(item.reply.onIndex[0]===pIndex&&item.reply.onIndex[1]===cIndex)?'收起':'回复'}}
                                                    </a>
                                                </div>

                                            </div>
                                        </li>
                                    </ul>
                                    <div class="reply" v-if="item.reply.ifshow">
                                        <textarea v-model="item.reply.text" :placeholder="'回复【'+item.reply.userName +'】:'"></textarea>
                                        <button type="button" class="layui-btn  layui-btn-xs" @click="getReplyTextCon(pIndex)">提交回复</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Nav from "../../components/Nav";
    import request from "../../../api/index";
    const getArticleOne = request.getArticleOne;
    const getifLogin = request.getifLogin;
    const getarticlereply = request.getarticlereply;
    const getarticlechilder = request.getarticlechilder;
    function getTwo(num){
        return (num<10?'0':'')+num;
    };
    export default {
        name: "Article",
        data(){
            return {
                extendList:[],
                layedit:null,
                index:0,
                form:[
                    /*_id: 5e930b727e30fe29802c7928,
                    artId: '5e8ddc633ba3332e44bc35e8',
                    user: {
                        img: 'http://localhost:3000/img/hdImg.jpg',
                        _id: 5e89c093b5b3ce0d9c43b8cc,
                        aduser: '有点甜'
                    },
                    content: '急急急',
                    data: 2020-04-12T12:37:06.586Z,
                    children: []*/

                ],
            }
        },
        components:{Nav},
        filters:{
            getTime(value){
                if(value){
                    let date = new Date(value),
                        yy = getTwo(date.getFullYear()),
                        MM = getTwo(date.getMonth()),
                        DD = getTwo(date.getDate()),
                        h = getTwo(date.getHours()),
                        m = getTwo(date.getMinutes()),
                        s = getTwo(date.getSeconds());
                    return `${yy}年${MM}月${DD}日${h}:${m}:${s}`;
                }
            },
            date(value){
                if(value)return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
            },
            month(value){
                if(value)return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
            },
            year(value){
                if(value)return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
            },
        },
        methods:{
            //提交文章评论
            getplcon(){
                let text = this.layedit.getContent(this.index);
                if(!text){
                    layer.msg('内容不能为空！', {icon: 2});
                    return;
                };
                getifLogin().then((res)=>{
                    if(res.data.userInfo){
                        //已经登陆了
                        getarticlereply({
                            artId:this.$route.params.id,
                            user:res.data.userInfo._id,
                            content:text,
                        }).then((res)=>{
                            console.log(res);
                            layer.msg('提交成功！', {icon: 1});
                        }).catch((e)=>{
                            console.log(e);
                            layer.msg(res.data.data, {icon: 1});
                        });
                    }else{
                        //未登录
                        layer.msg('请先登陆！', {icon: 2});
                    }
                }).catch((e)=>{
                    console.log("服务器错误")
                });
            },
            //回复评论按钮
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
                    console.log("服务器错误")
                });
            },
            //提交评论回复
            getReplyTextCon(pIndex){
                if(!this.form[pIndex].reply.text){
                    layer.msg('内容不能为空！', {icon: 2});
                    return;
                }
                getifLogin().then((res)=>{
                    if(res.data.userInfo){
                        console.log(this.form[pIndex]._id);
                        getarticlechilder({
                            _id:this.form[pIndex]._id,
                            user:res.data.userInfo._id,
                            content:this.form[pIndex].reply.text,
                            userName:this.form[pIndex].reply.userName,
                        }).then((res)=>{
                            if(res.data.code === 0){
                                layer.msg('提交成功！', {icon: 1});
                            }else{
                                layer.msg('提交失败，数据错误！', {icon: 2});
                            }
                        }).catch((e)=>{
                            console.log("服务器错误，请稍后重试")
                        });
                    };
                }).catch();
            },
        },
        created(){
            //获取文章内容
            let Id = this.$route.params.id;
            getArticleOne(Id).then((res)=>{
                if(res.data.code === 0){
                    this.extendList = res.data.data2;
                    let a = (res.data.data1).map((item)=>{
                        item.reply = {
                            user:"",
                            content:"",
                            userName:"",
                            data:new Date()+"",
                            ifshow:false,
                            onIndex:[],
                        };
                        return item;
                    });
                    this.form = a;
                }else{
                    this.$router.push("/NotFound")
                }
            }).catch((e)=>{
            });
        },
        mounted(){
            layui.use('layedit', ()=>{
                this.layedit = layui.layedit;
                this.index = this.layedit.build('demo',{
                    height: 160,
                    tool: [ 'face', '|','left', 'center', 'right',],
                }); //建立编辑器
            });
        },
    }
</script>

<style lang="less" scoped>
    .a_read{
        width:100%;
        padding-top:81px;
        >.main{
            padding:20px;
            background-color:rgba(255,255,255,0.97);
            overflow:hidden;
            @media screen and (min-width: 320px) and (max-width: 480px) {
                width:90%;
                margin:0 auto;
            }
            @media only screen and (min-width: 321px) and (max-width: 1024px) {
                width:90%;
                margin:0 auto;
            }
            >.a_r_top{
                position:relative;
                >.a_r_t_h4{
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
                    h3{
                        height:30px;
                        line-height:30px;
                        font-size:16px;
                        color:#2ea7e0;
                    }
                    >.a_r_t_grey{
                        span{
                            color:#666;
                            block:inline-block;
                            &:nth-child(2){
                                color:blue;
                            }
                            &:nth-child(3),
                            &:nth-child(4){
                                margin-left:12px;
                            }
                        }

                    }
                }
                .a_r_time{
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
            >.a_r_con{
                width:100%;
                overflow:hidden;
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    padding:15px 0;
                }
                .content{
                    >p{
                        line-height:35px;
                    }
                }
                .copyright{
                    p{
                        word-break:normal;
                    }
                }
            }
            >.nextinfo{
                padding:20px 0;
                div{
                    margin:10px  0;
                  a{
                      display:inline-block;
                      color:steelblue;
                  }
                }
            }
            >.a_r_pl{
                >.a_r_p_title{
                    margin-bottom:15px;
                    border-bottom:1px solid #e8e9e7;
                    h4{
                        display:inline-block;
                        height:40px;
                        padding:0 6px;
                        line-height:40px;
                        font-size:20px;
                        border-bottom:1px solid yellowgreen;
                    }
                }
                button{
                    margin-top:10px;
                }
            }
            >.a_r_plCon{
                >.a_r_plC_parent{
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
                            >.a_r_plC_c_name{
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
                            >.a_r_plC_c_parent{
                                .Quick{
                                    color:#999;
                                    padding-bottom:5px;
                                    border-bottom:1px dashed #3333;
                                    a{
                                        display:inline-block;
                                        color:green;
                                    }
                                }
                                >.a_r_plC_c_c_child{
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

                }
            }
        }

    }
</style>