import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import head from '@/assets/common/head.jpg'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

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
const formatDate = (str) => {
  const date = new Date(str)
  const strDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  return strDate
}
Vue.filter('formatDate', formatDate)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
