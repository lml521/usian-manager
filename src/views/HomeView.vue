<template>
  <el-container>
    <el-header>
      <!-- 头部信息 -->
      <HomeHeader></HomeHeader>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <HomeAside></HomeAside>
      </el-aside>
      <el-main>
        <!-- 坑 -->
        <HomeMain></HomeMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import HomeHeader from '../views/home/HomeHeader.vue'
  import HomeAside from '../views/home/HomeAside.vue'
  import HomeMain from '../views/home/HomeMain.vue'

  export default {
    //  计算属性  
    watch: {
      $route() {
        // 判断 本地如果没有 userInfo 信息 从新获取userInfo 信息
        if (!localStorage.getItem("userInfo")) this.$store.dispatch("getInfo")
      }
    },

    components: {
      HomeHeader,//头部信息
      HomeAside,//侧边栏
      HomeMain,//坑
    },
  }
</script>

<style scoped lang='scss'>
  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #2d3a4b;
    color: #fff;
    height: 50px;
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
  }
</style>