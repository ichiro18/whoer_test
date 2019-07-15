<template>
  <header class="header">
    <router-link :to="{ name: index }" class="header__logo">
      <img src="../common/images/logo.png" alt="Logo" class="logo__img" />
      <span class="logo__title">Test Task</span>
    </router-link>
    <div class="header__nav">
      <lang-control class="header__lang" />
      <button class="header__logout" v-if="isAuth" @click="logOut">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </header>
</template>
<script>
import LangControl from "@project_src/components/LanguageControl.vue";

export default {
  name: "AppHeader",
  components: {
    langControl: LangControl
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  },
  methods: {
    logOut() {
      this.$store
        .dispatch("auth/logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
</script>
<style lang="scss">
@import "../common/styles/config/variables";
@import "../common/styles/config/functions";

.header {
  max-width: 1080px;
  margin: 0 auto 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: $dark-primary-text-color;
    .logo__img {
      max-height: 32px;
      margin-right: 10px;
    }
    .logo__title {
      font-size: 1.5rem; // 24 sp
      line-height: 2rem; // 32 sp
      font-weight: map_get($typography-font-weight-values, regular);
      letter-spacing: normal;
    }
  }
  .header__nav {
    display: flex;
    .header__logout {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      width: 32px;
      background-color: transparent;
      outline: none;
      border: none;
      margin-left: 15px;
      color: $dark-icon-color;
      cursor: pointer;
      &:hover,
      &:active {
        color: $primary-color;
      }
    }
  }
}
</style>
