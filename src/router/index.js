import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "home",
  redirect:'/index',
  component: () => import("../views/HomeView.vue"),
  children: [
  // 首页
    {
      path: 'index',
      name: 'index',
      component: () => import("../views/nav/index.vue"),
      meta: {
        title:"首页"
      }
    },
    // member  会员管理
    {
      path: 'member',
      name: 'member',
      component: () => import("../views/nav/member.vue"),
      meta: {
        title:'会员管理'
      }
    },
    // supplier 供应商管理
    {
      path: 'supplier',
      name: 'supplier',
      component: () => import("../views/nav/supplier.vue"),
      meta: {
        title:'供应商管理'
      }
    },
    // goods  商品管理
    {
      path: 'goods',
      name: 'goods',
      component: () => import("../views/nav/goods.vue"),
      meta: {
        title:'商品管理'
      }
    },
    //员工管理
    {
      path: 'staff',
      name: 'staff',
      component: () => import("../views/nav/staff.vue"),
      meta: {
        title:'员工管理'
      }
    },
    ]
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
  },
];

const router = new VueRouter({
  routes,
});

// 路由守卫
// router.beforeEach((to, form, next) => {
//   if (localStorage.getItem("token") || to.path == '/login') {
//     next()
//   } else {
//     next('/login')
//   }
// })

export default router;