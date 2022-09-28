<template>
    <div>
        <!-- 封装  表单 -->
        <el-form ref="dialogRefs" :inline="inline" :model="value" :label-width="dialogConfig.labelWidth" :rules="rules">

            <template v-for="item in formItem">
                <!-- 一般数据 -->
                <el-form-item :label="item.label" v-if="item.type==='input'" :prop="item.prop">
                    <el-input v-model="value[item.prop]" :placeholder="item.placeholder"
                        :style="{width:`${item.width}`}"></el-input>
                </el-form-item>


                <!-- 支付类型 -->
                <el-form-item v-else-if="item.type==='select'" :label="item.label" :prop="item.prop">
                    <el-select v-model="value[item.prop]" :placeholder="item.placeholder"
                        :style="{width:`${item.width}`}">
                        <el-option :label="item.name" :value="item.type" v-for="item in payType"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 日期 -->
                <el-form-item v-else-if="item.type==='date'" :label="item.label" :prop="item.prop">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="value[item.prop]" :type="item.type"
                        :placeholder="item.placeholder">
                    </el-date-picker>
                </el-form-item>

                <!-- 文本域 -->
                <!-- textarea -->
                <el-form-item v-else-if="item.type==='textarea'" :label="item.label" :prop="item.prop">
                    <el-input v-model="value[item.prop]" :type="item.type"></el-input>
                </el-form-item>

                <!-- 弹框 -->
                <!-- bounceDialog -->
                <el-form-item v-else-if="item.type==='bounceDialog'" :label="item.label" :prop="item.prop">
                    <el-input v-model="value[item.prop]" type="input" 
                    @focus="handleInput"
                        :placeholder="item.placeholder"></el-input>
                </el-form-item>

                <!-- 按钮 -->
                <el-form-item v-else-if="item.type==='active'">
                    <slot :name="item.type">
                    </slot>
                </el-form-item>

                <!-- 封装 表格 -->


            </template>

        </el-form>

    </div>
</template>

<script>
    export default {
        props: {
            dialogConfig: {
                type: Object,
                default: () => { }
            },
            rules: {
                type: Object,
                default: () => { }
            },

            // 模态框 配置  
            dialogConfig: {
                type: Object,
                default: () => { }
            },
            inline: {
                type: Boolean,
                default: false
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
            payType: {
                type: Array,
                default: () => []
            }
        },

        created() {
            console.log(this.rules, 'rules');
        },
        methods: {
            // 清空
            onReset() {
                this.$refs["dialogRefs"].resetFields();
            },

            // 表单验证
            refsForm() {
                this.$refs["dialogRefs"].validate((valid) => {
                    if (valid) {
                        console.log(this.value.id, 1);
                        // this.$emit("confirmSubmit",this.value)
                        if (!this.value.id) {
                            this.$emit("formAdd", this.value)
                        } else {
                            this.$emit("formEdit", this.value)
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },


            // 弹出框
            handleInput() {
                this.$emit("handleInput")
            }
        },
    }
</script>

<style scoped lang='scss'>

</style>