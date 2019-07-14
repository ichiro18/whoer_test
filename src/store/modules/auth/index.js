import state from "@project_src/store/modules/auth/state";
import getters from "@project_src/store/modules/auth/getters";
import actions from "@project_src/store/modules/auth/actions";
import mutations from "@project_src/store/modules/auth/mutations";

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
