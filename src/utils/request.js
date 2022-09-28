import axios from 'axios'
import { Message } from 'element-ui'
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
  console.log('硬性网络错误', err)
  Message.error('系统错误')
  return Promise.reject(new Error('系统错误'))
})

export default service
