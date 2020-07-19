<template>
  <div class="terminalAdmin"
       style="margin:10px">
    <span style="font-size: 23px">终端管理</span><br>
    <el-row>
      <el-input placeholder="mac地址"
                style="width:229px;margin-right:10px"
                prefix-icon="el-icon-s-platform"
                v-model="input2">
      </el-input>
      <el-input placeholder="员工姓名"
                style="width:229px"
                prefix-icon="el-icon-user-solid"
                v-model="input2">
      </el-input>
      <template>
        <el-select v-model="value2"
                   multiple
                   collapse-tags
                   style="margin-left: 20px;margin-right:20px"
                   placeholder="部署单位">
          <el-option v-for="item in departmentList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template>

      <template>
        <el-select v-model="value"
                   style="margin-right:20px"
                   placeholder="设备状态">
          <el-option v-for="item in pcStatus"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template>
      <el-button type="primary">获取资产模板</el-button>
      <el-button type="primary">导入资产信息</el-button>
      <el-button type="primary">导出支持信息</el-button>
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
          <el-table-column prop="assetNum"
                           label="资产编号"
                           :formatter="formatter">
          </el-table-column>
          <el-table-column prop="user"
                           label="使用人"
                           :formatter="formatter">
          </el-table-column>
          <el-table-column prop="isOnline"
                           label="在线/离线"
                           :formatter="formatter">
          </el-table-column>
          <el-table-column prop="status"
                           label="设备状态"
                           :formatter="formatter">
          </el-table-column>
        </el-table>
      </template>
    </el-row>
    <el-pagination background
                   layout="prev, pager, next"
                   :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import analogData from '../../analogData.js'
export default {
  data () {
    return {
      departmentList: analogData.departmentList(),
      value2: [],
      value: '',
      pcStatus: [
        { value: '正常', lable: '1' },
        { value: '故障', lable: '-1' },
        { value: '异常', lable: '-2' }
      ],
      pcList: analogData.pcList()

    }
  }
}
</script>

<style>
</style>