<template>
  <div>
    <!-- 供应商 管理 -->

    <!-- 搜索 -->
    <div class="lml">
      <queryForms ref="queryForm" :formItem="formItem" :inline="true" :dialogConfig="dialogConfig" v-model.sync="query">
        <template v-slot:active>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="handleOpen(false)">新增</el-button>
          <el-button @click="onResetFrom(query)">重置</el-button>
        </template>
      </queryForms>
    </div>

    <!-- 表格 -->
    <tables :tableData="supplierList" :tableHead="tableHead">
      <!-- 使用作用域 插槽  实现  操作 -->
      <!--  -->
      <template v-slot:active="scope">
        <el-button type="primary" @click="handleOpen(scope.row.id)">编辑
        </el-button>
        <el-button type="danger" @click="handleDelete(scope.row.id)">删除
        </el-button>
      </template>
      <!--  -->
    </tables>

    <!-- 模态框 -->
    <Dialog ref="dialogRefs" :dialogVisible.sync="dialogVisible" :dialogConfig="dialogConfig" :inline="false"
      @cancelDialog="cancelSubmit" @confirmSubmit="confirmSubmit" @handleAddData="handleAddData"
      @handleEdit="handleEdit" v-model.sync="form" :rules="rules" :formItem="dialogFormList">
    </Dialog>
    <!-- 分页 -->
    <pagination :page="page" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange">
    </pagination>
  </div>
</template>

<script>
  import supplierApi from '../../api/supplier.js'
  import staffApi from '../../api/staff.js';//api
  export default {
    components: {
      tables: () => import('../../components/Table.vue'),//表格 封装 组件
      pagination: () => import('../../components/pagination.vue'),// 封装 分页
      queryForms: () => import('../../components/queryForm.vue'),//头部 搜索 封装
      Dialog: () => import("../../components/Dialog.vue"),//弹出框
    },
    data() {
      return {
        // 模态框 信息
        dialogConfig: {
          title: "添加用户",
          width: "500px",
          labelWidth: "100px",
        },

        dialogFormList: [
          { label: "供应商名称", placeholder: "供应商名称", width: "300px", prop: "name", type: "input" },
          { label: "联系人", placeholder: "联系人", width: "300px", prop: "linkman", type: "input" },
          { label: "联系电话", placeholder: "联系电话", width: "300px", prop: "mobile", type: "input" },
          { label: "备注", placeholder: "备注", width: "300px", prop: "remark", type: "textarea" },
          { type: "active" }
        ],

        // 搜索数据
        formItem: [
          { placeholder: "供应商名称", prop: "name", type: "input" },
          { placeholder: "联系人", prop: "supplierName", type: "input" },
          { placeholder: "联系电话", prop: "code", type: "input" },
          { type: "active" }
        ],

        tableHead: [
          { label: "序号", type: "index", width: 60 },
          { prop: "name", label: "供应商名称" },
          { prop: "linkman", label: "联系人" },
          { prop: "mobile", label: "联系电话" },
          { prop: "remark", label: "备注" },
          {
            label: "操作", type: "active", width: 180,
            // actions: [
            //   { type: "primary", text: "编辑", event: this.edit },
            //   { type: "danger", text: "删除", event: this.del }
            // ]
          }
        ],
        dialogTitle: "添加用户",
        dialogVisible: false,
        supplierList: [],//展示数据
        total: 10,//总共的条数
        page: 1,//当前页
        pageSize: 10,//一页展示多少条
        query: {//请求需要的数据
          name: "",//供应商名字
          linkman: "",//联系人
          mobile: "",//联系电话
        },
        // 表单内容
        form: {
          name: "",//姓名
          linkman: "",//联系人
          mobile: "",//联系电话
          remark: "",//备注
        },
        rules: {
          linkman: { required: true, message: '请输入联系人', trigger: 'blur' },//会员卡号
          name: { required: true, message: '请输入供货商名称', trigger: 'blur' },//会员姓名
        }
      }
    },
    created() {
      this.getSupplier()
    },
    methods: {

      // 获取展示数据
      async getSupplier() {
        try {
          let response = await supplierApi.getSupplierList(this.page, this.pageSize, this.query)
          this.supplierList = response.data.rows;
          this.total = response.data.total
        } catch (e) {
          console.log(e.message, '获取供货商数据');
        }
      },
      //  分页  每一页的数量
      handleSizeChange(size) {
        this.pageSize = size
        console.log(this.pageSize, '分页每一页的数量');
        this.getSupplier()
      },
      // 分页  当前页
      handleCurrentChange(page) {
        this.page = page
        console.log(this.page, '分页当前页');
        this.getSupplier()
      },


      // 搜索
      onSubmit() {
        this.page = 1
        this.getSupplier()
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
          this.dialogTitle = "添加用户"
          for (let i in this.form) {
            this.form[i] = ""
          }
        }
      },

      // 点击编辑获取当前行的数据
      async handleFindItem(id) {
        try {
          let response = await supplierApi.SupplierItem(id)
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
          let response = await supplierApi.SupplierAdd(this.form)
          console.log(response, '添加数据');
          supplierApi.getSupplierList(this.page, this.pageSize, this.query);//调用 展示数据 接口
          this.$message.success("恭喜你，添加成功")
        } catch (e) {
          console.log(e.message, '添加错误');
        }
      },
      // 修改 事件
      async handleEdit(data) {
        this.dialogVisible = false
        try {
          let response = await supplierApi.SupplierEdit(data.id, data)
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
            let response = await supplierApi.SupplierDelete(id)
            console.log(response, '删除');
            this.$message.success("删除成功!");
            this.getSupplier()
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