import { useGlobalIconFont } from './components/iconfont/helper'

export default {
  pages: [
    'pages/index/index',
    'pages/auth/mobile',
    'pages/auth/index',
    'pages/works/index',
    'pages/info/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: Object.assign(useGlobalIconFont()),
}
