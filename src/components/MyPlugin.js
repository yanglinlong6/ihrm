import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import ImageUpload from '@/components/ImageUpload'
import ScreenFull from '@/components/ScreenFull'
export default {
  install(Vue, data) {
    // 这个函数会在 Vue.use 时被调用
    // 自动有两个参数传入
    // 1. Vue 构造器
    // 2. 调用时可选的配置数据
    // console.log('这是我自己的插件')
    // console.log('Vue', Vue)
    // console.log('data', data)
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('ScreenFull', ScreenFull)
    // 组件库的作者以后, 只需要维护这个 install 方法即可
    // 有几个组件就多注册几个
    // 对于组件库的使用者, 无需其他变更
  }
}
