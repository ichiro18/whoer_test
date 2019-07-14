<template>
  <header class="header">
    <a href="/" class="header__logo">
      <img src="../common/images/logo.png" alt="Logo" class="logo__img" />
      <span class="logo__title">Test Task</span>
    </a>
    <lang-control class="header__lang" />
  </header>
</template>
<script>
import LangControl from "@project_src/components/LanguageControl.vue";

export default {
  name: "AppHeader",
  components: {
    langControl: LangControl
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
}
</style>
