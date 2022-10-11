import request from '@/utils/request'

// 获取员工简单列表(只有id+姓名, 没有分页和其他数据)
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
