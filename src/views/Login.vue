<template>
  <div class="loginForm">
    <form @submit.prevent="submitLogin">
      <input type="text" v-model="username" />
      <input type="password" v-model="password" />
      <input type="submit" value="Login" />
    </form>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      msg: "",
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
      })
        .then(() => this.$router.go(-1))
        .catch(({ message }) => (this.msg = message));
    }
  }
};
</script>

<style>
</style>