// 菜单 侧边栏
export default [
  { path: '/index', key: 'index', ico: 'home', title: '主页', children: [] },
  {
    path: '/info',
    ico: 'center',
    key: 'info',
    title: '信息录入',
    children: [
      {
        path: 'input',
        ico: 'list',
        key: 'input',
        title: '债转信息录入',
        children: []
      },
      {
        path: 'check',
        ico: 'field',
        key: 'check',
        title: '信息审核',
        children: []
      }
    ]
  },
  // {
  //   path: '/contract',
  //   ico: 'center',
  //   key: 'contract',
  //   title: '合同管理',
  //   children: [
  //     {
  //       path: 'query',
  //       ico: 'field',
  //       key: 'query',
  //       title: '合同查询',
  //       children: []
  //     }
  //   ]
  // },
  {
    path: '/order',
    ico: 'center',
    key: 'order',
    title: '订单管理',
    children: [
      {
        path: 'orderquery',
        ico: 'field',
        key: 'orderquery',
        title: '清单查询',
        children: []
      }
    ]
  }
]
