// 设置文件
import setting from '@/setting.js'
import path from 'path'

// 获取父目录Path
const getParentPath = (data, key, indexArray) => {
  let arr = Array.from(indexArray)
  for (let i = 0, len = data.length; i < len; i++) {
    arr.push(data[i].href)
    if (data[i].href === key) {
      return arr
    }
    let children = data[i].children
    if (children && children.length) {
      let result = getParentPath(children, key, arr)
      if (result) return result
    }
    arr.pop()
  }
  return false
}
// 无限获取目录树
const getAllJson = (json, allJson) => {
  let arrs = []
  if (!Array.isArray(json)) {
    return []
  }
  for (let item of json) {
    let pathRoute = path.resolve(process.cwd(), ...getParentPath(allJson, item.href, []))
    if (item.children && item.children.length > 0) {
      arrs.push({
        path: pathRoute,
        key: item.href,
        ico: item.icon,
        title: item.name,
        children: getAllJson(item.children, allJson)
      })
    } else {
      arrs.push({
        path: pathRoute,
        key: item.href,
        ico: item.icon,
        title: item.name,
        children: []
      })
    }
  }
  return arrs
}

export default {
  namespaced: true,
  state: {
    // 顶栏菜单
    header: [],
    // 侧栏菜单
    aside: setting.menu.asideLeft,
    // 侧边栏收缩
    asideCollapse: setting.menu.asideCollapse
  },
  actions: {
    /**
     * 设置侧边栏
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     */
    asideLeftSet ({ state, dispatch, commit }, { asideMenu }) {
      return new Promise(async resolve => {
        // 从数据库获取左侧菜单
        let leftMenu = getAllJson(asideMenu, asideMenu)
        console.log(leftMenu)
        // 持久化
        await dispatch('db/set', {
          dbName: 'sys',
          path: 'menu.asideMenu',
          value: leftMenu,
          user: true
        }, { root: true })
        commit('asideSet', leftMenu)
        // end
        resolve()
      })
    },
    /**
     * 获取侧边栏
     * @param {Object} state vuex state
     * @param {Boolean} asideLeft is collapse
     */
    asideLeftGet ({ state, dispatch }) {
      return new Promise(async resolve => {
        // 持久化
        state.aside = await dispatch('db/get', {
          dbName: 'sys',
          path: 'menu.asideMenu',
          defaultValue: setting.menu.asideLeft,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = !state.asideCollapse
        // 持久化
        await dispatch('db/set', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          value: state.asideCollapse,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    asideCollapseLoad ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = await dispatch('db/get', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          defaultValue: setting.menu.asideCollapse,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 设置顶栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    headerSet (state, menu) {
      // store 赋值
      state.header = menu
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet (state, menu) {
      // store 赋值
      state.aside = menu
    }
  }
}
