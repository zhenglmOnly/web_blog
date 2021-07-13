<template>
    <div id="Dairy">
        <Nav></Nav>
        <div class="main">
            <div class="block">
                <el-timeline>
                    <el-timeline-item v-for="(item,index) in activities" :timestamp=item.time placement="top">
                        <el-card>
                            <div class="htmlCom" v-html="item.content"></div>
                        </el-card>
                    </el-timeline-item>
                    <!--<el-timeline-item v-for="(item,index) in activities" :timestamp=item.time placement="top">
                        <el-card v-for="(value,index) in item.parent">
                            <p>{{value.time}}</p>
                            <div class="htmlCom" v-html="value.content"></div>
                        </el-card>
                    </el-timeline-item>-->
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script>
    import Nav from "../../components/Nav"
    import a from "../../../api"
    const loadDiary = a.loadDiary;
    export default {
        name: "Dairy",
        data(){
            return{
                activities:[],
            }
        },
        components:{
            Nav,
        },
        created(){
            loadDiary().then(res=>{
                this.activities = res.data.data;
            }).catch();
        }
    }
</script>

<style lang="less" scoped>
    #Dairy{
        >.main{
            padding-top:81px;
            @media screen and (min-width: 320px) and (max-width: 480px) {
                padding:81px 15px;
            }
            @media only screen and (min-width: 321px) and (max-width: 1024px) {
                padding:81px 15px;
            }
            .block{
                padding:20px;
                background-color:rgba(255,255,255,0.96);
                >.el-timeline{
                    margin:40px;
                    @media screen and (min-width: 320px) and (max-width: 480px) {
                        margin:20px;
                    }
                    @media only screen and (min-width: 321px) and (max-width: 1024px) {
                        margin:20px;
                    }
                    /deep/.el-timeline-item__node--normal{
                        left:-5px;
                        width:20px;
                        height:20px;
                    }
                    li{
                        /deep/.el-card__body{
                            >.htmlCom{
                                img{
                                    display:block;
                                    max-width:300px;
                                }

                            }
                        }
                        /deep/.el-card{
                            margin-top:15px;

                            p{
                                margin-top:6px;
                                color:#999;
                            }
                        }
                    }


                }
            }

        }
    }
</style>