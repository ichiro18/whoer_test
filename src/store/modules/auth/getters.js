export default {
  isAuthenticated: state => !!state.token,
  token: state => state.token
};
