<template>
    <div class="login-box">
        <div class="login-form">
            <h2>梦学谷会员管理系统</h2>
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
    import { getLogin } from '../../api/login.js'
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
                    
                    this.hanleLogin()
                });
            },
            async hanleLogin() {
                try {
                    const response = await getLogin(this.ruleForm)
                    console.log(response);
                } catch (error) {
                    console.log(error.message, 'error');
                }
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