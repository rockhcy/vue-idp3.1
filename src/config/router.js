import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layouts/index.vue'
import Login from '../views/login/index'
import Home from '../views/home/index'
import userAdmin from '../views/userAdmin/index'
import departmentAdmin from '../views/departmentAdmin/index'
import terminalAdmin from '../views/terminalAdmin/index'
import scheduledTask from '../views/scheduledTask/index'
import monitoring from '../views/monitoring/index'
import adduser from '@/views/userAdmin/userInfo'

Vue.use(Router)


export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    }
    ,
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/home/index',
          name: '/home/index',
          component: Home,

        },
        {
          path: '/userAdmin/index',
          name: '/userAdmin/index',
          component: userAdmin,
          children: [
            {
              path: '/userAdmin/adduser',
              name: '/userAdmin/adduser',
              component: adduser,
            }
          ]

        },
        {
          path: '/departmentAdmin/index',
          name: '/departmentAdmin/index',
          component: departmentAdmin,

        },
        {
          path: '/terminalAdmin/index',
          name: '/terminalAdmin/index',
          component: terminalAdmin,

        },
        {
          path: '/monitoring/index',
          name: '/monitoring/index',
          component: monitoring,

        },
        {
          path: '/scheduledTask/index',
          name: '/scheduledTask/index',
          component: scheduledTask,

        }
      ]
    }
  ]
})
//解决重复点击导航路由报错解决方法，该问题不会影响项目运行，但是会有一个错误提示
//提示：Error: Avoided redundant navigation to current location:
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}