<template>
  <div class="terminalAdmin"
       style="margin:10px">
    <span style="font-size: 23px">终端管理</span><br>
    <el-row>
      <el-input placeholder="mac地址"
                style="width:229px;margin-right:10px"
                prefix-icon="el-icon-s-platform"
                v-model="mac">
      </el-input>
      <el-input placeholder="员工姓名"
                style="width:229px"
                prefix-icon="el-icon-user-solid"
                v-model="username">
      </el-input>
      <template>
        <el-select v-model="orgCode"
                   multiple
                   collapse-tags
                   style="margin-left: 20px;margin-right:20px"
                   placeholder="部署单位">
          <el-option v-for="item in pcList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template>

      <template>
        <el-select v-model="pcStatus"
                   style="margin-right:20px"
                   placeholder="设备状态">
          <el-option v-for="item in status"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template>
      <el-button icon="el-icon-search"
                 type="primary"
                 @click="selectTerminalList">查找</el-button>
      <el-button type="primary">获取资产模板</el-button>
      <el-upload class="upload-demo clientUpdate"
                 style="display:inline-block"
                 :action=action
                 name="AssetTemplate"
                 :show-file-list=false
                 multiple
                 :limit="1"
                 :on-success="handleSuccess">
        <el-button type="primary"
                   style="margin-right:5px">导入资产信息</el-button>

      </el-upload>
    </el-row>
    <el-row>
      <template>
        <el-table ref="filterTable"
                  :data="pcList"
                  style="width: 100%">
          <el-table-column prop="mac"
                           label="mac地址"
                           sortable
                           width="180">
          </el-table-column>
          <el-table-column prop="ip"
                           label="ip地址"
                           width="180">
          </el-table-column>
          <el-table-column prop="empCode"
                           label="资产编号"
                           :formatter=formatEmpCode>

          </el-table-column>
          <el-table-column prop="emp"
                           label="使用人"
                           :formatter=formatEmp>
          </el-table-column>
          <el-table-column prop="isOnline"
                           label="在线/离线"
                           :formatter=formatIsOnline>
          </el-table-column>
          <el-table-column prop="status"
                           label="设备状态"
                           :formatter=formatIsOk>
          </el-table-column>
          <el-table-column prop="status"
                           label="查看详情">
            <template slot-scope="scope">
              <el-button type="primary"
                         @click="showDetail(scope.$index, scope.row)">查看详情</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </el-row>
    <el-pagination background
                   layout="prev, pager, next"
                   :total=totalNum
                   :current-page=currentPage
                   @current-change="handleCurrentChange"
                   @prev-click="handlePrevClick"
                   @next-click="handlerNextClick">
    </el-pagination>
    <terminalDetail ref="detail"></terminalDetail>
  </div>
</template>

<script>
import terminalDetail from './terminalDetail'
export default {
  components: {
    terminalDetail
  },
  created () {
    this.selectTerminalList()
  },
  data () {
    return {
      action: this.$store.state.ip + '/terminal/importAssetInfo',
      pcList: [],
      mac: '',
      username: '',
      orgCode: [],
      status: [
        { value: true, lable: '正常' },
        { value: false, lable: '故障' }
      ],
      pcStatus: '',
      totalNum: 0,
      currentPage: 1

    }
  },
  methods: {
    handleSuccess (response) {
      console.log(response)


    },
    showDetail (index, row) {
      console.log(index, row)
      this.$http.get("terminal/getTerminalDetailsByMac", { params: { mac: row.mac } }).then(res => {
        var srcList = [];
        for (var s in res.data.srcList) {
          srcList.push(this.$store.state.ip + '/screenCapturePath/' + res.data.srcList[s])
        }

        var softList = [];
        for (var s2 in res.data.softList) {
          var soft = JSON.parse(res.data.softList[s2].value)
          soft.cas = res.data.softList[s2].cas
          softList.push(soft)
        }
        var wbPatch = []
        for (var s3 in res.data.wbPatch) {
          var patch = JSON.parse(res.data.wbPatch[s3].value)
          patch.cas = res.data.wbPatch[s3].cas
          wbPatch.push(patch)
        }

        this.$refs.detail.mac = res.data.mac
        this.$refs.detail.ip = res.data.ip
        this.$refs.detail.emp = res.data.emp
        this.$refs.detail.assetCode = res.data.assetCode
        this.$refs.detail.empCode = res.data.empCode
        this.$refs.detail.cpu = res.data.cpu
        this.$refs.detail.os = res.data.os
        this.$refs.detail.softList = softList
        this.$refs.detail.wbPatch = wbPatch
        this.$refs.detail.errorLog = res.data.errorLog
        this.$refs.detail.url = srcList[0]
        this.$refs.detail.srcList = srcList

      })


      this.$refs.detail.dialogTableVisible = true

    },
    formatEmpCode (row, column) {
      console.log(column)
      return row.empCode == "" ? "未绑定" : row.empCode
    },
    formatEmp (row, column) {
      console.log(column)
      return row.emp == "" ? "未绑定" : row.emp
    },
    formatIsOnline (row, column) {
      console.log(column)
      return row.isOnline ? "离线" : "在线"
    },
    formatIsOk (row, column) {
      console.log(column)
      return row.isOk ? "正常" : "故障"
    },
    selectTerminalList () {
      var pa = {};
      pa.current = this.currentPage
      pa.size = 10;
      pa.mac = this.mac
      pa.username = this.username
      var orgCodestr = ''
      for (var x in this.orgCode) {
        orgCodestr += x + ","
      }
      orgCodestr = orgCodestr.substr(0, orgCodestr.length - 1)
      pa.orgCodes = orgCodestr
      pa.pcStatus = this.pcStatus
      console.log(pa)
      this.$http.get("/terminal/selectTerminalList", { params: pa }).then(res => {
        this.pcList = res.data.records
      })
    },
    handleCurrentChange (val) {
      console.log("page:", val)
      this.currentPage = val
      this.selectTerminalList()
    },
    handlePrevClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.selectTerminalList()
    },
    handlerNextClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.selectTerminalList()
    },
  }
}
</script>

<style>
</style>