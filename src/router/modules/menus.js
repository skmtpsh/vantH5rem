import layOut from '@/layout'
import menuAside from '@/menu/aside'
console.log(menuAside)

const meta = { auth: true }
export default [
  {
    path: '/info',
    name: 'info',
    meta,
    redirect: { name: 'info-page' },
    component: layOut,
    children: (pre => [
      { path: 'input', name: `${pre}page-input`, component: () => import('@/views/debt-info/input'), meta: { ...meta, title: '债转信息录入' } },
      { path: 'check', name: `${pre}page-check`, component: () => import('@/views/debt-info/check'), meta: { ...meta, title: '信息审核' } },
      { path: 'excellist', name: `${pre}page-list`, component: () => import('@/views/debt-info/excelList'), meta: { ...meta, title: '清单列表' } }
    ])('info-')
  },
  {
    path: '/contract',
    name: 'contract',
    meta,
    redirect: { name: 'contract-page' },
    component: layOut,
    children: (pre => [
      // { path: 'manage', name: `${pre}page-create`, component: () => import('@/views/debt-contract/create'), meta: { ...meta, title: '合同管理' } },
      { path: 'query', name: `${pre}page-query`, component: () => import('@/views/debt-contract/query'), meta: { ...meta, title: '借款合同查询' } }
    ])('contract-')
  },
  {
    path: '/order',
    name: 'order',
    meta,
    redirect: { name: 'order-page' },
    component: layOut,
    children: (pre => [
      { path: 'orderquery', name: `${pre}page-orderlist`, component: () => import('@/views/debt-order/orderList'), meta: { ...meta, title: '订单查询' } }
      // { path: 'orderpic', name: `${pre}page-orderPic`, component: () => import('@/views/debt-order/orderPic'), meta: { ...meta, title: '查看图片' } }
    ])('order-')
  }
]
