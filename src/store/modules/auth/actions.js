export default {
  logout({ commit }) {
    // remove from store
    commit("removeToken");
    // clear local storage
    localStorage.removeItem("user-token");
  }
};
