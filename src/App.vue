<template>
  <component :is="layout" />
</template>
<script>
import axios from "axios";
const default_layout = "main";

export default {
  name: "App",
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  created() {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.log(error.response);
        return new Promise((resolve, reject) => {
          if (error.response && error.response.status === 401) {
            this.$store
              .dispatch("auth/refreshToken")
              .then(response => {
                console.log("token refreshed", response);
                resolve();
              })
              .catch(error => {
                console.error("token not refreshed. Logout", error);
                this.$router.push("/login");
                reject(error);
              });
          }
          reject(error);
        });
      }
    );
  }
};
</script>
