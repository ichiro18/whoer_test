import Vue from "vue";
import Router from "vue-router";
import store from "@project_src/store";
// * Pages
import IndexPage from "@project_src/pages/IndexPage.vue";
import LoginPage from "@project_src/pages/LoginPage.vue";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      meta: { layout: "main", requiresAuth: true },
      component: IndexPage,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: "main", requiresAuth: false },
      component: LoginPage,
      beforeEnter: ifNotAuthenticated
    }
  ]
});
