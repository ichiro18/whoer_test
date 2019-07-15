// * Global
import Vue from "vue";
import axios from "axios";
import App from "@project_src/App.vue";
import router from "@project_src/routes";
import store from "@project_src/store";
import i18n from "@project_src/locale";
// * Styles
import "@project_src/common/styles/theme.scss";
// * Layout
import MainLayout from "@project_src/layouts/MainLayout.vue";

// register layout
Vue.component("main-layout", MainLayout);

// register api
axios.defaults.baseURL = "https://test.whteam.net";
const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

// Navigate hooks
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters["auth/isAuthenticated"]) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
