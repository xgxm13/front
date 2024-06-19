import request from '@/utils/request'

// 注册
export function registerApi (data) {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}

export function loginApi (data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}