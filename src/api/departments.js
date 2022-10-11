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
