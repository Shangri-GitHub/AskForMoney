// 引用模版
import login from "./components/login.vue";
import nav from "./components/nav.vue";
import search from "./components/search.vue";
import queryPage1 from "./components/QueryPage1.vue";
import queryPage2 from "./components/QueryPage2.vue";
import queryPage3 from "./components/QueryPage3.vue";
import romantic_page from "./components/romantic_page.vue";
import wiki_page from "./components/wiki_page.vue";
import photowall from "./components/photowall.vue";
import ResumeEdite from "./components/ResumeEdite.vue";
import order from "./components/order.vue";
import productList from "./components/ProductList.vue";
import category from "./components/category.vue";
import orderList from "./components/goods/list.vue";

// 配置路由
export default [
  {
    path: '/',
    component: login
  },
  {
    path: '/nav',
    component: nav,
    redirect:'/nav/order',
    children: [
      {
        path: '/nav/queryPage1',
        component: queryPage1
      },
      {
        path: '/nav/queryPage2',
        component: queryPage2
      },
      {
        path: '/nav/queryPage3',
        component: queryPage3
      },
      {
        name:'search',
        path: '/nav/search',
        component: search
      },
      {
        path: '/nav/romantic_page',
        component: romantic_page
      },
      {
        path: '/nav/wiki_page',
        component: wiki_page
      },
      {
        path: '/nav/photowall',
        component: photowall
      },
      {
        path: '/nav/ResumeEdite',
        component: ResumeEdite
      },
      {
        path: '/nav/order',
        component: order
      },
      {
        path: '/nav/productList',
        component: productList
      },
      {
        path: '/nav/category',
        component: category
      },
      {
        path: '/nav/order/detail',
        component: orderList
      }

    ]
  }
]

