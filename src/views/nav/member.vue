<template>
  <div>
    <!-- 会员管理 -->

    <!-- 封装 表单  搜索 -->
    <div class="lml">
      <queryForms ref="queryForm" :formItem="formItem" :inline="true" :dialogConfig="dialogConfig" v-model.sync="query"
        :payType="payType">
        <template v-slot:active>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="handleOpen(false)">新增</el-button>
          <el-button @click="onResetFrom(query)">重置</el-button>
        </template>
      </queryForms>

    </div>
    <!-- 封装 表格 -->
    <tables :tableData="MemberList" :tableHead="tableHead">
      <template v-slot:active="scope">
        <el-button type="primary" @click="handleOpen">编辑</el-button>
        <el-button type="danger" @click="handleDelete">删除</el-button>
      </template>
    </tables>


    <!-- 封装模态框 -->
    <!--  
       inline  判断表单是否 是行内
       dialogConfig  模态框 详细 信息 （模态框头部名称，模态框宽度，label的宽度）
       dialogVisible 模态框 的显示/隐藏
       cancelDialog  取消提交 的事件
       confirmSubmit  提交 事件
       rules 表单验证 
       formItem 模态框 里面的 表单 数据
       v-model 表单 双向绑定
       payType  支付类型数据
    -->
    <!-- 模态框 -->
    <Dialog ref="dialogRefs" :dialogVisible.sync="dialogVisible" :dialogConfig="dialogConfig" :inline="false"
      @cancelDialog="cancelSubmit" @confirmSubmit="confirmSubmit" @handleAddData="handleAddData"
      @handleEdit="handleEdit" v-model.sync="form" :rules="rules" :formItem="dialogFormList" :payType="payType">
    </Dialog>
    <!-- 分页 -->
    <pagination :page="page" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"></pagination>

  </div>
