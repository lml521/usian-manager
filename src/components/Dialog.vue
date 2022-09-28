<template>
  <!--  封装 弹出框 -->
  <div>

    <el-dialog :title="dialogConfig.title" :width="dialogConfig.width" :visible.sync="dialogVisible"
      :before-close="handleClose">

      <Form :formItem="formItem" ref="dialogRefs" @formAdd="formAdd" @formEdit="formEdit" :dialogConfig="dialogConfig"
        v-model.sync="value" :payType="payType" :rules="rules">

        <template v-slot:active>
          <el-button @click="cancelDialog">取 消</el-button>
          <el-button type="primary" @click="confirmSubmit">确 定</el-button>
        </template>
      </Form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      // 模态框 配置  
      dialogConfig: {
        type: Object,
        default: () => { }
      },
      // 模态框 控制 显示/隐藏
      dialogVisible: {
        type: Boolean,
        default: false,
      },
      // 正则 校验
      rules: {
        type: Object,
        default: () => { }
      },
      // 数据
      formItem: {
        type: Array,
        default: () => []
      },
      // v-model 绑定
      value: {
        type: Object,
        default: () => { }
      },
      // 支付类型 数据
      payType: {
        type: Array,
        default: () => []
      }
    },
    // 引入 表单 模块
    components: {
      Form: () => import("./queryForm.vue")
    },
    data() {
      return {
        list: []
      }
    },
    methods: {
      // 取消
      cancelDialog() {
        this.$emit("cancelDialog")
      },
      // 点击 叉号
      handleClose() {
        this.$emit("cancelDialog")
      },
      // 确认
      confirmSubmit() {
        this.$emit("confirmSubmit")
      },
      // 添加
      formAdd(val) {
        console.log(val);
        this.$emit("handleAddData", val)
      },
      // 编辑
      formEdit(val) {
        console.log(val);
        this.$emit("handleEdit", val)
      },
      confirm() {
        this.$refs["dialogRefs"].refsForm()
        console.log(this.$refs["dialogRefs"].refsForm());
      }
    },
  }
</script>
