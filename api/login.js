import request from '@/utils/request'

export function loginApi (data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}