import Vue from "vue";
import Router from "vue-router";

// * Pages
import IndexPage from "./pages/IndexPage.vue";
import LoginPage from "./pages/LoginPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      meta: { layout: "main", requiresAuth: true },
      component: IndexPage
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: "main", requiresAuth: false },
      component: LoginPage
    }
  ]
});
