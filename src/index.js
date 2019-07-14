// * Global
import Vue from "vue";
import App from "@project_src/App.vue";
import router from "@project_src/routes";
import axios from "axios";
import i18n from "vue-i18n";
import store from "@project_src/store";
// * Styles
import "@project_src/common/styles/theme.scss";
// * Layout
import MainLayout from "@project_src/layouts/MainLayout.vue";

// register layout
Vue.component("main-layout", MainLayout);

// register api
axios.defaults.baseURL = "https://test.whteam.net";

// Register i18n
Vue.use(i18n);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
