import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: HomeView,
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
router.beforeEach((to, form, next) => {
  if (localStorage.getItem("token") || to.path == '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router;