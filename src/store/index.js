import Vue from "vue";
import Vuex from "vuex";
// Modules
import AuthModule from "@project_src/store/modules/auth";

Vue.use(Vuex);

const state = {
  locale: localStorage.getItem("locale") || "en"
};

const mutations = {
  setLocale: (state, { locale }) => {
    state.locale = locale;
  }
};

const actions = {
  changeLocale: ({ commit }, { locale }) => {
    commit("setLocale", { locale });
  }
};

const getters = {
  getLocale: state => state.locale
};

export default new Vuex.Store({
  strict: false,
  state,
  mutations,
  actions,
  getters,
  modules: {
    auth: AuthModule
  }
});
