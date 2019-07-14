export default {
  setToken(state, jwt) {
    state.token = jwt;
  },
  removeToken(state) {
    state.token = "";
  }
};
