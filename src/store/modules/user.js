import { login } from '@/api/user'
// 存放状态数据
const state = {
  token: ''
}
// 修改 state
const mutations = {
  setToken(state, data) {
    state.token = data
  }
}
// 如果有异步操作放在actions
const actions = {
  async login({ commit }, data) {
    // 发送请求,
    const res = await login(data)
    // 拿到token
    console.log(res.data.data)
    // 通过 mutations 存入 state
    commit('setToken', res.data.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
