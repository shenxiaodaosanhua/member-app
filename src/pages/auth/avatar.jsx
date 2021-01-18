import React from "react";
import Taro from "@tarojs/taro"
import {Button, View} from "@tarojs/components";
import {updateMyInfo} from "../../servers/servers";
import './avatar.less'

export default class Avatar extends React.Component {

  getUserInfo(result) {
    let userInfo = result.detail.userInfo
    Taro.showLoading({
      title: '更新中...'
    })
    updateMyInfo(userInfo).then(() => {
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/index/index',
      })
    }).catch(() => {
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/index/index',
      })
    })
  }

  render() {
    return (
      <View className='warp'>
        <View className='button-warp'>
          <Button
            className='login-wechat'
            lang='zh_CN'
            openType='getUserInfo'
            onGetUserInfo={this.getUserInfo}
          >
            获取我的头像信息
          </Button>
        </View>
      </View>
    )
  }
}
