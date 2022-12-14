import Layout from '@/layout'

export default {
  name: 'permission',
  // 基本路径
  path: '/permission',
  // 默认显示全局相同布局组件
  component: Layout,
  children: [
    // 布局组件内部嵌套的主要内容
    {
      // 如果不想继续拼接可以不加, 为空的情况下, 直接默认显示在嵌套内
      path: '',
      // 嵌套的子页面组件
      component: () => import('@/views/permission'),
      // meta 配置菜单中的显示(花裤衩独有的封装)
      meta: { title: '权限', icon: 'lock' }
    }
  ]
}
