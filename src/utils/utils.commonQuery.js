import dayjs from 'dayjs'
import md5 from 'js-md5'

export const getParam = (name) => {
  var search = document.location.search
  var pattern = new RegExp('[?&]' + name + '\\=([^&]+)', 'g')
  var matcher = pattern.exec(search)
  var items = null
  if (matcher !== null) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]))
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1])
      } catch (e) {
        items = matcher[1]
      }
    }
  }
  return items
}

export const getAppKey = (appId) => {
  const AppSet = [
    {
      id: 'yipurse123456789',
      key: '65dd5436adee6260cfd141dc5ecf5f2e'
    }
  ]
  return AppSet.filter(item => {
    if (item.id === appId) {
      return item
    }
  })
}

// 公用CommonQuery
export const commonQuery = () => {
  let AppKey = ''
  // 根据传参获取appId
  // let AppID = getParam('appId')
  // 临时用固定appId
  let appId = 'yipurse123456789'
  if (getAppKey(appId).length === 0) {
    console.log('not find key')
    return false
  }
  AppKey = getAppKey(appId)[0].key

  let TimeStamp = dayjs(Date.now()).format('YYYYMMDDHHmmss')
  // let SignSystem = md5(AppKey + appId + TimeStamp)
  let SignSystem = md5(AppKey + TimeStamp)

  return {
    // appKey: AppKey,
    appId,
    timestamp: TimeStamp,
    signSystem: SignSystem
  }
}
/**
 * 公用UrlQuery
*/
// let URL = location.search
// const urlQuery = ({
//   token = '',
//   type = '',
//   platform = '',
//   mobile = ''
// } = querystring.parse(URL.indexOf('?') !== -1 ? URL.substr(1) : '')) => {
//   return {
//     token,
//     type,
//     platform,
//     mobile
//   }
// }

const requestQuery = () => {
  // return Object.assign(urlQuery(), commonQuery())
  return Object.assign({}, commonQuery())
}

export default requestQuery
