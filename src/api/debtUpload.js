import reqPost from '@/plugin/axios/post'
import request from '@/plugin/axios'

import util from '@/utils/index'
import store from '@/store'

const pageQuery = () => {
  return Object.assign({}, util.query(), { tokenKey: util.cookies.get('token'), appId: store.state.user.info.appId })
}

/**
 * @class 下载Excel接口
*/
export const downLoadExcel = () => {
  return request({
    url: 'file/download',
    method: 'post',
    data: Object.assign({
    }, pageQuery())
  })
}

/**
 * @class 债转清单录入接口
 */
export const upLoadDebtListForm = (
  fileObj = ''
) => {
  return reqPost({
    reqUrl: 'file/upload/debtlist',
    fileObj
  })
}

/**
 * @class 影像资料录入接口
 */
export const upLoadDebtPicture = (
  fileObj = ''
) => {
  return reqPost({
    reqUrl: 'file/upload/pictures',
    fileObj
  })
}

const debtUploadApi = {
  downLoadExcel,
  upLoadDebtListForm,
  upLoadDebtPicture
}
export default debtUploadApi
