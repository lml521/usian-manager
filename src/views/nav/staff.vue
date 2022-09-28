<template>
  <div>
    <!-- 员工 管理  -->
    <!-- 封装 搜索 -->
    <div class="lml">
      <queryForms ref="queryForm" :formItem="formItem" :inline="true" :dialogConfig="dialogConfig" v-model.sync="query">
        <template v-slot:active>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="handleOpen(false)">新增</el-button>
          <el-button @click="onResetFrom(query)">重置</el-button>
        </template>
      </queryForms>
      </el-form>
    </div>
    <!--  封装 表格 -->
    <tables :tableData="staffList" :tableHead="tableHead">
      <template v-slot:active="scope">
        <el-button type="primary" @click="handleOpen">编辑</el-button>
        <el-button type="danger" @click="handleDelete">删除</el-button>
      </template>
    </tables>


    <!-- 封装 模态框 -->
    <Dialog ref="dialogRefs" :dialogVisible.sync="dialogVisible" :dialogConfig="dialogConfig" :inline="false"
      @cancelDialog="cancelSubmit" @confirmSubmit="confirmSubmit" @handleAddData="handleAddData"
      @handleEdit="handleEdit" v-model.sync="form" :rules="rules" :formItem="dialogFormList">
    </Dialog>

    <!-- 封装 分页 -->
    <pagination :page="page" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"></pagination>
  </div>
</template>

<script>
  import staffApi from '../../api/staff.js';// 员工 api
  export default {
    components: {
      tables: () => import('../../components/Table.vue'),//表格 封装 组件
      pagination: () => import('../../components/pagination.vue'),// 封装 分页
      queryForms: () => import('../../components/queryForm.vue'),//头部 搜索 封装
      Dialog: () => import("../../components/Dialog.vue"),//弹出框
    },
    data() {
      return {
        // 搜索数据
        formItem: [
          { placeholder: "账号", prop: "username", type: "input" },
          { placeholder: "姓名", prop: "name", type: "input" },
          { type: "active" }
        ],
        // 模态框 信息
        dialogConfig: {
          title: "添加用户",
          width: "500px",
          labelWidth: "100px",
        },

        // 模态框 里面的 表单 数据
        dialogFormList: [
          { label: "账号", placeholder: "账号", width: "300px", prop: "username", type: "input" },
          { label: "姓名", placeholder: "姓名", width: "300px", prop: "name", type: "input" },
          { label: "年龄", placeholder: "年龄", width: "300px", prop: "age", type: "input" },
          { label: "电话", placeholder: "电话", width: "300px", prop: "mobile", type: "input" },
          { label: "薪酬", placeholder: "薪酬", width: "300px", prop: "entryDate", type: "input" },
          { type: "active" }
        ],

        // 表格 头  
        tableHead: [
          { type: "index", label: "序号", width: 60 },
          { prop: "username", label: "账号" },
          { prop: "name", label: "姓名" },
          { prop: "age", label: "年龄" },
          { prop: "mobile", label: "电话" },
          { prop: "salary", label: "薪酬" },
          { prop: "entryDate", label: "入职时间" },
          {
            label: "操作", type: "active", width: 180,
            actions: [
              { type: "primary", text: "编辑", event: this.edit },
              { type: "danger", text: "删除", event: this.del }
            ]
          }
        ],
        dialogTitle: "添加用户",
        dialogVisible: false,
        staffList: [],//展示数据
        total: 10,//总共的条数
        page: 1,//当前页
        pageSize: 10,//一页展示多少条
        query: {//请求需要的数据
          name: "",
          username: "",
        },
        // 表单内容
        form: {
          name: "",//姓名
          code: "",//商品标号
          spec: "",
          purchasePrice: "",
          retailPrice: "",
          storageNum: "",
          supplierName: "",//供应商
        },
        rules: {
          username: { required: true, message: '请填写账号', trigger: 'blur' },
          name: { required: true, message: '请输入姓名', trigger: 'blur' },

        }
      }
    },
    created() {
      this.getstaff()
    },
    methods: {



      // 获取展示数据
      async getstaff() {
        try {
          let response = await staffApi.getstaffList(this.page, this.pageSize, this.query)
          this.staffList = response.data.rows
          this.total = response.data.total
        } catch (e) {
          console.log(e.message, '获取供货商数据');
        }

      },
      //  分页  每一页的数量
      handleSizeChange(size) {
        this.pageSize = size
        console.log(this.pageSize, '分页每一页的数量');
        this.getstaff()
      },
      // 分页  当前页
      handleCurrentChange(page) {
        this.page = page
        console.log(this.page, '分页当前页');
        this.getstaff()
      },


      // 搜索
      onSubmit() {
        this.page = 1
        this.getstaff()
        this.$message.success("查询成功")
      },
      // 重置
      onResetFrom(value) {
        for (let i in value) {
          value[i] = ""
        }
      },
      // 添加 修改 弹出 模态框
      handleOpen(id) {
        console.log(id, '添加/修改 查看是否有id');
        this.dialogVisible = true
        if (id) {
          // 如果有id 则为修改 用户
          this.dialogTitle = "修改用户"
          this.handleFindItem(id)
          return
        } else {// 没有id 则 为添加用户
          for (let i in this.form) {
            this.form[i] = ""
          }
          this.dialogTitle = "添加用户"
        }
      },

      // 点击编辑获取当前行的数据
      async handleFindItem(id) {
        try {
          let response = await staffApi.staffItem(id)
          console.log(response.data, '点击编辑获取当前行的数据');
          this.form = response.data
        } catch (e) {
          console.log(e.message, '点击编辑获取当前行的数据错误');
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
      async handleAddData() {
        this.dialogVisible = false
        try {
          let response = await staffApi.staffAdd(this.form)
          console.log(response, '添加数据');
          staffApi.getstaffList(this.page, this.pageSize, this.query);//调用 展示数据 接口
          this.$message.success("恭喜你，添加成功")
        } catch (e) {
          console.log(e.message, '添加错误');
        }
      },
      // 修改 事件
      async handleEdit(data) {
        this.dialogVisible = false
        try {
          let response = await staffApi.staffEdit(data.id, data)
          console.log(response, '点击确认修改 返回');
          this.$message.success("恭喜你，修改成功");
        } catch (e) {
          console.log(e.message, '修改 错误');
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
            let response = await staffApi.staffDelete(id)
            console.log(response, '删除');
            this.$message.success("删除成功!");
            this.getstaff()
          } catch (e) {
            console.log(e.message, '删除错误');
          }

        }).catch(() => {
          this.$message.info("已取消删除");
        });
      }
    },
  }
</script>