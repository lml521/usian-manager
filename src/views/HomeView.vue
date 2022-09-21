<template>
  <div>

    <el-container>
      <el-header>
        <div class="header">
          <div>会员管理系统</div>
          <div>{{name}}</div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name:'',

    }
  },
  created() {
   this.name=this.$store.state.userInit.name
  },
  methods: {


  },
  components: {

  }
}
</script>

<style scoped lang='scss'>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    height: 4vh;
    line-height: 4vh;
    }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    height: 96vh;
  
    }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 96vh;
    }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .header{
    /* height: 100%; */
    /* background-color: pink; */
    display: flex;
    justify-content: space-between;
    margin-top:15px ;
  }
</style>
