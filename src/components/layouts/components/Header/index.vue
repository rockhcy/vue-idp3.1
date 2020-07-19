<template>
  <div class="top">
    <el-row style="height: 100%">
      <el-col :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              style="height: 100%;position: relative;">
        <div class="grid-left"
             :style="{ 'width': $store.state.menuWidth, 'display': $store.state.menuWidth === '0px' ? 'none' : ''}">
          UAM
        </div>
        <i @click="flexibleClick"
           style="font-size: 24px;padding-left: 20px;"
           :class="$store.state.isPhone ? $store.state.menuWidth === '0px' ? 'el-icon-s-unfold' : 'el-icon-s-fold' : $store.state.menuWidth === '60px' ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        <div class="grid-content">
          <span class="span">和信云应用管理平台</span>
          <el-badge :value="12"
                    class="item">
            <el-popover placement="bottom"
                        width="200"
                        trigger="click">
              <div class="ul-list">
                <div class="ul-list-conter"><small>欧阳峰</small><a>ArcGIS 缺少插件</a></div>
                <p>2020-03-18 16:00</p>
              </div>
              <p @click="tolink"
                 style="text-align: center">
                <i class="el-icon-message"
                   style="margin-right: 5px"></i>所有工单</p>
              <el-button icon="icon icon-icon-chakanxq"
                         slot="reference"
                         @click="xinxiClick"></el-button>
            </el-popover>
          </el-badge>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    tolink () {
      this.$router.push('/mailbox/index');
    },
    //xinxi点击事件
    xinxiClick () {
      console.log(11)
    },
    flexibleClick () {
      if (!this.$store.state.isPhone) {
        this.$store.state.isFold = !this.$store.state.isFold;
        if (this.$store.state.isFold) {
          this.$store.state.menuWidth = '60px';
        } else {
          this.$store.state.menuWidth = '220px';
        }
      } else {
        if (this.$store.state.menuWidth === '60px') {
          this.$store.state.menuWidth = '0px';
        } else {
          this.$store.state.menuWidth = '60px';
        }
      }
      // console.log(this.$store.state.isFold);
    },
  }
}
</script>

<style>
.ul-list {
}
.ul-list-conter small {
  color: #1ab394;
}
.ul-list-conter a {
  padding: 3px 20px;
  color: #337ab7;
}
.item {
  display: inline-block;
  position: absolute !important;
  right: -3px;
}
.item sup {
  top: 17px !important;
}
.item .el-button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  padding: 0;
}
.top {
  width: 100%;
  height: 63px;
  line-height: 63px;
}
.grid-content {
  width: 64%;
  position: relative;
  height: 100%;
  line-height: 63px;
  text-align: center;
  color: #fff;
  float: right;
  margin-right: 20px;
}
.grid-content .icon {
  font-size: 24px;
  color: #888888;
}
.grid-content .span {
  color: #888888;
  margin-right: 10px;
  line-height: 63px;
  height: 100%;
  display: inline-block;
  /* float: right; */
  position: absolute;
  right: 20px;
}
.grid-left {
  width: 200px;
  height: 100%;
  line-height: 63px;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
  display: inline-block;
  background-color: #2f4050;
  /*border-right: 1px solid rgba(255,255,255,0.4);*/
  /*border-bottom: 1px solid rgba(255,255,255,0.4);*/
}
</style>

