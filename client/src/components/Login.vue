<template>
    <el-dialog
            title="用户登陆"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
        <el-form
                ref="form"
                :model="form"
                label-width="80px"
                :rules="rules">
            <el-form-item label="用户名" prop="user">
                <el-input type="user" v-model="form.user" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="form.pass"  show-password></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClick" :disabled="submitDisabled">登陆</el-button>
        </span>
    </el-dialog>

</template>

<script>
    import request from "../../api";
    const getLogin = request.getLogin;
    export default {
        name: "Login",
        data(){
            return{
                form:{
                    user: "",
                    pass: "",
                },
                submitDisabled:false,
                rules:{
                    user : [
                        { required: true, message: '请输入用户名', trigger:['blur','change'] },
                        {
                            type:"string",//数据类型
                            pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,//正则规则
                            message: '2-7位，数字 字母 _ - 中日韩文',
                            trigger: ['blur','change']
                        }
                    ],
                    pass:{
                        type:"string",
                        validator:(rule,value,cb)=>{
                            if(value){
                                if(/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)){
                                    cb();
                                }else{
                                    cb(new Error("6-18位，不允许出现奇怪的字符哦"));
                                }
                            }else{
                                cb(new Error("请输入密码"));
                            }
                            this.form.checkPass && this.$refs.form.validateField("checkPass");
                        },
                        required:true,
                        message: '6-18位，不允许出现奇怪的字符',
                        trigger: ['blur','change'],
                    },
                },
            }
        },
        props:['dialogVisible'],
        methods:{
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$emit("handleClose");
                    })
                    .catch(_ => {});
            },
            //登陆
            handleClick(){
                this.$refs['form'].validate((valid) => {
                    if(valid){
                        getLogin(this.form.user,this.form.pass).then((res)=>{
                            this.$emit('handleClose');
                            if(!res.data.code){//登陆成功
                                this.$message({
                                    type: 'success',
                                    message: '登录成功',
                                    duration : 2000
                                });
                                this.$router.go(0);
                            }else{ //登陆失败
                                this.$message({
                                    type: 'info',
                                    message: res.data.data,
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
            }
        },
    }
</script>

<style lang="less" scoped>
    /deep/.el-dialog{
        @media screen and (min-width: 320px) and (max-width: 480px) {
            width:90% !important;
        }
    }
    /deep/.el-dialog__body{
        @media screen and (min-width: 320px) and (max-width: 480px) {
            padding-bottom:0;
        }
    }
    .el-form{
        padding-right: 30px;
        @media screen and (min-width: 320px) and (max-width: 480px) {
            padding-right:10px;
        }
        .el-form-item{
            .el-form-item__label{
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    width:65% !important;
                }
            }
            .el-form-item__content{
                @media screen and (min-width: 320px) and (max-width: 480px) {
                    width:66% !important;
                }
            }
        }
    }

    .code{
        .el-input{
            float:left;
            width:30%;
        }
        .svg{
            float:left;
            display:inline-block;
            width:35%;
            /deep/ svg{
                width:100%;
                height:100%;
            }
        }
        .el-link{
            width:30%;
            color:royalblue;
            cursor:pointer;
            text-decoration:none;
        }
    }
</style>