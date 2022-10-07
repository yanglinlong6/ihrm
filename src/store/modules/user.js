import { login, getUserInfo, getUserDetail } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// 存放状态数据
const state = {
  // token: localStorage.getItem('token') || '',
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
  },
  clearUserInfo(state) {
    state.token = ''
    state.userInfo = {}
    // 脸上 cookie 的数据一并处理, 照顾刷新的问题
    // localStorage.removeItem('token')
    removeToken()
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
    // 这里是获取用户数据的 actions
    // 通过观察, 发现获取到的数据不完整, 缺少了头像
    // 所以多发一个请求补全数据
    const detail = await getUserDetail(res.userId)
    // const {commit} = context
    // 这种解构可以直接放到形参位置
    commit('setUserInfo', {
      ...res,
      ...detail
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
