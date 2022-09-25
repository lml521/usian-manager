 <template>
    <div>
        <el-table :data="tableData" border style="width: 100%" height="400px" 
        >
            <el-table-column :type="item.type" :prop="item.prop" :label="item.label"
             v-for="item in tableHead" :key="item.label">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleOpen(scope.row.id)" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>    
         </el-table>
    </div>
</template>

<script>
    export default {
        props: {
            // 表格数据
            tableData: {
                type: Array || Object,
                default: () => {
                    return {}
                }
            },
            // 表格头部
            tableHead: {
                type: Array || Object,
                default: () => {
                    return {}
                }
            },
        },
        data() {
            return {

            }
        },
        methods: {
            handleOpen(id){
                this.$emit("handleOpen",id)
            },

            handleDelete(id) {
                this.$emit("handleDelete",id)
            }

        },
        components: {

        }
    }
</script> 