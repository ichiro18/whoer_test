<template>
  <div class="main-layout">
    <app-header />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "@project_src/components/AppHeader.vue";

export default {
  name: "MainLayout",
  components: {
    appHeader: Header
  }
};
</script>
<style lang="scss">
.main-layout {
  padding: 40px 0;
  .content {
    max-width: 1080px;
    margin: 0 auto;
  }
}
</style>
