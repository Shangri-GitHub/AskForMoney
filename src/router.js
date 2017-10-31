// 引用模版
import login from "./components/login.vue";
import nav from "./components/nav.vue";
import search from "./components/search.vue";
import table from "./components/table.vue";
import queryPage1 from "./components/QueryPage1.vue";
import queryPage2 from "./components/QueryPage2.vue";
import queryPage3 from "./components/QueryPage3.vue";

// 配置路由
export default [
  {
    path: '/',
    component: login
  },
  {
    path: '/nav',
    component: nav,
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
      }
    ]
  }
]
