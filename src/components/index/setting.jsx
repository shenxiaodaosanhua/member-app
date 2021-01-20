import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {
  View,
} from '@tarojs/components'
import {
  AtDivider,
  AtListItem,
} from 'taro-ui'

export default class Setting extends Component {

  loginOut = () => {
    Taro.setStorageSync('Authorization', '')
    Taro.setStorageSync('userInfo', '')
    Taro.redirectTo({
      url: '/pages/auth/index'
    })
  }

  render() {
    let user = this.props.user
    return (
      <View>
        <AtDivider
          content='个人设置'
          lineColor='#cccccc'
          fontColor='#cccccc'
        />
        {
          user && user.is_bind ? (
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
