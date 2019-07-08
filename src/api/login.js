import request from '@/plugin/axios'
import util from '@/utils/index'

const pageQuery = () => {
  return Object.assign({}, util.query())
}

/**
 * @class 登录接口
*/
export const AccountLogin = ({
  username = 'wangshan',
  password = '123456'
}) => {
  return request({
    url: 'login/submit',
    method: 'post',
    data: Object.assign({
      username,
      password
    }, pageQuery())
  })
}

const loginApi = {
  AccountLogin
}
export default loginApi
