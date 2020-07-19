<template>
  <div class="user-center">
    <span style="font-size: 23px">部署单位管理</span><br>
    <el-row>
      <el-button type="primary"
                 @click="shwoAddOrgTable"
                 class="hcy-el-button">添加部署点</el-button>
      <el-button type="danger"
                 disabled>删除部署点</el-button>
      <div class="grid-content bg-purple">
        <el-input placeholder="请输入单位名称"
                  v-model="search_key"
                  class="input-with-select">
          <el-button slot="append"
                     type="success"
                     @click="getOrgList">Go</el-button>
        </el-input>
      </div>
    </el-row>
    <el-row>
      <el-table ref="multipleTable"
                :data="departmentTableInfo"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="orgId"
                         label="#"
                         width="55">
          #
        </el-table-column>
        <el-table-column prop="orgName"
                         label="部署单位名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="orgCode"
                         label="部署单位编码"
                         width="180">
        </el-table-column>
        <el-table-column prop="createrTime"
                         label="创建时间">
        </el-table-column>
        <el-table-column prop="idpMark"
                         label="是否绑定标记点">
          <template slot-scope={row}>
            {{row.idpMark==null?"未绑定":"已绑定"}}
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         label="单位状态"
                         width="100"
                         :filters="[{ text: '正常', value: 1 }, { text: '冻结', value: 0 }]"
                         :filter-method="filterTag"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'primary' : 'success'"
                    disable-transitions>{{scope.row.status === 1 ? '冻结' : '正常'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleBind(scope.$index, scope.row)">绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total=totalNum
                     :current-page=currentPage
                     @current-change="handleCurrentChange"
                     @prev-click="handlePrevClick"
                     @next-click="handlerNextClick">
      </el-pagination>
    </el-row>
    <OrgInfo ref="orgInfo"></OrgInfo>
    <MarkInfo ref="markInfo"></MarkInfo>
  </div>
</template>

<script>
import OrgInfo from './orgInfo'
import MarkInfo from './markInfo'
export default {
  components: {
    OrgInfo,
    MarkInfo
  },
  data () {
    return {
      departmentTableInfo: '',
      multipleSelection: [],
      search_key: '',
      totalNum: 0,
      currentPage: 1
    }
  },
  created () {
    this.getOrgList()
  },
  methods: {
    handleBind (index, row) {
      console.log(index)
      this.$refs.markInfo.dialogFormVisible = true
      this.$refs.markInfo.orgId = row.orgId

    },
    handleEdit (index, row) {
      console.log(index, row);
      this.$http.get("/org/getOrgDtoById", { params: { orgId: row.orgId } }).then(res => {
        console.log(res.data)
        this.$refs.orgInfo.dialogFormVisible = true
        var orgInfo = {}
        orgInfo.orgName = res.data.orgName
        orgInfo.orgId = res.data.orgId
        orgInfo.orgCode = res.data.orgCode
        orgInfo.status = res.data.status
        this.$refs.orgInfo.form = orgInfo;


      });
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.$http.delete("/org/deleteOrgById", { data: row.orgId }).then(res => {
        if (res.status == 200) {
          this.$notify({
            title: 'success',
            message: '删除部署点成功',
            type: 'success'
          });
          this.getOrgList()
        }
      })

    },
    shwoAddOrgTable () {
      console.log("tianjia")
      this.$refs.orgInfo.dialogFormVisible = true
      this.$refs.orgInfo.isEdit = false
    },

    filterTag (value, row) {
      return row.status === value;
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      console.log("选中行")
      console.log(val)
    },
    getOrgList () {
      var pa = {}
      pa.orgName = this.search_key
      pa.current = this.currentPage
      pa.size = 10;
      this.$http.get("/org/getOrgList", { params: pa }).then(res => {
        console.log(res.data)
        this.departmentTableInfo = res.data.records
      })
    },
    handleCurrentChange (val) {
      console.log("page:", val)
      this.currentPage = val
      this.getOrgList()
    },
    handlePrevClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.getOrgList()
    },
    handlerNextClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.getOrgList()
    },
  }
}
</script>

<style lang="scss">
.user-center {
  margin: 7px;
}
.hcy-el-button {
  margin-left: 10px;
}
.el-dropdown {
  margin: 10px;
}
.grid-content {
  width: 300px;
}
</style>