// 在这里最基本的操作是筛选权限, 放入state 进行菜单渲染
import { asyncRoutes } from '@/router'
const state = {
  // 你有权限可以查看的路由
  routes: []
}
const mutations = {
  setRoutes(state, data) {
    state.routes = data
  }
}
const actions = {
  filterRoutes(context, menus) {
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
