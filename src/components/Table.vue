<template>
    <!-- 封装 表格 -->
    <div>
        <el-table :data="tableData" border style="width: 100%" height="400px">
            <template v-for="item in tableHead">
                <!-- 序号  多选框  展开行  -->
                <el-table-column 
                v-if="item.type && item.type!=='active'&&item.type!=='function'" 
                :label="item.label"
                :type="item.type" 
                v-bind="item"></el-table-column>
                <!-- 表格 内容 是超链接 -->
                <el-table-column 
                v-if="item.type==='function'" 
                :label="item.label" 
                :type="item.type" 
                v-bind="item">
                    <template v-slot="scope">
                        <span v-html="item.callback(scope.row) "></span>
                    </template>
                </el-table-column>

                <!-- 默认 内容 -->
                <el-table-column 
                v-else-if="!item.type" 
                :prop="item.prop" 
                :label="item.label" 
                v-bind="item">
                </el-table-column>

                <!-- 利用作用域插槽  实现  操作 -->
                <el-table-column 
                v-else-if="item.type==='active'" 
                :label="item.label" 
                v-bind="item">
                    <template v-slot="scope">
                        <slot :name="item.type" :row="scope.row"></slot>
                    </template>
                </el-table-column>

                <!-- 方法  2   利用 tableHead  数据 传送  操作数据 进行展示 -->
                <!-- <el-table-column 
                v-bind="item" 
                v-else-if="item.type=='active'" 
                :label="item.label" 
                :type="item.type">
                <template slot-scope="scope">
                    <el-button 
                    :type="ele.type" 
                    v-for="(ele,idx) in item.actions"
                    @click="ele.event(scope.row)">
                    {{ele.text}}
                    </el-button>
                </template>
                </el-table-column> -->
            </template>
        </el-table>
    </div>
</template>

<script>
    import MemberFind from '../enum/member.js';// 会员管理 支付类型 数据
    export default {
        props: {
            // 表格数据
            tableData: {
                type: Array,
                default: () => { }
            },
            // 表格头部
            tableHead: {
                type: Array,
                default: () => { }
            },
        },


        methods: {
            handleOpen(id) {
                this.$emit("handleOpen", id)
            },

            handleDelete(id) {
                this.$emit("handleDelete", id)
            },
            handle(ele) {
                console.log(ele, 'ele');
            }

            // handle(text,row) {
            //     console.log(text,row);
            //     // console.log(row,'11111111111111');
            //     if(text=='编辑'){
            //       this.$emit("handleOpen",row.id)  
            //     }else{
            //         this.$emit("handleDelete",row.id)  
            //     }
            // },
        },
    }
</script>