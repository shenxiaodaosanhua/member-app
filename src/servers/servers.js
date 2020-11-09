/* eslint-disable import/prefer-default-export */
import httpRequest from "./http"

//登录
export const loginWechat = (data) => {
  return httpRequest.post('/oauth/member/memberWechatLogin', data)
}

export const login = data => {
  return httpRequest.post('/oauth/member/login', data);
}

export const getToken = (data) => {
  return httpRequest.get('/oauth/member/wechat/code', data)
}

export const getMemberSession = (data) => {
  return httpRequest.get('/oauth/member/wechat/session', data)
}
