<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <div flex="dir:top main:justify cross:center box:justify" class="page-login--content">
        <div></div>
        <div flex="main:center cross:center" class="page-login--content-main">
          <div class="page-login--form">
            <div class="form-head">
              <div class="form-header">
                <img :src="require(`@/assets/logo.png`)" class="page-login--logo" />
                <p>债转 1.0 管理系统</p>
                <!-- <p class="page-login--content-motto">时间是一切财富中最宝贵的财富。 <span>—— 德奥弗拉斯多</span></p> -->
              </div>
            </div>
            <div class="form-content">
              <el-form ref="loginForm" class="login-form" :model="loginForm" :rules="loginRules"> <!--:rules="loginRules"-->
                <el-form-item prop="username" label="登录用户">
                  <el-input type="text" v-model="loginForm.username" placeholder="用户名" @keyup.enter.native='handleLogin'>
                    <i slot="prepend" class="el-icon-mobile-phone"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password" label="登录密码">
                  <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.enter.native='handleLogin'>
                    <i slot="prepend" class="el-icon-view"></i>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin" style="width:100%">立即登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-copyright">
            Copyright 2019 青岛翼租租赁投资有限公司
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      loginForm: {
        username: '',
        password: '',
        checkcode: ''
      },
      imgsrc: '',
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, min: 3, max: 30, message: '密码长度在 2 到 30 个字符', trigger: 'blur' }]
      },
      loading: false
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('account', [
      'login'
    ]),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login({
            vm: this,
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || '/')
          })
        } else {
          // this.$message.error('表单校验失败')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.page-login {
  // @extend %unable-select;
  $backgroundColor: #F0F2F5;
  $backgroundColorWhite: rgba(255, 255,255, 1);
  // ---
  background: url(../../assets/bg-pattern-light.svg) no-repeat center center;
  // background-color: $backgroundColor;
  background-size: cover;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  .page-login--content-motto {
    color: $color-text-normal;
    font-size: 12px;
    span {
      color: $color-text-sub;
    }
  }
  .form-head {
    background:#409EFF;
    padding: 20px 10px 10px;
    color: #fff;
  }
  // main
  .form-content {
    padding: 2rem !important;
    background: $backgroundColorWhite;
    // border-radius: 10px;
    // box-shadow: 0 0 13px #fff;
  }
  .form-header {
    margin: 0 0;
    text-align: center;
  }
  // 登录表单
  .page-login--form {
    width: 400px;
    margin: 1rem 0;
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
  }
}
</style>
