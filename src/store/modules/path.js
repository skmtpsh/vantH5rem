export default {
  namespaced: true,
  state: {
    info: {}
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set ({ state, commit, dispatch }, info) {
      return new Promise(async resolve => {
        console.log(info)
        // state.info = info
        // commit('setInfo', info)
        // 持久化
        await dispatch('db/set', {
          dbName: 'sys',
          path: `path.info.${info.level}`,
          value: info,
          user: true
        }, { root: true })
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    load ({ state, commit, dispatch }) {
      return new Promise(async resolve => {
        let info = await dispatch('db/get', {
          dbName: 'sys',
          path: 'path.info',
          defaultValue: {},
          user: true
        }, { root: true })
        commit('setInfo', info)
        resolve()
      })
    }
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    }
  }
}
