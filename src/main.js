import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import head from '@/assets/common/head.jpg'

// 引入 i18n
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 注册安装库
Vue.use(VueI18n)
// 创建实例
const i18n = new VueI18n({
  // 重点, i18n 插件配置内容
  locale: 'en',
  messages: {
    zh: {
      morning: '早安, 祝你开心每一天',
      ...zhLocale
    },
    en: {
      morning: 'good morning, have a nice day',
      ...enLocale
    }
  }
})

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

// 演示自定义指令操作
// Vue.directive(名字, 配置对象(钩子函数))
Vue.directive('fiximg', {
  // 这里的钩子函数, 会在使用这个指令的元素生命周期中自动被执行
  inserted(el) {
    console.log('这里是元素插入到页面中的钩子')
    console.log(el)
    // 只要用这个指令, 就能在元素插入到页面中时进行控制
    // 这里可以监听dom的错误事件, 然后替换 src
    el.addEventListener('error', () => {
      el.src = head
    })
    // 除了出错, 还可以处理数据为空的状态
    el.src = el.src || head
  }
})

// 全局组件注册方式 Vue.component(组件名字符串, 组件对象)
// import PageTools from '@/components/PageTools'
// Vue.component('PageTools', PageTools)

// 插件的使用方法
// vue 自带的插件机制, Vue.use(插件对象)
// 插件对象的 install 方法会被自动执行
import MyPlugin from '@/components/MyPlugin'
Vue.use(MyPlugin)

// 过滤器的定义
// Vue.filter('名字', 函数)
// 这里的函数, 接收旧数据, 返回新结果
// 这里是引入一个函数, 注册成过滤器
// import { formatDate } from '@/filters'
// Vue.filter('formatDate', formatDate)
// 下面是如果有大量的函数, 引入一起注册的方法
// import * as 变量名 from '@/filters' 一次引入所有暴露的变量
import * as filtersFn from '@/filters'
console.log('filters函数', filtersFn)
for (const key in filtersFn) {
  // console.log('key', key)
  // console.log('value', filtersFn[key])
  Vue.filter(key, filtersFn[key])
}

// 演示 mixin 用法
// 创建一个符合 vue 组件标准的对象
// const vueConfig = {
//   // created() {
//   //   console.log('页面进来, 执行混入的created')
//   // },
//   methods: {
//     checkPerm(name) {
//       // const name = 'addEmployee'
//       // const name = 'delEmployee'
//       // 这个函数可以接收一个按钮的名字
//       // 通过个人信息判断能否点击
//       const points = this.$store.state.user.userInfo.roles.points
//       // 返回这个权限是否存在的布尔值
//       return points.indexOf(name) !== -1
//     }
//   }
// }
// 上面这个配置, 符合 vue 组件的规范
// 里面有个函数可以判断按钮权限, 我希望所有的 vue 组件
// 都能带上这个函数, 只需要用 mixin 混入
import vueConfig from '@/mixin'
Vue.mixin(vueConfig)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
