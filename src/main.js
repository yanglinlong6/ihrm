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
      el.src = 'https://ts1.cn.mm.bing.net/th/id/R-C.cabcfca68022e4b249e29a92bd9654ab?rik=jwCLB%2fVm3i5miQ&riu=http%3a%2f%2fimg.ewebweb.com%2fuploads%2f20200225%2f14%2f1582610405-zMSjcLXrFZ.jpeg&ehk=OaCQAZ3ziI8jbU91qP%2bxga00QhzrQ6WHroEnltMa91E%3d&risl=&pid=ImgRaw&r=0'
    })
    // 除了出错, 还可以处理数据为空的状态
    el.src = el.src || 'https://ts1.cn.mm.bing.net/th/id/R-C.cabcfca68022e4b249e29a92bd9654ab?rik=jwCLB%2fVm3i5miQ&riu=http%3a%2f%2fimg.ewebweb.com%2fuploads%2f20200225%2f14%2f1582610405-zMSjcLXrFZ.jpeg&ehk=OaCQAZ3ziI8jbU91qP%2bxga00QhzrQ6WHroEnltMa91E%3d&risl=&pid=ImgRaw&r=0'
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
