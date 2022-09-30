import { login, getUserInfo } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
// 存放状态数据
const state = {
  // token: localStorage.getItem('token') || ''
  token: getToken() || '',
  userInfo: {}
}
// 修改 state
const mutations = {
  setToken(state, data) {
    state.token = data
    // localStorage.setItem('token', data)
    setToken(data)
  },
  setUserInfo(state, data) {
    state.userInfo = data
  }
}
// 如果有异步操作放在actions
const actions = {
  async login({ commit }, data) {
    // 发送请求,
    const res = await login(data)
    // 由于拦截器返回了 res.data.data
    // 现在这里接收到的就是 最终结果, 无需再用点语法处理
    // 拿到token
    console.log(res)
    // 通过 mutations 存入 state
    commit('setToken', res)
  },
  // async getUserInfo(context) {
  async getUserInfo({ commit }) {
    const res = await getUserInfo()

    // const {commit} = context
    // 这种解构可以直接放到形参位置
    commit('setUserInfo', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
