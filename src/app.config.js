import { useGlobalIconFont } from './components/iconfont/helper'

export default {
  pages: [
    'pages/index/index',
    'pages/new/index',
    'pages/fault/index',
    'pages/works/index',
    'pages/info/index',
    'pages/auth/mobile',
    'pages/auth/index',
    'pages/auth/avatar',
    'pages/product/list',
    'pages/renew/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: Object.assign(useGlobalIconFont()),
}
