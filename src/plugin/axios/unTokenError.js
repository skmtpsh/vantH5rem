import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import util from '@/utils/index'

// 创建一个 axios 实例

// 创建一个错误
function errorCreate (msg) {
  const err = new Error(msg)
  errorLog(err)
  // throw err
}
// 退出
async function logout () {
  // 清空 vuex 用户信息
  // store.dispatch('user/set', {}, { root: true })
  let info = store.state.user.info
  // 清空store
  store.dispatch('db/dataClear', { user: true }, { root: true })
  // 删除cookie
  util.cookies.remove('token')
  util.cookies.remove('uuid')
  if (info.type === 'sso') {
    let ssoUrl = process.env['VUE_APP_' + process.env.VUE_APP_ENV + '_SSO']
    window.location.replace(ssoUrl)
    return false
  }
  // 跳转路由
  router.app.$router.push({
    name: 'login'
  })
}

// 记录和显示错误
function errorLog (err) {
  // 添加到日志
  // store.dispatch('log/push', {
  //   message: '数据请求异常',
  //   type: 'danger',
  //   meta: {
  //     err
  //   }
  // })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(err)
  }
  // 显示提示
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  })
  // return false
}

export default {
  logout,
  errorCreate,
  errorLog
}
