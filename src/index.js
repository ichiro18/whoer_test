// * Global
import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
// * Styles
import "./common/styles/theme.scss";
// * Layout
import MainLayout from "./layouts/MainLayout.vue";

// register layout
Vue.component("main-layout", MainLayout);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
