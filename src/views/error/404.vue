<template>
<div class="error-box">
  <div class="error-body text-center">
    <h1 class="error-title">404</h1>
    <h3>PAGE NOT FOUND !</h3>
    <p>YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
    <router-link :to="{ path: '/'}">Back to home</router-link>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss">
.error-box {
  // height: 100%;
  // position: fixed;
  @extend %full;
  width: 100%
}
.error-box .error-body {
  padding-top: 5%;
  padding-bottom: 5%;
  text-align: center;
  a {
    color: #ff7100;
    font-weight: bold;
  }
}
.error-box .error-title {
  font-size: 100px;
  font-weight: 900;
  text-shadow: 4px 4px 0 #fff,6px 6px 0 #343a40;
  line-height: 210px
}
</style>
