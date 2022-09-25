<template>
  <div>
    <!-- 商品 -->
    <!-- 搜索 -->
    <div class="lml">
      <el-form ref="queryForm" :inline="true" :model="query">
        <el-form-item prop="name">
          <el-input v-model="query.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="query.code" placeholder="商品编码"></el-input>
        </el-form-item>
        <el-form-item prop="supplierName">
          <el-input v-model="query.supplierName" placeholder="商品供应商" 
          @change="handleInput"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="handleOpen(false)">新增</el-button>
          <el-button @click="onReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 封装 -->
    <tables :tableData="goodsList" :tableHead="tableHead" @handleOpen="handleOpen" @handleDelete="handleDelete">
    </tables>


    <!-- 模态框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">

      <!--模态框 表单 -->
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="form.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="purchasePrice">
          <el-input v-model="form.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="retailPrice">
          <el-input v-model="form.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="form.storageNum"></el-input>
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
  import goodsApi from '../../api/goods.js';//api
  import tables from '../../components/Table';//封装表格
  import pagination from '../../components/pagination.vue'

  export default {
    components: {
      tables,//表格
      pagination,//分页
    },
    data() {
      return {
        tableHead: [
          { label: "序号", type: "index" },
          { label: "商品名称", prop: "name" },
          { label: "商品编码", prop: "code" },
          { label: "商品规格", prop: "spec" },
          { label: "零售价", prop: "purchasePrice" },
          { label: "进货价", prop: "retailPrice" },
          { label: "库存数量", prop: "storageNum" },
          { prop: "supplierName", label: "供应商" }
        ],
        dialogTitle: "添加用户",
        dialogVisible: false,
        goodsList: [],//展示数据

        total: 10,//总共的条数
        page: 1,//当前页
        pageSize: 10,//一页展示多少条

        query: {//请求需要的数据
          name: "",//供应商名字
          code: "",//商品标号
          supplierName: "",//供应商
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
          code: { required: true, message: '请填写商品编码', trigger: 'blur' },
          name: { required: true, message: '请输入供货商名称', trigger: 'blur' },
          purchasePrice: { required: true, message: '请填写零售价', trigger: 'blur' },//
        }
      }
    },
    created() {
      this.getgoods()
    },
    methods: {
      // 获取展示数据
      async getgoods() {
        try {
          let response = await goodsApi.getgoodsList(this.page, this.pageSize, this.query)
          this.goodsList = response.data.rows
          this.total = response.data.total
          console.log(this.goodsList, this.total);
        } catch (e) {
          console.log(e.message, '获取供货商数据');
        }

      },
      //  分页  每一页的数量
      handleSizeChange(size) {
        this.pageSize = size
        console.log(this.pageSize, '分页每一页的数量');
        this.getgoods()
      },
      // 分页  当前页
      handleCurrentChange(page) {
        this.page = page
        console.log(this.page, '分页当前页');
        this.getgoods()
      },


      // 搜索
      onSubmit() {
        this.page = 1
        this.getgoods()
        this.$message.success("查询成功")
      },
      // 重置
      onReset(queryForm) {
        console.log('重置');
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
          this.onReset('ruleForm')
          this.dialogTitle = "添加用户"
        }
      },

      // 点击编辑获取当前行的数据
      async handleFindItem(id) {
        try {
          let response = await goodsApi.goodsItem(id)
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
          let response = await goodsApi.goodsAdd(this.form)
          console.log(response, '添加数据');
          goodsApi.getgoodsList(this.page, this.pageSize, this.query);//调用 展示数据 接口
          this.$message.success("恭喜你，添加成功")
        } catch (e) {
          console.log(e.message, '添加错误');
        }
      },
      // 修改 事件
      async handleEdit(data) {
        try {
          let response = await goodsApi.goodsEdit(data.id, data)
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
            let response = await goodsApi.goodsDelete(id)
            console.log(response, '删除');
            this.$message.success("删除成功!");
            this.getgoods()
          } catch (e) {
            console.log(e.message, '删除错误');
          }
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      // 点击表单 弹出 模态框 表格
      handleInput() {
        console.log(12);
      }

    },


  }
</script>