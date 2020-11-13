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
import {getMy} from "../../servers/servers";

export default class Index extends Component {

  state = {
    user: null,
  }

  componentDidMount () {
    getMy().then(result => {
      this.setState({
        user: result.data
      })
    }).catch(error => {
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

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

  loginOut = () => {
    Taro.setStorageSync('Authorization', '')
    // Taro.setStorageSync('userInfo', '')
    Taro.redirectTo({
      url: '/pages/auth/index'
    })
  }

  workAdd = () => {
    Taro.navigateTo({
      url: '/pages/new/index'
    })
  }

  workFault = () => {
    Taro.navigateTo({
      url: '/pages/fault/index'
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
            onClick={this.workAdd}
          />
          <AtListItem
            title='故障申报'
            arrow='right'
            iconInfo={{ color: '#FFC82C', value: 'close-circle', }}
            onClick={this.workFault}
          />
        </AtList>
        <AtDivider
          content='个人设置'
          lineColor='#cccccc'
          fontColor='#cccccc'
        />
        {
          this.state.user && this.state.user.is_bind ? (
            <AtListItem
              title='绑定小程序'
              extraText='已绑定'
              iconInfo={{ color: '#13CE66', value: 'message', }}
            />
          ) : (
            <AtListItem
              title='绑定小程序'
              arrow='right'
              iconInfo={{ color: '#13CE66', value: 'message', }}
            />
          )
        }
        <AtListItem
          title='退出'
          arrow='right'
          iconInfo={{ color: '#FFC82C', value: 'trash', }}
          onClick={this.loginOut.bind(this)}
        />
      </View>
    )
  }
}
