<template>
  <div>
      <!-- 面包屑 -->
    <Breadcrumb v-if="crumbTitle"></Breadcrumb>
    <router-view />
  </div>
</template>

<script>
  import Breadcrumb from '../../components/Breadcrumb.vue'
export default {
  name:'index',
  components:{
    Breadcrumb,
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
