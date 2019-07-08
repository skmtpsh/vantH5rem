import Vue from 'vue'
import SvgIcon from './svgIcon'// svg组件
import psContainer from './container'// svg组件
import percentBar from './percent'// svg组件

// register globally <svg-icon icon-class="cate" />
Vue.component('svg-icon', SvgIcon)
Vue.component('ps-container', psContainer)
Vue.component('percent-bar', percentBar)
