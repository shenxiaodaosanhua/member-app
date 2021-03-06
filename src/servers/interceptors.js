import Taro from "@tarojs/taro"
import { pageToLogin } from "./utils"
import { HTTP_STATUS } from './config'

const customInterceptor = (chain) => {

  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在")

    } else if ((res.statusCode === HTTP_STATUS.BAD_GATEWAY) ||
      (res.statusCode === HTTP_STATUS.SERVER_ERROR)) {
      return Promise.reject("服务端出现了问题")

    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync("Authorization", "")
      pageToLogin()
      // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");

    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync("Authorization", "")
      pageToLogin()
      return Promise.reject("需要鉴权")

    } else if (res.statusCode === HTTP_STATUS.TOO_MANY) {
      return Promise.reject("请求过于频繁")
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data
    } else if ((res.statusCode === HTTP_STATUS.CREATED)) {
      return res.data
    } else if (res.statusCode === HTTP_STATUS.ACCEPTED) {
      return res.data
    }else {
        return Promise.reject(res)
      }
  })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors
