<template>
  <div>测试页</div>
</template>

<script>
import { constantRoutes } from '@/router'
export default {
  created() {
    // 权限标识的路由筛选作用
    const oldRoutes = constantRoutes
    const perm = this.$store.state.user.userInfo.roles.menus

    console.log('所有路由', oldRoutes)
    console.log('个人权限列表', perm)

    const newRoutes = oldRoutes.filter(item => {
      return perm.indexOf(item.name) !== -1
    })
    console.log('筛选结果', newRoutes)
  }
}
</script>

<style>

</style>
