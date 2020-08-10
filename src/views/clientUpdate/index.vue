<template>
  <el-tabs type="border-card">
    <el-tab-pane label="版本概况">
      <el-row>
        <el-input placeholder="版本号"
                  style="width:229px;margin-right:10px"
                  prefix-icon="el-icon-s-opportunity"
                  v-model="versionStr">
        </el-input>
        <el-button icon="el-icon-search"
                   type="primary"
                   @click="selectTerminalList">搜索</el-button>
        <el-button type="primary"
                   @click="showForm()"
                   class="hcy-el-button"
                   icon="el-icon-circle-plus-outline">上传文件</el-button>
      </el-row>

      <el-row>
        <template>
          <el-table :data="tableData"
                    style="width: 100%">
            <el-table-column prop="versionName"
                             label="版本号">
            </el-table-column>
            <el-table-column prop="createTime"
                             label="上传时间"
                             width="180">
            </el-table-column>
            <el-table-column prop="creater"
                             label="上传人"
                             width="
                             180">
            </el-table-column>
            <el-table-column prop="md5"
                             label="MD5值">
            </el-table-column>
            <el-table-column prop="adaptiveSys"
                             label="适配系统"
                             :formatter='formatterSys'>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="handleEdit(scope.$index, scope.row)">添加任务</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-row>

    </el-tab-pane>
    <el-tab-pane label="推送任务列表">
      <el-row>
        <template>
          <el-table :data="tableData"
                    style="width: 100%">
            <el-table-column prop="date"
                             label="日期"
                             width="180">
            </el-table-column>
            <el-table-column prop="name"
                             label="姓名"
                             width="180">
            </el-table-column>
            <el-table-column prop="address"
                             label="地址">
            </el-table-column>

          </el-table>
        </template>
      </el-row>
    </el-tab-pane>
    <el-pagination background
                   layout="prev, pager, next"
                   :total=totalNum
                   :current-page=currentPage
                   @current-change="handleCurrentChange"
                   @prev-click="handlePrevClick"
                   @next-click="handlerNextClick">
    </el-pagination>
    <clientForm ref="clientForm"></clientForm>
    <clientPush ref="clientPush"></clientPush>
  </el-tabs>
</template>

<script>
import clientForm from './clientForm'
import clientPush from './clientPush'

export default {
  components: {
    clientForm,
    clientPush
  },
  data () {
    return {
      versionStr: '',
      tableData: [],
      totalNum: 0,
      currentPage: 1
    }
  },
  created () {
    this.selectClientUpdateFileList()
  },
  methods: {
    formatterSys (row) {
      switch (row.adaptiveSys) {
        case 1:
          return "windows"
        case 2:
          return "UBunTu"
        case 3:
          return "deepin"
        case 4:
          return "android"
        default:
          return "位置信息"
      }
    },
    showForm () {
      this.$refs.clientForm.dialogTableVisible = true
    },
    showclientPush () {
      this.$refs.clientPush.dialogClientPushVisible = true
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.$refs.clientPush.dialogClientPushVisible = true
      this.$refs.clientPush.ruleForm.clientUpadteId = row.id
      this.$refs.clientPush.ruleForm.versionName = row.versionName
    },
    handleCurrentChange (val) {
      console.log("page:", val)
      this.currentPage = val
      this.selectClientUpdateFileList()
    },
    handlePrevClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.selectClientUpdateFileList()
    },
    handlerNextClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.selectClientUpdateFileList()
    },
    selectClientUpdateFileList () {
      var params = {}
      params.versionStr = this.versionStr;
      params.current = this.currentPage
      params.size = 10;
      this.$http.get("/cron/selectClientUpdateFileList", { params: params }).then(res => {
        this.tableData = res.data.records
        console.log(res.data)
      });
    }
  }

}
</script>

<style>
</style>