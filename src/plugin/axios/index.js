import axios from 'axios'
import unTokenError from './unTokenError'

const service = axios.create({
  baseURL: process.env['VUE_APP_' + process.env.VUE_APP_ENV + '_API'],
  timeout: 30000, // request timeout,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    // const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['X-Token'] = token
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 200:
          // [ 示例 ] code === 200 代表没有错误
          return dataAxios.datas
          // break
        case 1200:
          // console.log(typeof dataAxios.datas)
          // [ 示例 ] token失效
          unTokenError.logout()
          unTokenError.errorCreate(`${dataAxios.message}`)
          // let err = new Error(dataAxios.message)
          // console.log(err)
          break
          // return Promise.reject(err)
        // case 1100:
        //   // [ 示例 ] 其它Error
        //   unTokenError.errorCreate(`${dataAxios.message}`)
        //   // return Promise.reject(new Error(dataAxios.message))
        //   // return dataAxios.datas
        //   // break
        // case 1100:
          // unTokenError.errorCreate(`${dataAxios.message}`)
        default:
          // 不是正确的 code
          unTokenError.errorCreate(`${dataAxios.message}`)
          // return dataAxios.code
          // return Promise.reject(dataAxios.code)
          break
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    unTokenError.errorLog(error)
    return Promise.reject(error)
  }
)

export default service
