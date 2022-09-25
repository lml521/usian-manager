<template>
  <div>
    <!-- 会员管理 -->
    <!-- 搜索 -->
    <div class="lml">
      <el-form ref="queryForm" :inline="true" :model="query">
        <el-form-item prop="name">
          <el-input v-model="query.name" placeholder="供应商名称"></el-input>
        </el-form-item>
        <el-form-item prop="linkman">
          <el-input v-model="query.linkman" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="query.mobile" placeholder="联系电话"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="handleOpen(false)">新增</el-button>
          <el-button @click="onReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <tables :tableData="supplierList" :tableHead="tableHead"     @handleOpen="handleOpen" @handleDelete="handleDelete"></tables>



    <!-- 模态框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">

      <!--模态框 表单 -->
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="form.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="form.mobile"></el-input>

        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="confirmSubmit('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <pagination :page="page" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"></pagination>
  </div>
</template>

<script>
  import supplierApi from '../../api/supplier.js'

  import tables from '../../components/Table'
  import pagination from '../../components/pagination.vue'

  export default {
    components: {
      tables, pagination
    },
    data() {
      return {
        tableHead: [
          { label: "序号", type: "index" },
          { prop: "name", label: "供应商名称" },
          { prop: "linkman", label: "联系人" },
          { prop: "mobile", label: "联系电话" },
          { prop: "remark", label: "备注" },
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
          this.supplierList = response.data.rows
          this.total = response.data.total
          console.log(this.supplierList, this.total);
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
      onReset(queryForm) {
        this.$refs[queryForm].resetFields();
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
          this.onReset('ruleForm')
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
      confirmSubmit(formName) {
        // 判断表单 中 是否全部 符合规则
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 判断表单里面是否有 id ,如果有 调用 编辑事件，否则调用添加事件
            this.form.id ? this.handleEdit(this.form) : this.handleAddData()
            this.dialogVisible = false; //模态框隐藏   

          } else {
            console.log('提交表单中有不符合规格');
            return false;
          }
        })
      },

      // 取消提交
      cancelSubmit() {      
        this.dialogVisible = false
        this.onReset('ruleForm')
      },

      // 添加 事件
      async handleAddData() {
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