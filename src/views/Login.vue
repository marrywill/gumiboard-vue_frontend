<template>
  <div class="loginForm">
    <form @submit.prevent="submitLogin">
      <input type="text" v-model="username" />
      <input type="password" v-model="password" />
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    submitLogin() {
      this.login({
        username: this.username,
        password: this.password
      });
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style>
</style>