import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import axios from 'axios'

import VueRouter from 'vue-router'
import routes from './router'





Vue.use(ElementUI)
Vue.use(VueRouter)


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.baseURL = 'http://localhost:9999/lottery';
//设置携带session，解决跨域
axios.defaults.withCredentials = true;

Vue.prototype.$http = axios;


const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',    //路由的模式
  routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

