<template>
  <div>
    <span>{{ isAuthenticated }}</span>
    {{ user }}
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.loginUser;
    }
  }
};
</script>

<style>
</style>