<template>
  <div>详情页</div>
</template>

<script>
export default {
  created() {
    console.log('详情页')
    // $router 路由对象, 一般用来执行跳转函数之类
    // $route 路由信息, 可以读取当前页面的路由数据
    // 跳转进来时问号带上的查询字符串, 可以通过this.$route.query获取
    // 跳转时, 路由配置中 /:xxx 的路径参数, 可以通过 this.$route.params获取
    console.log('问号传参的查询字符串', this.$route.query)
    console.log('路径参数', this.$route.params)
  }
}
</script>

<style>

</style>
