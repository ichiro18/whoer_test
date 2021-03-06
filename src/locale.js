import Vue from "vue";
import VueI18n from "vue-i18n";

// Register i18n
Vue.use(VueI18n);

export default new VueI18n({
  locale: localStorage.getItem("locale") || "en",
  fallbackLocale: "en"
});
