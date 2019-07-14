<template>
  <component :is="layout" />
</template>
<script>
const default_layout = "main";

export default {
  name: "App",
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
};
</script>
