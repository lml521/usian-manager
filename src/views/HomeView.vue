<template>
  <div>

  </div>
</template>

<script>
  import axios from 'axios'
  import { getLogin } from '../api/login.js'
  export default {
    data() {
      return {

      }
    },
    created() {
      getLogin({username:'admin',password:'admin'}).then(res => {
        console.log(res);
      })
      // axios({
      //   url:process.env.VUE_APP_BASE_API+'/login',
      //   method:"post",
      //   params:{username:'admin',password:'admin'}
      // }).then(res=>{
      //   console.log(res);
      // })
    },
    methods: {

    },
    components: {

    }
  }
</script>

<style scoped lang='scss'>

</style>