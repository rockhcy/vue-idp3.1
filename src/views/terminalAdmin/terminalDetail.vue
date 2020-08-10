<template>
  <el-dialog title="设备详情"
             :visible.sync="dialogTableVisible">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="demo-image__preview">
          <el-image style="width: 100px; height: 100px"
                    :src="url"
                    :preview-src-list="srcList">
          </el-image>
        </div>
        <el-divider></el-divider>
        <span>mac地址:{{mac}}</span>
        <br>
        <span>IP地址:{{ip}}</span>
        <br>
        <span>设备所有人:{{emp}}</span>
        <br>
        <span>资产编号:{{assetCode}}</span>
        <br>
        <span>员工工号:{{empCode}}</span>
        <br>
        <span>CPU:{{cpu}}</span>
        <br>
        <span>操作系统:{{os}}</span>
        <br>

      </el-col>
      <el-col :span="16">
        <el-tabs type="border-card">
          <el-tab-pane label="软件日志">
            <template>
              <el-table :data="softList"
                        style="width: 100%"
                        height="400">
                <el-table-column prop="Time"
                                 label="采集时间"
                                 width="140">
                </el-table-column>
                <el-table-column prop="name"
                                 label="软件名称"
                                 width="180">
                </el-table-column>
                <el-table-column prop="version"
                                 label="版本">
                </el-table-column>
                <el-table-column prop="Post"
                                 label="发布者">
                </el-table-column>
                <el-table-column prop="cas"
                                 label="行为"
                                 :formatter="format1">

                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="补丁日志">
            <template>
              <el-table :data="wbPatch"
                        style="width: 100%"
                        height="400">
                <el-table-column prop="install_time"
                                 label="安装时间"
                                 width="140">
                </el-table-column>
                <el-table-column prop="name"
                                 label="补丁名称"
                                 width="180">
                </el-table-column>
                <el-table-column prop="description"
                                 label="描述">
                </el-table-column>
                <el-table-column prop="cas"
                                 label="行为"
                                 :formatter="format1">
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="系统错误日志">
            <template>
              <el-table :data="errorLog"
                        style="width: 100%"
                        height="400">
                <el-table-column prop="logTime"
                                 label="发生时间"
                                 width="140">
                </el-table-column>
                <el-table-column prop="logTypeName"
                                 label="错误名称"
                                 width="180">
                </el-table-column>
                <el-table-column prop="logId"
                                 label="错误id">
                </el-table-column>
                <el-table-column prop="address"
                                 label="描述">
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="实时进程信息">
            <template>
              <el-table :data="runPRO"
                        style="width: 100%"
                        height="400">
                <el-table-column prop="date"
                                 label="采集时间"
                                 width="140">
                </el-table-column>
                <el-table-column prop="Pro"
                                 label="进程名称"
                                 width="180">
                </el-table-column>
                <el-table-column prop="Pid"
                                 label="进程id">
                </el-table-column>
                <el-table-column prop="address"
                                 label="是否为黑名单进程">
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-col>

    </el-row>

  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      mac: '',
      ip: '',
      emp: '',
      assetCode: '',
      empCode: '',
      cpu: '',
      os: '',
      softList: [],
      wbPatch: [],
      errorLog: [],
      runPRO: [],
      dialogTableVisible: false,
      url: '',
      srcList: []
    }
  },
  created () {

  },

  methods: {
    showPic () {

    },
    format1 (row) {
      return row.cas == 1 ? "安装" : "卸载"
    }


  }

}
</script>

<style>
</style>