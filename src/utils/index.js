import db from './utils.db'
import query from './utils.commonQuery'
import cookies from './utils.cookies'
import log from './utils.log'

const util = {
  db,
  query,
  cookies,
  log,
  tag: {
    local: 'Hm-Ps',
    cooki: 'Hm-ps'
  }
}
/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || '后台管理系统'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}
/**
 * @description 导出
 * @param {String} title 标题
 */
util.exportExcel = (data) => {
  var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
  var url = window.URL.createObjectURL(blob)
  var aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.href = url
  aLink.setAttribute('download', `导出数据.xls`)
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink) // 下载完成移除元素
  window.URL.revokeObjectURL(url) // 释放掉blob对象
}

export default util
