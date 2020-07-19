<template>
  <div style="margin: 10px">
    <el-row>
      <el-button type="primary">资产采集</el-button>
      <el-button type="primary">端口扫描</el-button>
      <el-button type="primary">软件扫描</el-button>
      <el-button type="primary">硬件检测</el-button>
      <el-button type="primary">性能检测</el-button>
    </el-row>
    <template>
      <el-table :data="cronList"
                style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left"
                     inline
                     class="demo-table-expand">
              <el-form-item label="任务编号">
                <span>{{ props.row.cronNum }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="创建人">
                <span>{{ props.row.creater }}</span>
              </el-form-item>
              <el-form-item label="任务类型">
                <span>{{ props.row.cronType }}</span>
              </el-form-item>
              <el-form-item label="任务描述">
                <span>{{ props.row.cronDesc }}</span>
              </el-form-item>
              <el-form-item label="作用范围">
                <span>{{ props.row.scop }}</span>
              </el-form-item>
              <el-form-item label="执行类型">
                <span>{{ props.row.executeType }}</span>
              </el-form-item>
              <el-form-item label="执行时间">
                <span>{{ props.row.executeTime }}</span>
              </el-form-item>
              <el-form-item label="执行状态">
                <span>{{ props.row.executeStatus }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="任务编号"
                         prop="cronNum">
        </el-table-column>
        <el-table-column label="创建人"
                         prop="creater">
        </el-table-column>
        <el-table-column label="任务类型"
                         prop="cronType">
        </el-table-column>
        <el-table-column label="执行时间"
                         prop="executeTime">
        </el-table-column>
        <el-table-column label="执行状态"
                         prop="executeStatus">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
      cronList: analogData.cronList()
    }
  },
  methods: {

  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>