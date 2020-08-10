<template>
  <el-dialog title="受策略影响的终端列表"
             :visible.sync="dialogTableVisible"
             width="50%"
             class="popup">
    <template>
      <el-table ref="filterTable"
                :data="tableData"
                height="350"
                style="width: 100%">
        <el-table-column prop="mac"
                         label="mac地址"
                         sortable
                         width="180"
                         column-key="date">
        </el-table-column>
        <el-table-column prop="ip"
                         label="ip地址"
                         sortable
                         width="180">
        </el-table-column>
        <el-table-column prop="orgCode"
                         label="归属单位"
                         :formatter="formatter">
        </el-table-column>
        <el-table-column prop="user"
                         label="使用人">
          {{user ==null?"未绑定":user}}
        </el-table-column>
        <el-table-column prop="status"
                         label="设备状态"
                         width="100"
                         :filters="[{ text: '正常', value: 1 }, { text: '异常', value: 2 }]"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'primary' : 'success'"
                    disable-transitions>{{scope.row.status ==1?"正常":"异常"}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="解除限制">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogTableVisible: false,
      tableData: [],
      strategyId: ''
    }
  },
  methods: {
    selectMacInfoListByStrategyId () {
      console.log("this.strategyId", this.strategyId)
      this.$http.get("/admin/selectMacInfoListByStrategyId", { params: { strategyId: this.strategyId } }).then(res => {
        this.tableData = res.data
      })
    },
    handleEdit (index, row) {
      this.$http.delete("/admin/deleteMappingMacInStrategyId", { params: { strategyId: this.strategyId, mac: row.mac } }).then(res => {
        if (res.status == 200) {
          this.$notify({
            title: '成功',
            message: "操作成功",
            type: 'success'
          });
          this.selectMacInfoListByStrategyId()
        } else {
          console.log(res.data)
        }
      })
    },
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter();
    },
    formatter (row, column) {
      console.log(column)
      return row.orgName;
    },
    filterTag (value, row) {
      return row.status === value;
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  }
}
</script>

<style>
</style>