import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0', // 基础路径
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user && store.state.user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  // console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么

  return Promise.reject(error)
})
export default request
