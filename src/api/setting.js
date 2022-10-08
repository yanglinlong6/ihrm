// 每个接口api文件都引入统一封装的 asiox 对象
import request from '@/utils/request'

// 每个接口都返回这个请求对象
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}

// 获取角色列表
// 根据文档, 这个接口需要参数 page / pagesize
// 我们接受一个对象参数, 方便调用时传参
// 他是一个 get 请求, 带参数用的是 params
// post 请求带的是 data 字段
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
