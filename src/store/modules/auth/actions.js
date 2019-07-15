import axios from "axios";

export default {
  logout({ commit }) {
    return new Promise(resolve => {
      // remove from store
      commit("removeToken");
      // clear local storage
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-session");
      localStorage.removeItem("user-session-secret");
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
          localStorage.setItem("user-session", session.id);
          localStorage.setItem("user-session-secret", session.secret);
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
          localStorage.removeItem("user-session");
          localStorage.removeItem("user-session-secret");
          // clear header
          delete axios.defaults.headers.common["Authorization"];
          reject(error);
        });
    });
  },
  refreshToken({ state, commit }) {
    return new Promise((resolve, reject) => {
      const id = state.session.id || localStorage.getItem("user-session");
      const secret =
        state.session.secret || localStorage.getItem("user-session-secret");
      if (id && secret) {
        axios({
          url: "/v2/my-session/" + id + "/refresh",
          method: "put",
          data: {
            secret: secret
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
            // clear local storage
            localStorage.removeItem("user-token");
            localStorage.removeItem("user-session");
            localStorage.removeItem("user-session-secret");
            // clear header
            delete axios.defaults.headers.common["Authorization"];
            reject(error);
          });
      } else {
        reject();
      }
    });
  }
};
