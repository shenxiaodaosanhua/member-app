import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {
  Button,
  View,
} from '@tarojs/components'
import {
  AtAvatar,
  AtDivider,
  AtList,
  AtListItem,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from 'taro-ui'

export default class Header extends Component {

  onGetUserInfo = result => {
    if (result.detail.errMsg !== 'getUserInfo:ok') {
      Taro.showToast({
        title: '请先授权',
        icon: 'none',
        duration: 3000,
      })
      return
    }

    let userInfo = result.detail.userInfo
    Taro.setStorageSync('userInfo', userInfo)
    Taro.navigateTo({
      url: '/pages/auth/index'
    })
  }

  render() {
    let token = Taro.getStorageSync('Authorization'),
      loginButton = null,
      user = this.props.user

    if (! token) {
      loginButton = (
        <View className='at-row at-row__justify--center login-not'>
          <View
            className='at-col-5'
          >
            <Button
              className='login-not-button'
              openType='getUserInfo'
              onGetUserInfo={this.onGetUserInfo}
              lang='zh_CN'
            >未登录</Button>
          </View>
        </View>
      )
    }

    return (
        <View>
          <View className='at-row at-row__justify--center'>
            <View
              className='at-col-2'
            >
              <AtAvatar
                image={user.avatar}
                circle
                size='large'
              />
            </View>
          </View>

          {loginButton}
        </View>
    )
  }
}
