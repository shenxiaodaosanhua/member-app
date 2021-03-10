/* eslint-disable import/prefer-default-export */
import httpRequest from "./http"
import http from "./http";

//登录
export const loginWechat = (data) => {
  return httpRequest.post('/oauth/member/memberWechatLogin', data)
}
//登录
export const login = data => {
  return httpRequest.post('/oauth/member/login', data);
}
//获取token
export const getToken = (data) => {
  return httpRequest.get('/oauth/member/wechat/code', data)
}
//获取会员session
export const getMemberSession = (data) => {
  return httpRequest.get('/oauth/member/wechat/session', data)
}

//发送手机验证吗
export const sendMobileCode = (data) => {
  return httpRequest.post('/oauth/member/sms-code', data);
}
//手机验证码登录
export const loginCode = (data) => {
  return httpRequest.post('/oauth/member/login-code', data);
}

//我的工单列表
export const getWorks = () => {
  return httpRequest.get('/member/work')
}

//工单详情
export const getWorkInfo = id => {
  return httpRequest.get('/member/work/' + id)
}

//创建工单
export const createWork = data => {
  return httpRequest.post('/member/work', data)
}

//获取我的信息
export const getMy = () => {
  return httpRequest.get('/member')
}

//更新我的信息
export const updateMyInfo = (data) => {
  return httpRequest.put('/member-wechat', data)
}

//分享商品列表
export const getProduct = () => {
  return httpRequest.get('/product')
}
