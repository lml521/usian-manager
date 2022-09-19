<template>
    <div class="box">
        <div class="login">
            <h2>梦学谷会员管理系统</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            ruleForm:{
                name:"",
                password:"",
            },
            rules: {
                name:{ required: true, message: '账号不能为空', trigger: 'blur' },
                password:{ required: true, message: '密码不能为空', trigger: 'blur' },
            },
        }
    },
        methods: {
            submitForm(){

            },

        },
        components: {

        }
    }
</script>

<style scoped lang='scss'>
.box {
  width: 100vw;
  height: 100vh;
  background-color: #0a1631;
  /* background-image: url(../assets/bgi.jpg); */
  background-position: 100% 100%;
  background-repeat: no-repeat;
  overflow: hidden;
}

.login {
  margin: 200px auto;
  width: 400px;
  height: 300px;
  background-color: #d3d4da;
  border-radius: 20px;
  padding: 20px;
  h2 {
    text-align: center;
    margin: 30px 0;
  }
}
</style>