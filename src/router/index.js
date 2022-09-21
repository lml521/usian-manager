import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
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

export default router;
