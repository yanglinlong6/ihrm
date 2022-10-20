export default {
  // created() {
  //   console.log('页面进来, 执行混入的created')
  // },
  methods: {
    checkPerm(name) {
      // const name = 'addEmployee'
      // const name = 'delEmployee'
      // 这个函数可以接收一个按钮的名字
      // 通过个人信息判断能否点击
      const points = this.$store.state.user.userInfo.roles.points
      // 返回这个权限是否存在的布尔值
      return points.indexOf(name) !== -1
    }
  }
}
