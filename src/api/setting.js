// 每个接口api文件都引入统一封装的 asiox 对象
import request from '@/utils/request'

// 每个接口都返回这个请求对象
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}
