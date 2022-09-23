<template>
  <div>
    <!-- Aside 侧边栏 -->
    <el-menu :default-active="activedPath" class="el-menu-vertical-demo" 
      background-color="#545c64" text-color="#fff"
       active-text-color="#ffd04b"
       router>
     
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
     
      <el-menu-item index="member" >
        <i class="el-icon-document"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
      <el-menu-item index="supplier">
        <i class="el-icon-setting"></i>
        <span slot="title">供应商</span>
      </el-menu-item>
      <el-menu-item index="goods">
        <i class="el-icon-setting"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="staff">
        <i class="el-icon-setting"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed:{
      activedPath(){
        console.log(this.$route.path);
        return this.$route.path 
      }
    },
  
    methods: {

    },
    components: {

    }
  }
</script>

<style scoped lang='scss'>

</style>