</template>
<script>
  import MemberApi from '../../api/member.js';//会员管理 api
  import MemberFind from '../../enum/member.js';// 会员管理 支付类型 数据

  export default {
    components: {
      tables: () => import('../../components/Table.vue'),//表格 封装 组件
      pagination: () => import('../../components/pagination.vue'),// 封装 分页
      queryForms: () => import('../../components/queryForm.vue'),//头部 搜索 封装
      Dialog: () => import("../../components/Dialog.vue"),//弹出框
    },
    data() {
      return {
        // 表格 头部 信息
        tableHead: [
          { label: "序号", type: "index", width: 60 },
          { label: "会员卡号", prop: "cardNum", width: 160, },
          { prop: "name", label: "会员姓名", width: 80, },
          { prop: "birthday", label: "会员生日" },
          { prop: "phone", label: "手机号码" },
          { prop: "integral", label: "可用积分" },
          { prop: "money", label: "开卡金额" },
          {
            prop: "payType", label: "支付类型",
            formatter: (row, column, cellValue, index) => {
              return MemberFind.payType.find(item => item.type == row.payType).name
            }
          },
          { prop: "address", label: "会员地址", width: 160 },
          {
            label: "操作", type: "active", width: 180,
            // 利用 回调函数 调用 编辑 删除方法
            // actions: [
            //   { type: "primary", text: "编辑", event: this.edit },
            //   { type: "danger", text: "删除", event: this.del }
            // ]
          }
        ],
        MemberList: [],//表格 展示数据

        // 搜索数据
        formItem: [
          { placeholder: "会员卡号", prop: "cardNum", type: "input" },
          { placeholder: "会员名字", prop: "name", type: "input" },
          { placeholder: "支付类型", prop: "payType", type: "select" },
          { placeholder: "出生日期", prop: "birthday", type: "date" },
          { type: "active" }
        ],

        payType: MemberFind.payType,//支付类型数据

        // 模态框 信息
        dialogConfig: {
          title: "添加用户",
          width: "500px",
          labelWidth: "100px",
        },
        // 模态框 是否 展示 隐藏
        dialogVisible: false,

        // 模态框 里面的 表单 数据
        dialogFormList: [
          { label: "会员卡号", placeholder: "会员卡号", width: "300px", prop: "cardNum", type: "input" },
          { label: "会员名字", placeholder: "会员名字", width: "300px", prop: "name", type: "input" },
          { label: "出生日期", placeholder: "出生日期", width: "300px", prop: "birthday", type: "date" },
          { label: "手机号码", placeholder: "手机号码", width: "300px", prop: "phone", type: "input" },
          { label: "开卡金额", placeholder: "开卡金额", width: "300px", prop: "money", type: "input" },
          { label: "可用积分", placeholder: "可用积分", width: "300px", prop: "integral", type: "input" },
          { label: "支付类型", placeholder: "支付类型", width: "300px", prop: "payType", type: "select" },
          { label: "会员地址", placeholder: "会员地址", width: "300px", prop: "address", type: "textarea" },
          { type: "active" }
        ],

        //请求需要的数据
        query: {
          name: "",//会员名字
          cardNum: "",//会员卡号
          payType: "",//支付类型
          birthday: "",//出生日期
        },
        // 表单内容
        form: {
          cardNum: "",//会员卡号
          name: "",//会员姓名
          birthday: "",//会员生日
          phone: "",//手机号码
          money: "",//开卡金额         
          integral: "",//可用积分         
          address: "",//会员地址
          payType: "",//支付类型
        },
        // 表单验证 数据
        rules: {
          cardNum: { required: true, message: '请输入会员卡号', trigger: 'blur' },//会员卡号
          name: { required: true, message: '请输入会员姓名', trigger: 'blur' },//会员姓名
          payType: { required: true, message: '请选择支付类型', trigger: 'change' },//支付类型
        },

        // 分页数据
        total: 10,//总共的条数
        page: 1,//当前页
        pageSize: 10,//一页展示多少条
      }
    },


    created() {
      this.getmember()
    },

    methods: {
      // 获取展示数据
      async getmember() {
        try {
          let response = await MemberApi.getMenberList(this.page, this.pageSize, this.query)
          this.MemberList = response.data.rows//获取展示数据
          this.total = response.data.total;//获取总条数
          console.log(this.MemberList, '获取展示数据');
        } catch (e) {
          console.log(e.message, '展示数据错误');
        }
      },


      // 点击添加/修改 弹出 模态框
      handleOpen(id) {
        console.log(id, '添加/修改 查看是否有id');
        this.dialogVisible = true
        if (id) {
          // 如果有id 则为修改 用户
          this.dialogConfig.title = "修改用户"
          this.handleFindItem(id)
          // this.form =id
          return
        } else {// 没有id 则 为添加用户
          this.dialogConfig.title = "添加用户"
          this.onResetFrom(this.form)
        }
      },

      // 确认提交
      confirmSubmit() {
        this.$refs["dialogRefs"].confirm()
      },

      // 取消提交
      cancelSubmit() {
        this.dialogVisible = false
        this.onResetFrom(this.form)
      },


      // 添加 事件
      async handleAddData(val) {
        console.log(val)
        this.dialogVisible = false
        try {
          let response = await MemberApi.getMenberAdd(this.form)
          console.log(response, '添加数据');
          MemberApi.getMenberList(this.page, this.pageSize, this.query);//调用 展示数据 接口
          this.$message.success("恭喜你，添加成功")
        } catch (e) {
          console.log(e.message, '添加错误');
        }
      },
      // 修改 事件
      async handleEdit(data) {
        this.dialogVisible = false
        try {
          let response = await MemberApi.getMenberEdit(data.id, data)
          console.log(response, '点击确认修改 返回');
          this.$message.success("恭喜你，修改成功");
        } catch (e) {
          console.log(e.message, '修改 错误');
        }
      },

      // 搜索
      onSubmit() {
        this.page = 1
        this.getmember()
        this.$message.success("查询成功")
      },

      // 重置
      onResetFrom(value) {
        for (let i in value) {
          value[i] = ""
        }
        // this.$refs["dialogRefs"].onReset();
      },

      // 点击编辑获取当前行的数据
      async handleFindItem(id) {
        try {
          let response = await MemberApi.getFindItem(id)
          console.log(response.data, '点击编辑获取当前行的数据');
          this.form = response.data
        } catch (e) {
          console.log(e.message, '点击编辑获取当前行的数据错误');
        }
      },

      // 删除
      handleDelete(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
            let response = await MemberApi.getMenberDelete(id)
            this.$message.success("删除成功!");
            this.getmember()
          } catch (e) {
            console.log(e.message, '删除错误');
          }
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      //  分页  每一页的数量
      handleSizeChange(size) {
        this.pageSize = size
        console.log(this.pageSize, '分页每一页的数量');
        this.getmember()
      },
      // 分页  当前页
      handleCurrentChange(page) {
        this.page = page
        console.log(this.page, '分页当前页');
        this.getmember()
      },


      // 利用 回调函数 调用 编辑 删除方法

      // edit(val) {
      //   console.log(val, '');
      //   this.handleOpen(val.id)
      // },
      // del(val) {
      //   console.log(val, '');
      //   this.handleDelete(val.id)
      // },
    },
  }
</script>

<style scoped lang='scss'>

</style>