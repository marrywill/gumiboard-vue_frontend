<template>
  <div>
    <span>{{ isAuthenticated }}</span>
    {{ user }}
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    this.getUser();
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.loginUser;
    }
  },
  methods: {
    ...mapActions(["getLoginUser"]),
    getUser() {
      if (this.isAuthenticated) {
        this.getLoginUser();
      }
    }
  }
};
</script>

<style>
</style>