import Vue from 'vue'
import App from './App.vue'
import router from './config/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import './style/icon.scss';
import axios from './config/axiosConfig.js';
import Components from './components/global';
import echarts from 'echarts'
import china from 'echarts/map/json/china.json';
import store from './store'
// import 'echarts/map/js/china.js'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Components);  // 引入全局 组件
Vue.prototype.$http = axios;
echarts.registerMap('china', china);
Vue.prototype.$echarts = echarts
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
