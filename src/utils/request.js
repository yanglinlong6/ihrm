import axios from 'axios'

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
    console.log('数据错误, 应该有提示')
  }
}, err => {
  // 这里才是处理状态码200以外的其他错误
  console.log('硬性网络错误', err)
})

export default service
