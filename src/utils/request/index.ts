import axios from 'axios'
import { message as messageApi } from 'antd'
import { getToken } from '../auth'
import { AxiosCanceler } from './axiosCancel'
import { checkStatus } from './checkStatus'

export interface AxiosRes {
  code: number
}

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1500000
})

const axiosCanceler = new AxiosCanceler()

// const wihteList = ['/api/admin/direct_uploads', 'https://storage.googleapis.com', 'aliyun']

// request interceptor
service.interceptors.request.use(
  (config) => {
    // * 将当前请求添加到 pending 中
    axiosCanceler.addPending(config)

    const token = getToken()
    if (token) {
      config.headers['Authorization'] = config.headers['Authorization'] || 'bearer ' + token
    }

    return config
  },
  (error) => {
    // Do something with request error
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { config, data } = response
    axiosCanceler.removePending(config)

    // const { code, message } = data

    // if (wihteList.some((i) => config.url?.includes(i))) {
    //   return data
    // }

    //     #### 错误码

    // * 无论请求成功或失败，HTTP 状态码统一为 2xx，客户端需要使用返回数据里的 code 做区分
    // * 0 - 请求成功，其他表示请求失败
    // * 1, 90001, 20107 - 通用未知错误
    // 未登录返回code: 10503
    // 管理员账号删除返回code: 10502

    // if (code === 90403) {
    //   window.location.href = '/#/404'
    // }

    // if (![0, 1, 20107, 90403, 90001].includes(code)) {
    //   if ([10503, 10502, 10504].includes(code)) {
    //     // 未登录，跳转到登录页
    //     removeToken()
    //     window.location.href = '/#/login'
    //   }

    //   // messageApi.warning(message)

    //   // return Promise.reject(data)
    // }

    return data
  },
  async (error) => {
    const { response } = error
    // 请求超时单独判断，请求超时没有 response
    if (error.message.indexOf('timeout') !== -1) messageApi.error('请求超时，请稍后再试')
    // 根据响应的错误状态码，做不同的处理
    if (response) checkStatus(response.status)
    // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
    if (!window.navigator.onLine) window.location.href = '/#/500'

    return Promise.reject(error)
  }
)

export default service
