<template>
  <div class="ps-theme-header" flex-box="0" flex>
    <div class="logo" flex="main:center cross:center" flex-box="0" :style="{width: asideWidth}">
      <router-link tag="a" to="/"><img :src="require(`@/assets/logo_login.png`)" style="width:80px;"/></router-link>
    </div>
    <div class="toggle-aside-btn" flex-box="0">
      <svg-icon icon-class="toggle" />
    </div>
    <div class="ps-theme-header-menu" flex-box="1"></div>
    <div class="ps-header-right" flex-box="0">
      <ps-header-user/>
    </div>
  </div>
</template>
<script>
import psHeaderUser from '../header-user'
export default {
  name: 'header-group',
  components: {
    psHeaderUser
  }
}
</script>
