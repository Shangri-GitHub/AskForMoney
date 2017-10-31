import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import VueRouter from 'vue-router'
import routes from './router'


Vue.use(ElementUI)
Vue.use(VueRouter)


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