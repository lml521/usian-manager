<template>
  <div>
    <!-- member -->
    <!-- 会员管理 -->
    <!-- 搜索 -->
    <div class="lml">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="query.cardNum" placeholder="会员卡号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.name" placeholder="会员名字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.payType" placeholder="支付类型" style="width:120px">
            <el-option label="区域一" value="1"></el-option>
            <el-option label="区域二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker value-format="yyyy-MM-dd" v-model="query.birthday" type="date" placeholder="出生日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">新增</el-button>
          <el-button @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->

    <el-table :data="MemberList" border height="400px" style="width: 100%;">
      <el-table-column type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="会员姓名">
      </el-table-column>
      <el-table-column prop="birthday" label="会员生日">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分">
      </el-table-column>
      <el-table-column prop="money" label="开卡金额">
      </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          {{scope.row.payType|filterPayType}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"  size="small">编辑</el-button>
          <el-button  type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="lml" 
    :current-page="page" 
    :page-sizes="[10, 20, 30, 50]" 
    :page-size="pageSize"
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  // import {getMemberList} from '../../api/member.js'
  import MemberApi from '../../api/member.js'
  import MemberFind from '../../enum/member.js'
  export default {
    data() {
      return {
        MemberList: [],//展示数据
        total: 10,//总共的条数
        page: 1,//当前页
        pageSize: 10,//一页展示多少条
        query: {//请求需要的数据
          name: "",//会员名字
          cardNum: "",//会员卡号
          payType: "",//支付类型
          birthday: "",//出生日期
        }
      }
    },
    // 过滤 字符类型
    filters: {
      filterPayType(val) {
        return name=MemberFind.payType.find(item => item.type == val).name
      }
    },
    computed:{

    },
    created() {
      this.getmember()
    },

    methods: {
      // 获取展示数据
      async getmember() {
        console.log(this.page, this.pageSize, this.query,'this.page, this.pageSize, this.query');
        let response = await MemberApi.getMenberList(this.page, this.pageSize, this.query)
      console.log(response,'responseresponse');
        this.MemberList = response.data.rows
        this.total = response.data.total
      },
      handleSizeChange(size){
        this.pageSize=size
        console.log(this.pageSize,'this.pageSize');
        this.getmember()
      },
      handleCurrentChange(page){
        this.page=page
        console.log(this.page);
        this.getmember()
      },

      // 搜索
      onSubmit() {

      }

    },
    components: {

    }
  }
</script>

<style scoped lang='scss'>

</style>