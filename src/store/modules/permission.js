// 在这里最基本的操作是筛选权限, 放入state 进行菜单渲染
import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  // 你有权限可以查看的路由(用来显示菜单)
  routes: []
}
const mutations = {
  setRoutes(state, data) {
    // 得到筛选后的权限路由, 不能单独作为菜单
    // 还要加上原来所有人都可以看的静态路由
    state.routes = [
      ...constantRoutes,
      ...data
    ]
  }
}
const actions = {
  filterRoutes({ commit }, menus) {
    // 路由筛选
    // 原路由列表 asyncRoutes
    // 当前人权限列表 menus
    console.log('vuex路由表', asyncRoutes)
    console.log('vuex权限数组', menus)
    const routes = asyncRoutes.filter(item => {
      // 过滤路由列表, name 在 权限表当中存在就能留下
      // 也就是name在 menus数组中查找索引, 结果不等于 -1
      return menus.indexOf(item.name) !== -1
    })
    console.log('vuex筛选结果', routes)
    commit('setRoutes', routes)
    // 还要将数据返回, 供导航守卫添加路由配置
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
