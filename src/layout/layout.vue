<template>
  <div class="ps-layout">
    <!-- <div class="ps-layout-mask" flex="main:center cross:center" v-if="!Object.keys(userinfo).length">正在加载资源..</div> -->
    <div class="ps-layout-aside-content" flex="dir:top">
      <div class="ps-theme-header" flex-box="0" flex>
        <div class="logo" flex="main:center cross:center" flex-box="0" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}">
          <router-link tag="a" to="/">
            <img v-if="asideCollapse" :src="require(`@/assets/logo_login2.png`)" style="width:30px;"/>
            <img v-else :src="require(`@/assets/logo.png`)" style="width:80px;"/>
          </router-link>
        </div>
        <div class="toggle-aside-btn" flex-box="0"  @click="handleToggleAside" >
          <svg-icon icon-class="toggle" />
        </div>
        <div class="ps-theme-header-menu" flex-box="1" style="text-align:right;">
          <!-- <ps-header-full /> -->
        </div>
        <div class="ps-header-right" flex-box="0">
          <ps-header-full />
          <ps-header-user/>
        </div>
      </div>
      <div class="ps-theme-container" flex-box="1" flex>
        <div flex-box="0" class="ps-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth
          }"
        >
          <ps-menu-side />
        </div>
        <div flex-box="1" flex class="ps-theme-container-main">
          <transition name="fade-scale">
            <div class="ps-theme-container-main-layer" flex="dir:top">
              <div class="ps-theme-container-main-header" flex-box="0">
                <ps-Tabs />
              </div>
              <div class="ps-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import psTabs from './components/tabs'
import psMenuSide from './components/menu-side'
import psHeaderUser from './components/header-user'
import psHeaderFull from './components/header-fullscreen'
// import psHeaderXterm from './components/header-xterm'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'layout',
  components: {
    psTabs,
    psMenuSide,
    psHeaderUser,
    psHeaderFull
  },
  data () {
    return {
      asideWidth: '200px',
      asideWidthCollapse: '65px'
    }
  },
  computed: {
    ...mapState({
      keepAlive: state => state.page.keepAlive,
      asideCollapse: state => state.menu.asideCollapse
    }),
    transitionActive () {
      return true
    },
    keepAlive () {
      return []
    }
  },
  methods: {
    ...mapActions('menu', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside () {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
</style>
