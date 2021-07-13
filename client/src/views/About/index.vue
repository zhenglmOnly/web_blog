<template>
    <div class="About">
        <Nav></Nav>
        <div class="main">
            <div class="a_aboutMe">
                <h4 class="title">关于我:</h4>
                <p>可以通过以下方式联系到我：</p>
                <p>邮 箱 ：zhenglm_web@163.com</p>
                <p>关于本站</p>
                <p>本站建于2020年1月，主要是个人爱好写着玩。</p>
            </div>
            <div class="a_structure">
                <h4 class="title">本站结构:</h4>
                <p>前 端 ：Layui + Element</p>
                <p>后 端 ：Node + MongoDB</p>
                <p>本站采用阿里云提供的服务器ESC和存储对象OSS。</p>
            </div>
            <div class="a_copyright">
                <h4 class="title">关于版权:</h4>
                <p>本站采用「 署名-非商业性使用 4.0 国际 (CC BY-NC 4.0)」创作共享协议。
                    只要在使用时注明出处，那么您可以可以对本站所有原创内容进行转载、节选、二次创作，
                    但是您不得对其用于商业目的。</p>
            </div>
            <div class="a_Explain">
                <h4 class="title">特别说明:</h4>
                <p>本站文章仅代表个人观点，和任何组织或个人无关。</p>
                <p>本站前端开发代码没有考虑对IE浏览器的兼容。</p>
                <p>用户邮箱仅作回复消息用，不对外使用。</p>
            </div>
            <img src="../../assets/img/bg.jpg" alt="">
        </div>
    </div>
</template>

<script>
    import Nav from"../../components/Nav";
    export default {
        name: "About",
        components:{Nav},
    }
</script>

<style lang="less" scoped>
        .main{
            padding-top:81px;
            background-color:rgba(255,255,255,0.8);
            @media screen and (min-width: 320px) and (max-width: 480px) {
                padding:81px 15px;
            }
            @media only screen and (min-width: 321px) and (max-width: 1024px) {
                padding:81px 15px;
            }
            div{
                margin-bottom:20px;
                h4{
                    margin:30px 0;
                    padding-left:10px;
                    height:30px;
                    font-size:18px;
                    font-weight:600;
                    line-height:30px;
                    border-left:4px solid forestgreen;
                }
                p{
                    margin:10px 0;
                    padding-left:10px;
                    line-height:16px;
                }
            }
            img{
                max-width:1170px;
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    width:100%;
                }
                @media only screen and (min-width: 321px) and (max-width: 1024px) {
                   width:100%;
                }
            }
        }

</style>