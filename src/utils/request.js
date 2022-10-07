import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// create an axios instance
// 这里没有直接对 axios 原包进行改造, 而是创建一个实例
// 在实例的基础上进行基地址/拦截器配置
// jd / ali / wechat
// axios.defaults.baseURL = 'http://jd.com'
// 创建的实例所有功能跟原来的包一样, 只不过环境独立
// const axiosJD = axios.create({
//   baseURL: 'jd.com'
// })
// const axiosBD = axios.create({
//   baseURL: 'baidu.com'
// })

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
// 登录以后, 发现基本所有后台接口都需要token请求头
// 所以在请求拦截器进行统一的注入
service.interceptors.request.use(config => {
  if (store.state.user.token) {
    // 不能直接放入 token 了
    // 有可能失效, 主动介入, 需要判断现在发请求的时间跟登录时间相差多少
    const time = localStorage.getItem('time')
    const now = Date.now()
    // 这里是定义超时时间, 可以产品经理确定直接写死
    // 有时候面试会问, 不是后端发过来的吗?
    // 也有可能, 这个超时时间是后端数据库储存, 我们访问 api 获取
    const maxTime = 1000 * 60 * 60 * 2

    if (now - time < maxTime) {
      // Bearer 是 token 的标准前缀, 注意跟token本体之间有一个空格
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    } else {
      // 超时的主动介入
      // 登出, 跳到登录页
      store.commit('user/clearUserInfo')
      router.push('/login')
      // 拒绝掉当前请求
      return Promise.reject(new Error('token超时(主动介入)'))
    }
  }

  return config
})

// 响应拦截器 每次请求的响应都会经过这里的回调函数
// 最基本的原则是无论如何都得返回
// 在这个拦截器当中, 其实可以接收2个参数, 第一个是状态码为200 的回调
// 第二个是其他错误状态码的回调, 并且可以获得错误对象
service.interceptors.response.use(res => {
  // 这里起码是请求状态码为200的情况
  // 再去判断数据有没有问题
  if (res.data.success) {
    // 网络请求成功, 数据发送成功
    return res.data.data
  } else {
    // 网络请求成功, 但是数据错误,出错提示
    // 弹出提示
    Message.error(res.data.message)
    console.log('数据错误, 应该有提示')
    // 应该挡住当前正在执行的异步请求
    // 正在执行的请求, 都是一个 promise 被 .then 或者 async / await 调用
    // 如果想要在中间突然截断, 可以用原生 Promise 对象自带 reject 来处理
    // 里面还可以带一个错误对象做参数, 方便 控制台追踪错误信息
    return Promise.reject(new Error(res.data.message))
  }
}, err => {
  // 这里才是处理状态码200以外的其他错误
  // 这里是所有状态吗不为 200 的响应错误拦截器
  // 可能性很多, 比如token 超时, url 配置错误等等
  // 如果要在这单独处理token 失效,最起码, 要辨认出什么情况是 token 失效
  // 后端跟我们约定, 凡是token 错误都会有 code===10002
  console.log('硬性网络错误', err)
  console.dir(err)

  if (err.response && err.response.data.code === 10002) {
    // 这里的报错可能性很多, 不一定每个 err 都有 response
    // 可以保险一点, 确认有 response 再做判断

    // 这个代码是 token 超时
    // 调用 mutations 清理数据
    // 跳转页面即可
    store.commit('user/clearUserInfo')
    router.push('/login')
    Message.error('登录超时')
  } else {
    Message.error(err.message || '系统错误')
  }

  return Promise.reject(new Error('系统错误'))
})

export default service
