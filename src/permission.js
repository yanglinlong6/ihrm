// 导航守卫属于路由router
import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  if (store.state.user.token) {
    // 1. 有token
    // 1.1 去登录页 => 首页
    if (to.path === '/login') {
      // next如果不带参数, 就是放行, 如果带了路径, 就是跳转
      next('/')
    } else {
      next()
    }
    // 1.2 不是去登录页 => 放行
  } else {
    // 2. 没有token
    const list = ['/login', '/404', '/test']
    // 2.1 在可随意进入的白名单列表中 => 放行
    if (list.indexOf(to.path) !== -1) {
      next()
    } else {
      // 2.2 不在可放行的列表中 => 登录页
      next('/login')
    }
  }
})
