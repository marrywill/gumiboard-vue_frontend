<template>
  <div class="SignUpForm">
    <form @submit.prevent="submitSignUp">
      <input type="text" v-model="username" placeholder="아이디" />
      <input type="password" v-model="password1" placeholder="비밀번호" />
      <input type="password" v-model="password2" placeholder="비밀번호 확인" />
      <input type="submit" value="회원가입" />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password1: "",
      password2: ""
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    submitSignUp() {
      if (this.password1 === this.password2) {
        this.signUp({
          username: this.username,
          password1: this.password1,
          password2: this.password2
        });
        this.$router.push({ name: "Login" });
      } else {
        alert("비밀번호가 일치하지 않습니다");
      }
    }
  }
};
</script>

<style>
</style>