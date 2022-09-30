import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取当前登录用户基本数据
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 根据用户id获取更加详细的信息
export function getUserDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}