import request from '@/utils/request'

type Props = any

export function apiSearch(params: Props, Authorization: string) {
  return request({
    url: '/api/ct/info_center',
    method: 'get',
    params,
    headers: {
      Authorization
    }
  })
}
