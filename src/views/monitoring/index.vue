<template>
  <div>
    <span style="font-size: 23px">进程、端口监控管理</span>
    <el-row>
      <el-input placeholder="端口或进程名称"
                style="width:229px;margin-right:10px"
                prefix-icon="el-icon-s-platform"
                v-model="input2">
      </el-input>
      <template>
        <el-select v-model="typeValue"
                   style="margin-right:20px"
                   placeholder="策略类型">
          <el-option v-for="item in strategyType"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template>
      <el-date-picker v-model="createTime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
      <el-button icon="el-icon-search"
                 type="primary">查找</el-button>

      <el-button type="primary"
                 @click="showAddForm">添加策略</el-button>
    </el-row>
    <el-row>
      <template>
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="date"
                           label="创建时间"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="创建人"
                           width="180">
          </el-table-column>
          <el-table-column prop="address"
                           label="策略类型">
          </el-table-column>
          <el-table-column prop="address"
                           label="策略内容">
          </el-table-column>
          <el-table-column prop="address"
                           label="描述">
          </el-table-column>
          <el-table-column prop="address"
                           label="策略状态">
            <el-switch style="display: block"
                       v-model="status"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="启用"
                       inactive-text="关闭">
            </el-switch>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </el-row>
    <AddStrategy ref="addStrategy"></AddStrategy>
  </div>
</template>

<script>
import AddStrategy from './addStrategy';
export default {
  components: {
    AddStrategy
  },
  data () {
    return {
      input2: '',
      strategyType: [
        { value: '端口监控', lable: '2' },
        { value: '进程监控', lable: '1' }
      ],
      typeValue: '',
      status: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      createTime: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }

  },
  methods: {
    showAddForm () {
      this.$refs.addStrategy.dialogFormVisible = true
    }
  }


}
</script>

<style>
</style>