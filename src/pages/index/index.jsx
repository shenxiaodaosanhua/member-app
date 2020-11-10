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
} from 'taro-ui'
import './index.less'

export default class Index extends Component {

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

  selectWork = () => {
    Taro.navigateTo({
      url: '/pages/works/index'
    })
  }

  render () {
    let userInfo = Taro.getStorageSync('userInfo'),
      token = Taro.getStorageSync('Authorization'),
      loginButton = null

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
              image={userInfo.avatarUrl}
              circle
              size='large'
            />
          </View>
        </View>

        {loginButton}

        <AtDivider
          content='操作'
          lineColor='#cccccc'
          fontColor='#cccccc'
        />
        <AtList>
          <AtListItem
            title='查询进度'
            arrow='right'
            iconInfo={{ color: '#13CE66', value: 'eye', }}
            onClick={this.selectWork}
          />
          <AtListItem
            title='宽带报装'
            arrow='right'
            iconInfo={{ color: '#13CE66', value: 'add-circle', }}
          />
          <AtListItem
            title='故障申报'
            arrow='right'
            iconInfo={{ color: '#FFC82C', value: 'close-circle', }}
          />
        </AtList>
        <AtDivider
          content='个人设置'
          lineColor='#cccccc'
          fontColor='#cccccc'
        />
        <AtListItem
          title='绑定小程序'
          arrow='right'
          iconInfo={{ color: '#13CE66', value: 'message', }}
        />
        <AtListItem
          title='退出'
          arrow='right'
          iconInfo={{ color: '#FFC82C', value: 'trash', }}
        />
      </View>
    )
  }
}
