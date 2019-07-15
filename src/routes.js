import Vue from "vue";
import Router from "vue-router";
import store from "@project_src/store";
// * Pages
import IndexPage from "@project_src/pages/IndexPage.vue";
import LoginPage from "@project_src/pages/LoginPage.vue";
import Create from "@project_src/pages/translation/CreateTranslationPage.vue";
import Read from "@project_src/pages/translation/ReadTranslationPage.vue";
import Update from "@project_src/pages/translation/UpdateTranslationPage.vue";
import Delete from "@project_src/pages/translation/DeleteTranslationPage.vue";

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
    },
    {
      path: "/translation",
      name: "create",
      meta: { layout: "main", requiresAuth: true },
      component: Create,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/translation/:id/read",
      name: "read",
      meta: { layout: "main", requiresAuth: true },
      component: Read,
      beforeEnter: ifAuthenticated,
      props: true
    },
    {
      path: "/translation/:id/update",
      name: "update",
      meta: { layout: "main", requiresAuth: true },
      component: Update,
      beforeEnter: ifAuthenticated,
      props: true
    },
    {
      path: "/translation/:id/delete",
      name: "delete",
      meta: { layout: "main", requiresAuth: true },
      component: Delete,
      beforeEnter: ifAuthenticated,
      props: true
    }
  ]
});
