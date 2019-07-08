import Vue from 'vue'
import App from './App.vue'
// store
import store from './store/index'
// 核心插件
import allPlugin from '@/plugin'
// 菜单和路由设置
import router from './router'
// import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
import filters from './filters'
// 可选组件
import VCharts from 'v-charts'

// 核心插件
Vue.use(allPlugin)

// 可选插件
Vue.use(VCharts)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('page/init', frameInRoutes)
    // 设置侧边栏菜单
    // this.$store.commit('menu/asideSet', menuAside)
  },
  mounted () {
    // 设置侧边栏菜单
    this.$store.dispatch('menu/asideLeftGet')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('account/load').then(() => {
    })
    // 获取并记录用户 UA
    this.$store.commit('ua/get')
    // 初始化全屏监听
    this.$store.dispatch('fullscreen/listen')
  }
}).$mount('#app')
