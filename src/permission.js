// 导航守卫属于路由router
import router from '@/router'
import store from '@/store'

router.beforeEach(async(to, from, next) => {
  const token = store.state.user.token
  const url = to.path
  const list = ['/login', '/404', '/test']

  // 1. token && login => 首页
  if (token && url === '/login') {
    next('/')
  }

  // 2. token && !login => 放行
  // 这是已经登录, 正常进入页面的逻辑
  if (token && url !== '/login') {
    // 进入任何页面之前, 判断是否已经有用户数据, 如果没有就去获取
    if (!store.getters.name) {
      await store.dispatch('user/getUserInfo')
      // 获取万用户数据之后, 进行权限的筛选, 生成菜单
      // 这个操作因为数据需要共享, 有两个地方都要用到
      // 放在 vuex 里面
      const menus = store.state.user.userInfo.roles.menus
      const res = await store.dispatch('permission/filterRoutes', menus)
      console.log(res)
      // 筛选完路由, 追加路由配置, 恢复访问(vuex state 只是显示了菜单 router对象不认识页面)
      // 靠 router.addRoutes(筛选出来的权限路由数组)
      router.addRoutes([
        ...res,
        { path: '*', redirect: '/404', hidden: true }
      ])
      // 这里追加路由, 是晚于查找组件的时间
      // 所以后续追加的路由不会生效,
      // 解决的办法是, 重新跳转一次当前要去的页面
      // 就会重新出发一次查找, 第二次查找才会找到
      console.log(to)
      next(to.path)
    }
    next()
  }

  // 3. !token && 在白名单 => 放行
  if (!token && list.includes(url)) {
    next()
  }

  // 4. !token && 不在白名单 => 登录页
  if (!token && !list.includes(url)) {
    next('/login')
  }

  // if (store.state.user.token) {
  //   // 1. 有token
  //   // 1.1 去登录页 => 首页
  //   if (to.path === '/login') {
  //     // next如果不带参数, 就是放行, 如果带了路径, 就是跳转
  //     next('/')
  //   } else {
  //     next()
  //   }
  //   // 1.2 不是去登录页 => 放行
  // } else {
  //   // 2. 没有token
  //   const list = ['/login', '/404', '/test']
  //   // 2.1 在可随意进入的白名单列表中 => 放行
  //   if (list.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     // 2.2 不在可放行的列表中 => 登录页
  //     next('/login')
  //   }
  // }
})
