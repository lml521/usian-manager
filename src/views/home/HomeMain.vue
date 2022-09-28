<template>
  <div>
      <!-- 面包屑 -->
    <Breadcrumb v-if="crumbTitle"></Breadcrumb>
    <router-view />
  </div>
</template>

<script>
export default {
  name:'index',
  components:{
    Breadcrumb:()=>import('../../components/Breadcrumb.vue'),
  },
  computed:{
    crumbTitle(){
      return !(this.$route.path==='/index')
    }
  },  
}
</script>

<style scoped lang='scss'>

</style>
