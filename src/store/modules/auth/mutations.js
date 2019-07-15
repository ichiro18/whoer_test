export default {
  setToken(state, { token, expires, session }) {
    state.token = token;
    state.token_expires = expires;
    state.session.id = session.id;
    state.session.secret = session.secret;
    state.session.active = !!session.active;
    state.session.expires = session.expires;
    state.session.created = session.created;
    state.session.updated = session.updated;
  },
  removeToken(state) {
    state.token = "";
    state.token_expires = null;
    state.session.id = null;
    state.session.secret = null;
    state.session.active = false;
    state.session.expires = null;
    state.session.created = null;
    state.session.updated = null;
  }
};
