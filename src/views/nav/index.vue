<template>
  <div>
    <h1>欢迎来到后台管理系统</h1>
    <tables :tableData="tableData" :tableHead="tableHead">
    </tables>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        tableHead: [
          { label: "序号", type: "index", width: 60 },
          { label: "日期", prop: "date", width: 160, },
          { prop: "name", label: "姓名", width: 80,  type: "url",
         createElement:(h, { column, $index })=>{
            return h('a','123')
          },
        },
          { prop: "province", label: "地址", },
          {
            prop: "city", label: "查看详情",
            type: "function",
            callback: (row) => {
              return `<a href="${row.url}">${row.text}</a>`
            }
          },
        ],

        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          url: "https://www.baidu.com/",
          text: "百度",
          city: '普陀区',

        }, {

          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          text: "京东",
          url: "https://www.jd.com/",
          city: '普陀区',

        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          url: "https://www.baidu.com/",
          text: "百度",
          city: '普陀区',

        }, {

          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          text: "京东",
          url: "https://www.jd.com/",
          city: '普陀区',

        }]
      }
    },
    methods: {

    },
    components: {
      tables: () => import('../../components/Table')//封装表格
    }
  }
</script>

<style scoped lang='scss'>

</style>