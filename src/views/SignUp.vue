<template>
  <div class="SignUpForm">
    <form @submit.prevent="submitSignUp">
      <input type="text" v-model="username" placeholder="아이디" />
      <input type="text" v-model="username" placeholder="닉네임" />
      <input type="password" v-model="password1" placeholder="비밀번호" />
      <input type="password" v-model="password2" placeholder="비밀번호 확인" />
      <input type="submit" value="회원가입" />
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
      nickname: "",
      password1: "",
      password2: ""
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    submitSignUp() {
      this.signUp({
        username: this.username,
        nickname: this.nickname,
        password1: this.password1,
        password2: this.password2
      })
        .then(() => this.$router.push({ name: "Login" }))
        .catch(({ message }) => (this.msg = message));
    }
  }
};
</script>

<style>
</style>