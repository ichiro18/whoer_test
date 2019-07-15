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
    axios.interceptors.response.use(undefined, error => {
      return new Promise(() => {
        if (error.status === 401) {
          this.$store
            .dispatch("auth/refreshToken")
            .then(response => {
              console.log("token refreshed", response);
            })
            .catch(error => {
              console.error("token not refreshed. Logout", error);
              this.$router.push("/login");
            });
        }
        throw error;
      });
    });
  }
};
</script>
