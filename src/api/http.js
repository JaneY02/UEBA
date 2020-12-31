import axios from 'axios'
import { message } from 'antd'

let instance = axios.create({
  baseURL: '',
  timeout: 3000
})

instance.interceptors.request.use(config => {
  return config
}, error => {
  message.error('请求超时')
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  let { data } = response
  if (data && data.code && data.code === 200) {
    return data
  } else if (data && data.code && data.code === 500) {
    message.error(data.msg || '获取接口数据错误')
    return Promise.reject()
  }
}, error => {
  message.error('服务错误')
  return Promise.reject(error)
})

export default instance