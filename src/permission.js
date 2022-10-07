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
