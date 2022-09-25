<template>
  <div>
    <!-- 会员管理 -->
    <!-- 搜索 -->
    <div class="lml">
      <el-form ref="queryForm" :inline="true" :model="query">

        <el-form-item prop="cardNum">
          <el-input v-model="query.cardNum" placeholder="会员卡号"></el-input>
        </el-form-item>

        <el-form-item prop="name">
          <el-input v-model="query.name" placeholder="会员名字"></el-input>
        </el-form-item>

        <el-form-item prop="payType">
          <el-select v-model="query.payType" placeholder="支付类型" style="width:120px">
            <el-option :label="item.name" :value="item.type" v-for="item in payType"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="birthday">
          <el-date-picker value-format="yyyy-MM-dd" v-model="query.birthday" type="date" placeholder="出生日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="handleOpen(false)">新增</el-button>
          <el-button @click="onReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 封装 表格 -->
    <tables :tableData="MemberList" :tableHead="tableHead" 
    @handleOpen="handleOpen" @handleDelete="handleDelete">
    </tables>


    <!-- 模态框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">

      <!--模态框 表单 -->
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="form.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>

        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="form.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="form.payType" placeholder="支付类型" style="width:120px">
            <el-option :label="item.name" :value="item.type" v-for="item in payType"></el-option>
          </el-select>
        </el-form-item>

        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="form.address"></el-input>
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
  import MemberApi from '../../api/member.js'
  import MemberFind from '../../enum/member.js'
  import tables from '../../components/Table.vue';//表格 封装 组件
  import pagination from '../../components/pagination.vue'

  export default {
    components: {
      tables, pagination
    },
    data() {
      return {
        tableHead: [
          { label: "序号", type: "index" },
          { label: "会员卡号", prop: "cardNum", width: 200, },
          { prop: "name", label: "会员姓名" },
          { prop: "birthday", label: "会员生日" },
          { prop: "phone", label: "手机号码" },
          { prop: "integral", label: "可用积分" },
          { prop: "money", label: "开卡金额" },
          { prop: "payType", label: "支付类型" },
          { prop: "address", label: "会员地址" }
        ],
        payType: MemberFind.payType,

        dialogTitle: "添加用户",    
        dialogVisible: false,
        MemberList: [],//展示数据

        total: 10,//总共的条数
        page: 1,//当前页
        pageSize: 10,//一页展示多少条

        query: {//请求需要的数据
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
        rules: {
          cardNum: { required: true, message: '请输入会员卡号', trigger: 'blur' },//会员卡号
          name: { required: true, message: '请输入会员姓名', trigger: 'blur' },//会员姓名
          payType: { required: true, message: '请选择支付类型', trigger: 'change' },//支付类型
        }
      }
    },
    // 过滤 字符类型
    filters: {
      filterPayType(val) {
        return MemberFind.payType.find(item => item.type == val).name
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
          console.log(response, '获取展示数据');
          this.MemberList = response.data.rows//获取展示数据
          console.log(this.MemberList, 'this.MemberList');
          this.total = response.data.total;//获取总条数
        } catch (e) {
          console.log(e.message, '展示数据错误');
        }

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


      // 搜索
      onSubmit() {
        this.page = 1
        this.getmember()
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
          this.dialogTitle = "添加用户"
          this.onReset('ruleForm')
        
        }
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
        try {
          let response = await MemberApi.getMenberEdit(data.id, data)
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
            let response = await MemberApi.getMenberDelete(id)
            console.log(response, '删除');
            this.$message.success("删除成功!");
            this.getmember()
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

<style scoped lang='scss'>

</style>