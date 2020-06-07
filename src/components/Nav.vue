<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <span class="auth" v-if="!isAuthenticated">
      <router-link to="/signup">SignUp</router-link>|
      <router-link to="/login">Login</router-link>
    </span>
    <a href v-else @click.prevent="logOutClick">Logout</a>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    ...mapActions(["logout"]),
    logOutClick() {
      this.logout();
    }
  }
};
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>