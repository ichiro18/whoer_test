<template>
  <h1>Hello {{ name }}</h1>
</template>
<script>
export default {
  name: "App",
  data: () => {
    return {
      name: "test"
    };
  }
};
</script>
