import Vue from "vue";
import Vuex from "vuex";
// Modules
import AuthModule from "@project_src/store/modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  modules: {
    auth: AuthModule
  }
});
