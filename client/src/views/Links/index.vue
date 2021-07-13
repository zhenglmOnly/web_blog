<template>
    <div class="Links">
        <Nav></Nav>
        <div class="main">
            <div class="sban">
                <h3>链接申请说明</h3>
                <p>交换友链可在留言板留言</p>
                <div class="s_con">
                    <p>名称：博客</p>
                    <p>网址：http://localhost:8080</p>
                    <p>图标：https://www.tanj.com.cn/public/img/lg.png</p>
                    <p>描述：一个前端程序员的个人博客 | 技术栈</p>
                </div>
                <div>
                    <p>本站优先选择同类原创、内容相近的博客或网站，您的站点内容可以为技术类、IT科技、互联网和生活</p>
                    <p>* 任何包含违反国家法律法规内容的网站均不采纳</p>
                    <p>特别提醒：申请提交后若无其它原因将在24小时内完成审核,如超过时间还未通过,请留言或私信给我</p>
                </div>
            </div>
            <div class="msgPanel">
                <h3>友情连接</h3>
                <ul>
                    <li v-for="(item,index) in friendChain">
                        <a :href="item.hrefs">
                            <div>
                                <img :src="item.imgs" alt="">
                                <span>{{item.title}}</span>
                            </div>
                            <p>{{item.desc}}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Nav from"../../components/Nav";
    import a from"../../../api"
    const loadUnion = a.loadUnion;
    export default {
        name: "Links",
        data(){
            return{
                friendChain:[],
            }
        },
        components:{Nav},
        created(){
            loadUnion().then(res=>{
                this.friendChain = res.data.data;
            }).catch();
        },
    }
</script>

<style lang="less" scoped>
    .main{
        padding-top:81px;
        background-color:rgba(255,255,255,0.7);
        @media screen and (min-width: 320px) and (max-width: 480px) {
            padding:81px 15px;
        }
        @media only screen and (min-width: 321px) and (max-width: 1024px) {
            padding:81px 15px;
        }
        >.sban{
            padding:10px;
            background-color:#FBFBFB;
            h3{
                font-weight:600;
            }
            >p{
                height:30px;
                line-height:30px;
            }
            >.s_con{
                margin:10px 0 10px;
                padding:10px;
                border-left:2px solid #6bc30d;
                background-color:rgba(177, 191, 33, 0.5);
                p{
                    height:30px;
                    line-height:30px;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    vertical-align:middle;
                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        font-size:12px;
                    }
                }
            }
        }
        >.msgPanel{
            margin-top:20px;
            h3{
                font-weight:600;
            }
            ul{
                display:flex;
                flex-wrap:wrap;
                li{
                    width:21%;
                    margin:10px;
                    padding:15px 10px;
                    background-color:#fff;
                    transition:all 0.3s;
                    &:hover{
                        text-shadow:0 0 1px blue;
                        box-shadow:0 5px 9px #000;
                    }
                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        width:100%;
                    }
                    a{
                        div{
                            margin-bottom:10px;
                            img{
                                margin-left:12px;
                                display:inline-block;
                                width:40px;
                                height:40px;
                                border-radius:50%;
                            }
                            span{
                                font-size:16px;
                                margin-left:12px;
                            }
                        }
                        p{
                            margin:0 6px;
                            padding-top:5px;
                            border-top:1px dashed #c3c3c3;
                        }
                    }
                }
            }
        }
    }
</style>