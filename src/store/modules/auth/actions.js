import axios from "axios";

export default {
  logout({ commit }) {
    return new Promise(resolve => {
      // remove from store
      commit("removeToken");
      // clear local storage
      localStorage.removeItem("user-token");
      // clear header
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      axios({
        url: "/v2/my-session",
        method: "post",
        data: {
          username: username,
          password: password
        }
      })
        .then(response => {
          // parse data
          const token = response.headers["x-access-token"];
          const expires = response.headers["x-access-expires"];
          const session = response.data;

          // save to localStorage
          localStorage.setItem("user-token", token);
          // add to store
          commit("setToken", { token, expires, session });
          // add header
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;

          resolve(response);
        })
        .catch(error => {
          // remove from store
          commit("removeToken");
          // clear local storage
          localStorage.removeItem("user-token");
          // clear header
          delete axios.defaults.headers.common["Authorization"];
          reject(error);
        });
    });
  }
};
