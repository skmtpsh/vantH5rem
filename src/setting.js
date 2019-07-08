export default {
  // 超级管理员
  appId: '0000000000000000',
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false,
    asideLeft: []
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '主页',
          auth: false
        }
      }
    ]
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  }
}
