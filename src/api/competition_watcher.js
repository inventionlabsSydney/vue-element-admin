import request from '@/utils/request'

export function fetchWatchers(query) {
  return request({
    url: '/products/list',
    method: 'get',
    params: query
  })
}

export function createWatcher(id) {
  return request({
    url: '/products/detail',
    method: 'get',
    params: { id }
  })
}

export function editWatcher(id) {
  return request({
    url: '/products/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteWatcher(id) {
  return request({
    url: '/products/detail',
    method: 'get',
    params: { id }
  })
}
