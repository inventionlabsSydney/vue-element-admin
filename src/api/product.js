import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/products/list',
    method: 'get',
    params: query
  })
}

export function fetchProduct(id) {
  return request({
    url: '/products/detail',
    method: 'get',
    params: { id }
  })
}
