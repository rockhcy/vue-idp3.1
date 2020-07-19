<template>
  <div class="center">
    <el-row>
      <el-col :span="12">
        <div ref="map"
             style="height:600px;width:100%;"></div>
        <div class="home-runtime-d"
             style="height:600px;width:100%;"
             ref="bar">我是统计图</div>
      </el-col>
      <el-col :span="12">
        <div>
          <span style="font-size: 22px">终端概况</span>
          <div ref="pie"
               style="height:400px;width:100%;">我是饼图</div>
        </div>

        <div class="home-warning-d"
             style="widt:100%">
          <div slot="header"
               class="clearfix">
            <span>设备警告信息</span>
          </div>
          <el-table :data="tableData"
                    stripe>
            <el-table-column prop="mac"
                             label="MAC">
            </el-table-column>
            <el-table-column prop="ip"
                             label="IP地址">
            </el-table-column>
            <el-table-column prop="typeLv"
                             label="警告级别">
            </el-table-column>
            <el-table-column prop="des"
                             label="描述">
            </el-table-column>
          </el-table>
        </div>
        <div class="home-serInfo-d"
             style="widt:100%">
          <div slot="header"
               class="clearfix">
            <span>服务器</span>
          </div>
          <el-table :data="homeSerInfTable"
                    stripe>
            <el-table-column prop="serName"
                             label="服务名称">
            </el-table-column>
            <el-table-column prop="ip"
                             label="IP地址">
            </el-table-column>
            <el-table-column prop="typeLv"
                             label="警告级别">
            </el-table-column>
            <el-table-column prop="des"
                             label="描述">
            </el-table-column>
            <el-table-column prop="createTime"
                             label="事件时间">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import analogData from '../../analogData.js'

export default {
  name: "Main",
  data: function () {
    return {
      homePirOption: analogData.homePirOption(),
      tableData: analogData.homeWarningTable(),
      homeSerInfTable: analogData.homeSerInfTable()
    }
  },
  mounted () {
    this.initMap();
    this.initBar();
    this.initPie();
  },
  methods: {
    initMap () {
      this.mapchart = this.$echarts.init(this.$refs.map);
      this.mapchart.clear();
      var option1 = {
        series: [{
          type: 'map',
          map: 'china'
        }]
      }

      this.mapchart.setOption(option1);
    },
    initBar () {
      this.barchart = this.$echarts.init(this.$refs.bar);
      this.barchart.clear();
      var option2 = {
        title: {
          text: 'Awesome Chart'
        },
        xAxis: {
          data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        yAxis: {},
        series: [{
          type: 'bar',
          data: [220, 182, 191, 234, 290, 330, 310]
        }, {
          type: 'bar',
          data: [200, 200, 101, 300, 330, 190, 100]
        }]
      };
      this.barchart.setOption(option2);
    },
    initPie () {
      this.piechart = this.$echarts.init(this.$refs.pie);
      this.piechart.clear();
      this.piechart.setOption(this.homePirOption);
    }

  }

}
</script>

<style>
</style>