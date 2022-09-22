<template>
    <div class="login-box">
        <div class="login-form">
            <h2>梦学谷会员管理系统</h2>
            <!-- 登录 表单 -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model.trim="ruleForm.username" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model.trim="ruleForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    // import { getLogin ,getUserInfo} from '../../api/login.js';//封装 api 
    export default {
        data() {
            return {
                // 表单双向绑定
                ruleForm: {
                    username: "",
                    password: "",
                },
                // 表单验证
                rules: {
                    username: [
                        { required: true, message: '账号不能为空', trigger: 'blur' },
                        { min: 3, max: 8, message: "请输入3到8个字符", trigger: 'blur' },
                    ],
                    password: { required: true, message: '密码不能为空', trigger: 'blur' },
                },
            }
        },
        methods: {
            // 点击提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    // 当验证通过时候
                    if (!valid) return
                // 调用 登录 方法
                    this.hanleLogin()
                });
            },

        async hanleLogin() {
            //  使用 vuex 异步 调用  登录  api
            let token=await this.$store.dispatch("login",this.ruleForm)
            // 判断 是否获取到 token 
            if(!token) return 
            //  使用 vuex 异步 调用  用户信息  api
            let info =await this.$store.dispatch("getInfo")
            // 判断 是否获取到 用户信息
            if(!info) return 
            // 当获取到用户信息 跳转 主页面
            this.$router.push("/")          
            },
        }
    }
</script>

<style scoped lang='scss'>
    .login-box {
        width: 100%;
        height: 100%;
        background-image: url(http://vue.mengxuegu.com/img/login.b665435f.jpg);
        overflow: hidden;
    }

    .login-form {
        margin: 160px auto;
        width: 350px;
        background-color: #d3d4da;
        border-radius: 20px;
        padding: 20px;

        h2 {
            text-align: center;
            margin: 30px 0;
        }
    }
</style>