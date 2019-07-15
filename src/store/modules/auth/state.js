export default {
  token: localStorage.getItem("user-token") || "",
  token_expires: null,
  session: {
    id: null,
    secret: null,
    active: false,
    expires: null,
    created: null,
    updated: null
  }
};
