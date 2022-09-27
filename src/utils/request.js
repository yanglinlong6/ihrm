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

export default service
