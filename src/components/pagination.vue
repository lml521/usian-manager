<template>
  <div>
   <el-pagination 
   class="lml" 
   style="width: 80%;"
      :current-page="page" 
      :page-sizes="[10, 20, 30, 50]" 
      :page-size="pageSize"
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange"
    layout="total, sizes, prev, pager, next"
     :total="total">
  </el-pagination> 
  </div>
</template>

<script>
  export default {
    props: {
      // 当前页
      page: {
        type: Number || String,
        default: 1,
      },
      // 每页展示
      pageSize:{
        type: Number || String,
        default: 10,
      },
      // 总条数
      total:{
        type: Number || String,
        default: 100,
      }
  },
    methods: {
      handleSizeChange(size){
        console.log(size,'size');
        this.$emit("handleSizeChange",size)
      },
      handleCurrentChange(page){
        console.log(page,'page');
        this.$emit("handleCurrentChange",page)
      }
    },
  }
</script>

<style scoped lang='scss'>

</style>