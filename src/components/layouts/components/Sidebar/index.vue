<template>
  <div class="nav"
       :style="{ 'width': $store.state.menuWidth }">
    <figure class="nav-top"
            v-if="!$store.state.isFold">
      <img src="../../../../assets/img.jpg"
           class="usreImg"
           @click="imgClick()">
      <p>哎嘿</p>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          系统管理员<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">修改密码</el-dropdown-item>
          <el-dropdown-item command="b">工作事务</el-dropdown-item>
          <el-dropdown-item command="c">注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </figure>
    <el-row style="background: #2f4050">
      <el-scrollbar :class="`hide-x ${!$store.state.isFold?'':'closemenu'}`"
                    :native="false"
                    :noresize="false">
        <el-menu router
                 :collapse="$store.state.isFold"
                 unique-opened
                 ref="menu"
                 class="el-menu-vertical-demo"
                 style="height: 100%"
                 background-color="rgba(0,0,0,0)"
                 text-color="#ffffff"
                 @open="handleOpen"
                 @close="handleClose"
                 active-text-color="#ffffff"
                 element-loading-background="transparent">
          <menu-item v-for="item in sideMenu"
                     :key="item.id"
                     :data="item" />
        </el-menu>
      </el-scrollbar>
    </el-row>
    <UpdatePassword ref="updatePassword"></UpdatePassword>
  </div>
