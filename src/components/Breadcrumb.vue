<template>
    <el-card>
        <!--封装 面包屑 -->
        <el-breadcrumb separator="/" >
            <el-breadcrumb-item  class="item">
                <span>{{title}}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </el-card>
</template>

<script>
    export default {
      computed:{
        title(){
            return this.$route.meta?.title
        }
      },
     
    }
</script>

<style scoped lang='scss'>
.item{
  border-left:3px solid rgb(5, 203, 28);
  padding-left:10px;
}
</style>