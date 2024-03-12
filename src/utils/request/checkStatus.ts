import { Toast } from 'antd-mobile'

export const message = (content: string) => {
  Toast.show({
    icon: 'fail',
    content
  })
}

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      message('请求失败！请您稍后重试')
      break
    case 401:
      message('登录失效！请您重新登录')
      break
    case 403:
      message('当前账号无权限访问！')
      break
    case 404:
      message('你所访问的资源不存在！')
      break
    case 405:
      message('请求方式错误！请您稍后重试')
      break
    case 408:
      message('请求超时！请您稍后重试')
      break
    case 500:
      message('服务异常！')
      break
    case 502:
      message('网关错误！')
      break
    case 503:
      message('服务不可用！')
      break
    case 504:
      message('网关超时！')
      break
    default:
      message('请求失败！')
  }
}