</template>
<script>
import MenuItem from './components/MenuItem'
import UpdatePassword from './components/updatePassword'
export default {
  name: 'Sidebar',
  components: {
    MenuItem,
    UpdatePassword
  },
  data () {
    return {
      sideMenu: [
        {          "treeLeaf": true,
          'menuName': '首页',
          'menuHref': "/home/index",
          'menuIcon': 'icon icon-xitongshezhi',
        },
        {
          "treeLeaf": false,
          'menuName': '地图管理',
          'menuHref': "#",
          'menuIcon': 'icon icon-xitongshezhi',
          'childrenNodes': [
            {
              "treeLeaf": true,
              'menuName': '城市地图',
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '自绘地图',
              'menuHref': "/home/index"
            },
          ]
        },
        {
          "treeLeaf": false,
          'menuName': '管理模块',
          'menuHref': "#",
          'menuIcon': 'icon icon-xitongshezhi',
          'childrenNodes': [
            {
              "treeLeaf": true,
              'menuName': '用户管理',
              'menuHref': "/userAdmin/index"
            },
            {
              "treeLeaf": true,
              'menuName': '单位管理',
              'menuHref': "/departmentAdmin/index"
            },
            {
              "treeLeaf": true,
              'menuName': '终端管理',
              'menuHref': "/terminalAdmin/index"
            },
            {
              "treeLeaf": true,
              'menuName': '监控策略',
              'menuHref': "/monitoring/index"
            },
            {
              "treeLeaf": true,
              'menuName': '终端任务推送',
              'menuHref': "/clientUpdate/index"
            },
            {
              "treeLeaf": true,
              'menuName': '计划任务',//文件推送、定时任务、高危监控都应该添加到这个页面
              'menuHref': "/scheduledTask/index"
            }
          ]
        },
        {
          "treeLeaf": false,
          'menuName': '统计报表',
          'menuHref': "#",
          'menuIcon': 'icon icon-xitongshezhi',
          'childrenNodes': [
            {
              "treeLeaf": true,
              'menuName': '终端运行概览',
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '系统分布概况',//显示操作系统，级别的分布信息
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '硬件分布概况',//显示硬件分布信息
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '软件分布概况',//显示软件的安装、使用分布情况
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '数据透视分析',//这会是最总要，也是最特性化的一个功能
              'menuHref': "/home/index"
            }
          ]
        },
        {
          "treeLeaf": false,
          'menuName': '系统配置',
          'menuHref': "#",
          'menuIcon': 'icon icon-xitongshezhi',
          'childrenNodes': [
            {
              "treeLeaf": true,
              'menuName': '系统日志',//查询系统的操作日志
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '服务概况',//使用druid，监控web服务的运行情况
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '服务监控',//关联服务器监控模块，使用Sentinel实现服务降级熔断管理，里面应该也有关于服务器状态监控的api，如果没有就自己写一个
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '系统策略',//配置系统参数，使用nacos做配置和注册中心
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '授权管理',//配置系统参数，使用nacos做配置和注册中心
              'menuHref': "/home/index"
            }
          ]
        },
        {
          "treeLeaf": false,
          'menuName': '和信全家桶',
          'menuHref': "#",
          'menuIcon': 'icon icon-xitongshezhi',
          'childrenNodes': [
            {
              "treeLeaf": true,
              'menuName': 'VEMDM',//集成MDM功能，将MDM的服务端注册到nacos就可以了，集成模块只提供查询、监控、和简单的策略下发。（更多是要广告效应）
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': 'VEUAM',//集成UAM的无客户端单机版本，也是广告效应
              'menuHref': "/home/index"
            },
            {
              "treeLeaf": true,
              'menuName': '关于和信',//将和信的其他产品简介也写在这里。因为其他项目我没接触，不知道怎么将他们集成起来，但是现有的UAM、MDM、IDP是可以按插件形式集成的
              'menuHref': "/home/index"
            }
          ]
        }

      ],
    }
  },
  computed: {
    isPhone () {
      return this.$store.state.isPhone;
    },
  },
  watch: {
    isPhone (val) {
      if (val) {
        this.$store.state.menuWidth = '0px';
        this.$store.state.isFold = true;
      } else {
        this.$store.state.menuWidth = '220px';
        this.$store.state.isFold = false;
      }
    },
  },
  methods: {
    handleCommand (command) {
      //修改密码
      if (command == 'a') {
        this.$refs.updatePassword.dialogVisible = true
        console.log("show updatePass div")
      }
      //事务
      if (command == 'b') {
        this.$router.push(
          {
            path: '/mailbox/index',
          }
        );
      }
      //注销
      if (command == 'c') {
        this.$router.push({
          name: 'Login',
        })
      }
    },
    handleOpen (key, keyPath) {
      // eslint-disable-next-line no-console
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // eslint-disable-next-line no-console
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="scss">
.closemenu {
  height: 100% !important;
  .el-scrollbar__wrap {
    .el-scrollbar__view {
      .el-menu-vertical-demo {
        width: auto !important;
        margin-right: 6px;
        transition: width 0.28s;
      }
    }
  }
}
.hide-x {
  height: calc(100% - 110px);
  overflow-y: auto !important;
  .el-scrollbar__wrap {
    margin-bottom: 0 !important;
    margin-right: 0 !important;
    &::-webkit-scrollbar {
      display: none;
    }
    .el-scrollbar__view {
      .el-menu-vertical-demo {
        /*overflow: auto;*/
        border: none;

        .el-menu-item {
          font-size: 16px;
          font-family: 微软雅黑;
          &:hover {
            background-color: rgba(0, 0, 0, 0.2) !important;
          }
          &:focus {
            background-color: rgba(0, 0, 0, 0.2) !important;
          }
          .icon {
            color: #ffffff;
            margin-right: 20px;
          }
        }
        .el-submenu {
          .el-submenu__title {
            font-size: 16px;
            font-family: 微软雅黑;
            .icon {
              color: #ffffff;
              margin-right: 20px;
            }
            .el-submenu__icon-arrow {
              color: #ffffff;
              margin-right: 22px;
            }
            &:hover {
              background-color: rgba(0, 0, 0, 0.2) !important;
            }

            &:focus {
              background-color: rgba(0, 0, 0, 0.2) !important;
            }
          }
        }
      }
    }
  }
}
//伸缩以后得样式
.el-menu--vertical {
  .el-menu {
    .el-menu-item {
      color: #ffffff !important;
      background-color: #2f4050 !important;
    }
  }
}
</style>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #8095a8;
  font-size: 16px;
}
.el-icon-arrow-down {
  font-size: 18px;
}
.nav {
  width: 220px;
  height: calc(100% - 63px);
  display: block;
  float: left;
  background: #2c3e50;
}
.nav-top {
  width: 100%;
  height: 110px;
  text-align: center;
  display: block;
  color: #ffffff;
  background: #2f4050;
}

.usreImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.nav-top p {
  font-size: 16px;
  font-family: 微软雅黑;
}

.nav-top figcaption {
  font-size: 16px;
  font-family: 微软雅黑;
}

.iconPage div {
  font-size: 16px;
  font-family: 微软雅黑;
  margin-top: 5px;
}

.iconPage p {
  font-size: 14px;
  font-family: 微软雅黑;
  color: #53d769;
}
</style>
