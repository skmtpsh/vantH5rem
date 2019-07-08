import store from '@/store'
import axios from 'axios'
import util from '@/utils/index'
import unTokenError from './unTokenError'

/**
 * @class 上传请求接口
*/
const postAjx = ({
  fileObj = '',
  reqUrl = ''
}) => {
  let param = new FormData()
  param.append('timestamp', util.query().timestamp)
  param.append('signSystem', util.query().signSystem)
  param.append('appId', store.state.user.info.appId)
  param.append('file', fileObj.file)
  param.append('tokenKey', util.cookies.get('token'))

  return new Promise((resolve, reject) => {
    axios.post(
      `${process.env['VUE_APP_' + process.env.VUE_APP_ENV + '_API']}${reqUrl}`,
      param,
      {}
    ).then(function (response) {
      const dataAxios = response.data
      const { code } = dataAxios
      switch (code) {
        case 200:
          resolve(dataAxios)
          break
        case 1200:
          // token失效
          unTokenError.logout()
          unTokenError.errorCreate(`${dataAxios.message}`)
          return Promise.reject(new Error(dataAxios.message))
        case 400:
        case 500:
        case 1100:
          unTokenError.errorCreate(`${dataAxios.message}`)
          resolve(dataAxios)
          break
        default:
          unTokenError.errorCreate(`${dataAxios.message}`)
          // return dataAxios.code
          return Promise.reject(new Error(dataAxios.code))
          // break
      }
    }).catch(function (error) {
      return reject(error)
    })
  })
}

export default postAjx
