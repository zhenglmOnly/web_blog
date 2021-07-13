<template>
    <div id="NotFound">
        <Nav></Nav>
        <div class="con">
        </div>
    </div>
</template>

<script>
    import Nav from "../../components/Nav";
    export default {
        name: "NotFound",
        components:{Nav},
    }
</script>

<style lang="less" scoped>
    #NotFound{
        .con{
            position:relative;
            width:100%;
            min-height:520px;
            background:url("../../assets/img/404.jpg") center top/cover fixed;
        }
    }
</style>