export default {
  homePirOption: function () {
    return homePirOption
  },
  homeWarningTable: function () {
    return homeWarningTable
  },
  homeSerInfTable: function () {
    return homeSerInfTable
  },
  userTableInfo: function () {
    return userTableInfo
  },
  departmentTableInfo: function () {
    return departmentTableInfo;
  },
  departmentList: function () {
    return departmentList;
  },
  pcList: function () {
    return pcList;
  },
  cronList: function () {
    return cronList;
  }
}
// 首页的饼图数据
var homePirOption = {
  title: {
    text: '80',
    subtext: '在线终端(台)',
    x: 'center',
    y: 'center',
    textStyle: {
      fontSize: 30,
      fontWeight: 'normal',
      color: ['#333']
    },
    subtextStyle: {
      color: '#666',
      fontSize: 16
    },
  },
  grid: {
    bottom: 150,
    left: 0,
    right: '10%'
  },
  legend: {
    show: false,
    orient: 'vertical',
    top: "middle",
    right: "5%",
    textStyle: {
      color: '#f2f2f2',
      fontSize: 25,

    },
    icon: 'roundRect'
  },
  series: [
    // 主要展示层的
    {
      radius: ['25%', '51%'],
      center: ['50%', '50%'],
      type: 'pie',
      itemStyle: {
        normal: {
          color: function (params) {
            return colorList[params.dataIndex]
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 15,
          length2: 120,
          lineStyle: {
            color: '#d3d3d3'
          },
          align: 'right'
        },
        color: "#000",
        emphasis: {
          show: true
        }
      },
      label: {
        normal: {
          formatter: function (params) {
            var str = '';
            switch (params.name) {
              case '正常': str = '{a|}\n{nameStyle|正常 }' + '{rate|' + params.value + '%}'; break;
              case '故障': str = '{b|}\n{nameStyle|故障 }' + '{rate|' + params.value + '%}'; break;
              case '警告': str = '{c|}\n{nameStyle|警告 }' + '{rate|' + params.value + '%}'; break;

            }
            return str
          },
          padding: [0, -110],
          height: 165,
          rich: {
            a: {
              width: 38,
              height: 38,
              lineHeight: 50,
              backgroundColor: {
                image: './asset/img.png'//为什么背景图片没有生效
              },
              align: 'left'
            },
            b: {
              width: 29,
              height: 45,
              lineHeight: 50,
              backgroundColor: {
                image: './asset/example.svg'
              },
              align: 'left'
            },
            c: {
              width: 34,
              height: 33,
              lineHeight: 50,
              backgroundColor: {
                image: './asset/example.svg'
              },
              align: 'left'
            },
            nameStyle: {
              fontSize: 16,
              color: "#555",
              align: 'left'
            },
            rate: {
              fontSize: 20,
              color: "#1ab4b8",
              align: 'left'
            }
          }
        }
      },
      data: [
        { value: 17, name: '正常', },
        { value: 23, name: '故障' },
        { value: 27, name: '警告' }],
    },
    // 边框的设置
    {
      radius: ['47%', '51%'],
      center: ['50%', '50%'],
      type: 'pie',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      animation: false,
      tooltip: {
        show: false
      },
      itemStyle: {
        normal: {
          color: 'rgba(250,250,250,0.5)'
        }
      },
      data: [{
        value: 1,
      }],
    }
  ]
}
var colorList = ['#afa3f5', '#00d488', '#3feed4', '#3bafff', '#f1bb4c', "rgba(250,250,250,0.5)"];
// 首页的警告table信息
var homeWarningTable = [
  { mac: "F4:4D:30:F2:23:60", ip: "192.168.50.143", typeLv: "1", des: "开放了高危端口3389" },
  { mac: "F4:4D:30:F2:23:60", ip: "192.168.50.143", typeLv: "1", des: "开放了高危端口3389" },
  { mac: "F4:4D:30:F2:23:60", ip: "192.168.50.143", typeLv: "1", des: "开放了高危端口3389" }
]
// 首页的警告table信息
var homeSerInfTable = [
  { serName: "Web服务器", ip: "192.168.50.143", typeLv: "1", des: "内存紧张", createTime: '2020-12-12- 12:12:12' },
  { serName: "Web服务器", ip: "192.168.50.143", typeLv: "1", des: "内存紧张", createTime: '2020-12-12- 12:12:12' },
  { serName: "Web服务器", ip: "192.168.50.143", typeLv: "1", des: "网络终端", createTime: '2020-12-12- 12:12:12' }
]

//用户管理table
var userTableInfo = [
  { username: '何重洋', loginname: 'rock', depatment: '和信创天武汉研发中信', email: '337815986@qq.com', status: '1', userLv: '管理员' },
  { username: '何重洋', loginname: 'rock', depatment: '和信创天武汉研发中信', email: '337815986@qq.com', status: '-1', userLv: '管理员' },
  { username: '何重洋', loginname: 'rock', depatment: '和信创天武汉研发中信', email: '337815986@qq.com', status: '1', userLv: '管理员' },
  { username: '何重洋', loginname: 'rock', depatment: '和信创天武汉研发中信', email: '337815986@qq.com', status: '1', userLv: '管理员' },
  { username: '何重洋', loginname: 'rock', depatment: '和信创天武汉研发中信', email: '337815986@qq.com', status: '1', userLv: '管理员' },
  { username: '何重洋', loginname: 'rock', depatment: '和信创天武汉研发中信', email: '337815986@qq.com', status: '1', userLv: '管理员' }
]

// 部署单位管理table
var departmentTableInfo = [
  { dName: '武汉和信创天', dNumber: 'vesystem_WuHan', dLv: '自绘地图标记', pcNum: '900', areaCode: '420100' },
  { dName: '武汉和信创天', dNumber: 'vesystem_WuHan', dLv: '全国地图标记点', pcNum: '900', areaCode: '420100' },
  { dName: '武汉和信创天', dNumber: 'vesystem_WuHan', dLv: '自绘地图标记', pcNum: '900', areaCode: '420100' },
  { dName: '武汉和信创天', dNumber: 'vesystem_WuHan', dLv: '自绘地图标记', pcNum: '900', areaCode: '420100' },
  { dName: '武汉和信创天', dNumber: 'vesystem_WuHan', dLv: '自绘地图标记', pcNum: '900', areaCode: '420100' }
]
// 终端管理
// 部署单位列表
var departmentList = [
  { value: '1', label: '研发部' },
  { value: '2', label: '销售部' },
  { value: '3', label: '人事部' },
  { value: '4', label: '控制中心' },
  { value: '5', label: '市场部' }
]
// 终端列表
var pcList = [
  { mac: '94:C6:91:C2:F5:50', ip: '192.168.50.143', dNumber: 'vesystem', assetNum: '100100010', user: '何重洋', isOnline: '在线', status: '正常' },
  { mac: '94:C6:91:C2:F5:50', ip: '192.168.50.143', dNumber: 'vesystem', assetNum: '100100010', user: '何重洋', isOnline: '在线', status: '正常' },
  { mac: '94:C6:91:C2:F5:50', ip: '192.168.50.143', dNumber: 'vesystem', assetNum: '100100010', user: '何重洋', isOnline: '在线', status: '正常' },
  { mac: '94:C6:91:C2:F5:50', ip: '192.168.50.143', dNumber: 'vesystem', assetNum: '100100010', user: '何重洋', isOnline: '在线', status: '正常' },
  { mac: '94:C6:91:C2:F5:50', ip: '192.168.50.143', dNumber: 'vesystem', assetNum: '100100010', user: '何重洋', isOnline: '在线', status: '正常' }
]
// 计划任务
var cronList = [
  { cronNum: '20200704001', createTime: '2019-12-12 12:12:12', creater: '何重洋', cronType: '端口检测', cronDesc: '针对勒索病毒发起的451端口检查', scop: '人事部、控制中心', executeType: '一次性任务', executeTime: '2020-01-15 12:07:50', executeStatus: '已执行' },
  { cronNum: '20200704001', createTime: '2019-12-12 12:12:12', creater: '何重洋', cronType: '硬件检测', cronDesc: '针对勒索病毒发起的451端口检查', scop: '人事部、控制中心', executeType: '周期性任务', executeTime: '2020-01-15 12:07:50', executeStatus: '未执行' },
  { cronNum: '20200704001', createTime: '2019-12-12 12:12:12', creater: '何重洋', cronType: '端口检测', cronDesc: '针对勒索病毒发起的451端口检查', scop: '人事部、控制中心', executeType: '一次性任务', executeTime: '2020-01-15 12:07:50', executeStatus: '取消' },
  { cronNum: '20200704001', createTime: '2019-12-12 12:12:12', creater: '何重洋', cronType: '端口检测', cronDesc: '针对勒索病毒发起的451端口检查', scop: '人事部、控制中心', executeType: '一次性任务', executeTime: '2020-01-15 12:07:50', executeStatus: '异常关闭' },
  { cronNum: '20200704001', createTime: '2019-12-12 12:12:12', creater: '何重洋', cronType: '端口检测', cronDesc: '针对勒索病毒发起的451端口检查', scop: '人事部、控制中心', executeType: '一次性任务', executeTime: '2020-01-15 12:07:50', executeStatus: '已执行' }

]