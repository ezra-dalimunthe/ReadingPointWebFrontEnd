<template>
  <router-view />
</template>
<script>
export default {
  name: "BaseLayout",
  mounted() {
    console.log(this.$store.getters.isAuthenticated);
  },
};
</script>
