<template>
  <div class="page-login">
    <span v-loading.fullscreen.lock="fullscreenLoading"></span>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        logtype: 'sso'
      },
      fullscreenLoading: false
    }
  },
  created () {
    this.loginForm.username = this.$route.query.user
    this.loginForm.password = this.$route.query.password.slice(6)
    if (!this.loginForm.username) {
      this.$message.warning({
        message: '用户名不能为空'
      })
      return false
    }
    if (!this.loginForm.password) {
      this.$message.warning({
        message: '密码不能为空'
      })
      return false
    }
    this.handleLogin()
  },
  methods: {
    ...mapActions('account', [
      'login'
    ]),
    handleLogin () {
      this.login({
        vm: this,
        username: this.loginForm.username,
        password: this.loginForm.password,
        logtype: this.loginForm.logtype
      }).then(() => {
        // 重定向对象不存在则返回顶层路径
        this.$router.replace(this.$route.query.redirect || '/')
      })
    }
  }
}
</script>
