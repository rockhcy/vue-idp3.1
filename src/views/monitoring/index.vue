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
      <el-date-picker v-model="strategyTime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
      <el-button icon="el-icon-search"
                 type="primary"
                 @click="selectPorProBlacklist">查找</el-button>

      <el-button type="primary"
                 @click="showAddForm">添加策略</el-button>
    </el-row>
    <el-row>
      <template>
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="createTime"
                           label="创建时间"
                           :formatter="dataFormatter"
                           width="180">
          </el-table-column>
          <el-table-column prop="creater"
                           label="创建人"
                           width="180">
          </el-table-column>
          <el-table-column prop="strategyType"
                           label="策略类型">
            {{strategyType == 1?"进程监控":"端口监控"}}
          </el-table-column>
          <el-table-column prop="strategyContent"
                           label="策略内容">
          </el-table-column>
          <el-table-column prop="strategyDesc"
                           label="描述">
          </el-table-column>
          <el-table-column prop="strategyStatus"
                           label="策略状态">
            <template slot-scope="scope">
              <el-switch style="display: block"
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         :active-value=1
                         :inactive-value=2
                         v-model="scope.row.strategyStatus"
                         @change='changeStatus(scope.row,scope.row.strategyStatus)'>
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="终端列表">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination background
                     layout="prev, pager, next"
                     :total=totalNum
                     :current-page=currentPage
                     @current-change="handleCurrentChange"
                     @prev-click="handlePrevClick"
                     @next-click="handlerNextClick">
      </el-pagination>
    </el-row>
    <AddStrategy ref="addStrategy"></AddStrategy>
    <PCList ref="pcList"></PCList>
  </div>
</template>

<script>
import AddStrategy from './addStrategy';
import PCList from './pcList'
export default {
  components: {
    AddStrategy,
    PCList
  },
  data () {
    return {
      currentPage: 1,
      totalNum: 0,
      input2: '',
      strategyType: [
        { value: '1', label: '进程监控' },
        { value: '2', label: '端口监控' }

      ],
      typeValue: '',
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
      strategyTime: '',
      tableData: []
    }

  },
  created () {
    this.selectPorProBlacklist()
  },
  methods: {
    dataFormatter (row, column) {
      console.log(column)
      console.log(new Date(row.createTime))
      return new Date(row.createTime).format("yyyy-MM-dd hh:mm:ss")
    },
    changeStatus: function (row, statusVal) {
      this.$http.put("/admin/updatePorProBlacklistStatusById", { "id": row.id, "status": statusVal }).then(res => {
        console.log(res.data)
      })
    },
    handleCurrentChange (val) {
      console.log("page:", val)
      this.currentPage = val
      this.selectPorProBlacklist()
    },
    handlePrevClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.selectPorProBlacklist()
    },
    handlerNextClick (val) {
      console.log("page:", val)
      this.currentPage = val
      this.selectPorProBlacklist()
    },
    showAddForm () {
      this.$refs.addStrategy.dialogFormVisible = true
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.$refs.pcList.dialogTableVisible = true;
      this.$refs.pcList.strategyId = row.id;
      this.$refs.pcList.selectMacInfoListByStrategyId();
    },
    selectPorProBlacklist () {
      var params = {};
      params.current = this.currentPage
      params.size = 10
      params.content = this.input2
      if (this.typeValue == '') {
        params.strategyType = 0
      } else {
        params.strategyType = this.typeValue
      }
      if (this.strategyTime == '') {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        end.setTime(end.getTime() + 3600 * 1000 * 24)
        params.startTime = start.format("yyyy-MM-dd");
        params.endTime = end.format("yyyy-MM-dd");
      } else {
        const start = this.strategyTime[0];
        const end = this.strategyTime[1];
        end.setTime(end.getTime() + 3600 * 1000 * 24)
        params.startTime = start.format("yyyy-MM-dd");
        params.endTime = end.format("yyyy-MM-dd");
        console.log("时间不为空：", this.strategyTime)
      }
      console.log(params)
      this.$http.get("/admin/selectPorProBlacklist", { params: params }).then(res => {
        this.tableData = res.data.records
        this.totalNum = res.data.total
      })
    }
  }


}
</script>

<style>
</style>