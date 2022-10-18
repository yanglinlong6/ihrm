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

// 新增角色
export function addRole(data) {
  return request({
    method: 'post',
    url: '/sys/role',
    data
  })
}

// 删除角色
export function delRole(id) {
  return request({
    method: 'delete',
    url: `/sys/role/${id}`
  })
}

// 根据id获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 编辑时点击确定发送的更新请求
export function editRole(data) {
  return request({
    method: 'put',
    url: `/sys/role/${data.id}`,
    data
  })
}

export function assignPerm(data) {
  return request({
    method: 'put',
    url: '/sys/role/assignPrem',
    data
  })
}
