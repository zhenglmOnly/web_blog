<template>
    <el-dialog
                title="注册用户"
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
            <el-form-item label="密码" prop="pass" >
                <el-input type="password" v-model="form.pass" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="form.checkPass"></el-input>
            </el-form-item>
            <el-form-item label="验证码" class="code" prop="svgCode">
                <el-input v-model="form.svgCode"></el-input>
                <div class="svg" v-html="form.cadSvg"></div>
                <el-link type="primary" @click="getCode" :disabled="form.disabled">{{form.refreshText}}</el-link>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClick" :disabled="form.submitDisabled">立即注册</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import request from "../../api";
    const postForm = request.postForm;
    const getVerification = request.getVerification;
    const getcheckVcode = request.getcheckVcode;

    export default {
        name: "Register",
        data(){
            return{
                form:{
                    user: "",
                    pass: "",
                    checkPass: "",
                    svgCode:"",//验证码

                    cadSvg:"Loading...",
                    refreshText:"刷新",
                    disabled:true,
                    cTime: null,
                    submitDisabled:false,
                },
                //表单验证
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
                                    };
                                }else{
                                    cb(new Error("请输入密码"));
                                };
                                this.form.checkPass && this.$refs.form.validateField("checkPass");
                            },
                            required:true,
                            message: '6-18位，不允许出现奇怪的字符',
                            trigger: ['blur','change'],
                    },
                    checkPass: {
                        type:"string",
                        validator:(rule,value,cb)=>{
                            if(value){
                                if(value === this.form.pass){
                                    cb();
                                }else{
                                    cb(new Error('两次密码不一致'))
                                }
                            }else{
                                cb(new Error('请再次输入密码'))
                            }
                        },
                        required:true,
                        trigger:'blur',
                    },
                    svgCode:{
                        validator:(rule,value,cb)=>{
                            if(!value){
                                cb(new Error('请输入验证码'))
                            }else{
                                getcheckVcode(value).then(res=>{
                                    if(res.data.code === 0){
                                        cb();
                                    }else{
                                        cb(new Error('验证码错误'));
                                    }
                                }).catch(err=>{
                                    cb(new Error('未知错误'));
                                });
                            }
                        },
                        required:true,
                        trigger:'blur',
                    },
                },
            }
        },
        props:['dialogVisible'],
        methods:{
            //刷新验证码
            getCode(){
                getVerification().then((res)=>{
                    clearTimeout(this.form.cTime);
                    let t = 0;
                    let fn = ()=> {
                        t += 1000;
                        if (t > res.data.time){
                            clearTimeout(this.form.cTime);
                            this.form.disabled = false;
                            this.form.refreshText = "刷新";
                        }else{
                            this.form.disabled = true;
                            this.form.refreshText = (((res.data.time - t)/1000)|0)+"s后可刷新";
                        }
                    };
                    this.form.cTime = setInterval(fn,1000);
                    this.form.cadSvg = res.data.data;
                }).catch((err)=>{
                    console.log(err);
                });
            },
            /*submitForm(form) {
               this.$refs.form.validate((valid) => {
                    if (valid) {
                        postForm(this.form.user,this.form.pass,this.form.svgCode).then((res)=>{
                            console.log(res);
                        }).catch((err)=>{
                            console.log(err)
                        })
                    } else {
                        return false;
                    }
               });
            },*/
            //注册
            handleClick(){
                this.form.submitDisabled = true;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        postForm(this.form.user,this.form.pass,this.form.svgCode).then((res)=>{
                            this.getCode();
                            if(!res.data.code){  //注册成功
                                this.$message({
                                    type: 'success',
                                    message: res.data.data,
                                    duration : 2000
                                });
                                this.$refs['form'].resetFields();
                                this.$emit("handleClose",true);
                                router.go(0);
                            }else{  //注册失败
                                this.getCode();
                                this.$message({
                                    type: 'info',
                                    message: res.data.data,
                                    duration : 2000
                                });
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                    } else {return false;}
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$emit("handleClose");
                    })
                    .catch(_ => {});
            }
        },
        mounted(){
            this.getCode();
        },
    }
</script>

<style scoped lang="less">
    .el-form{
        padding-right: 30px;
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