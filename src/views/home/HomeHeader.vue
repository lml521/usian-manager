<template>
    <!--  主页 头部  -->
    <div class="header">
        <router-link to="/">
            <img src="../../assets/logo.png" alt="logo" width="25px" class="img">
            <span class="title">会员管理系统</span>
        </router-link>

        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" style="color:#fff;">
                {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" command="changePass">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-fold" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>

</template>

<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            name() {
                return this.$store.state.userInfo.name
            }

        },
        created() {

        },
        methods: {
            handleCommand(val) {
                console.log(val);
                val === 'changePass' ? this.handleChangePass() : this.handleLogout()
            },
            // 修改密码
            handleChangePass() {
                console.log(1);
            },
            // 退出登录
           async handleLogout() {
            try {
                let response =await this.$store.dispatch("handleLogout")
                console.log(response);
            } catch (e) {
                console.log(e.message);
            }
         
             setTimeout(()=>{
                 this.$router.push('/login')
             },300)
      },
            },

        
        components: {

        }
    }
</script>

<style scoped lang='scss'>
.header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;

  .router-link-active {
    //点击时去掉下划线
    text-decoration: none;
  }

  .img {
    vertical-align: middle;
    margin: 0 10px;
  }

  .title {
    vertical-align: middle;
    color: #fff;
  }
}
</style>