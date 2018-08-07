import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import axios from 'axios'

import VueRouter from 'vue-router'
import routes from './router'


Vue.use(ElementUI)
Vue.use(VueRouter)

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8080/sell/';
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

