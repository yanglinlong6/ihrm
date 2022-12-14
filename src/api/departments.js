import request from '@/utils/request'

// 获取部门列表
export function getDeptsList() {
  return request({
    url: '/company/department'
  })
}

// 添加部门
export function addDept(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

export function delDept(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}

// 获取部门详情
export function getDeptById(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 修改部门详情
export function editDept(data) {
  return request({
    method: 'put',
    url: `/company/department/${data.id}`,
    data
  })
}
