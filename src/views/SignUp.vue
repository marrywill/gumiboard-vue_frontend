<template>
  <div class="SignUpForm">
    <form @submit.prevent="submitSignUp">
      <input type="text" v-model="username" placeholder="아이디" />
      <input type="text" v-model="nickname" placeholder="닉네임" />
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
      nickname: "",
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
          nickname: this.nickname,
          password: this.password1
        });
      } else {
        alert("비밀번호가 일치하지 않습니다");
      }
    }
  }
};
</script>

<style>
</style>