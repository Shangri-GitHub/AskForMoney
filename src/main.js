// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './router'
import utils from './utils/Utils'
import echarts from 'echarts'


Vue.use(ELEMENT)
Vue.use(VueRouter)

Vue.prototype.$http = utils.httpInit();
Vue.prototype.$WebSocket = utils.webSocketInit;
Vue.prototype.$echarts = echarts;
const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',    //路由的模式
  routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
