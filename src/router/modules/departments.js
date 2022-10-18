import Layout from '@/layout'

export default {
  // 这里的name是故意跟权限标志设置成一样
  name: 'departments',
  // 基本路径
  path: '/departments',
  // 默认显示全局相同布局组件
  component: Layout,
  children: [
    // 布局组件内部嵌套的主要内容
    {
      // 如果不想继续拼接可以不加, 为空的情况下, 直接默认显示在嵌套内
      path: '',
      // 嵌套的子页面组件
      component: () => import('@/views/departments'),
      // meta 配置菜单中的显示(花裤衩独有的封装)
      meta: { title: '部门', icon: 'tree' }
    }
  ]
}
