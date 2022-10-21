import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 注册安装库
Vue.use(VueI18n)
// 创建实例
export default new VueI18n({
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
