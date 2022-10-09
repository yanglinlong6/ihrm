import request from '@/utils/request'

export function getDeptsList() {
  return request({
    url: '/company/department'
  })
}
