import React from "react";
import Taro from "@tarojs/taro"
import {Button, Text, View} from "@tarojs/components";
import {AtAvatar, AtDivider} from "taro-ui";
import './index.less'
import {loginWechat} from "../../servers/servers";

export default class Index extends React.Component {

  state = {
    code: '',
    userId: 0,
  }

  componentDidMount () {
    this.getCode()
    let params = Taro.getStorageSync('new_params')
    if (params.user_id && params.user_id > 0) {
      this.setState({
        userId: params.user_id,
      })
    }
  }

  getCode() {
    Taro.login().then(res => {
      if (! res.code) {
        Taro.showToast({
          title: '获取code失败',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      this.setState({
        code: res.code
      })
    }).catch(() => {
      Taro.showToast({
        title: '获取code失败',
        icon: 'none',
        duration: 3000,
      })
    })
  }

  onGetPhoneNumber = result => {
    let data = {
      encryptedData: result.detail.encryptedData,
      iv: result.detail.iv,
      code: this.state.code,
      "user_id": this.state.userId,
    },
      path = Taro.getStorageSync('path')

    Taro.showLoading({
      title: '登录中...'
    })
    loginWechat(data).then(res => {
      Taro.setStorageSync('Authorization', res.data.token)
      Taro.hideLoading()
      if (path) {
        Taro.redirectTo({
          url: '/' + path,
        })
      } else {
        Taro.redirectTo({
          url: '/pages/index/index',
        })
      }
    }).catch(error => {
      this.getCode()
      Taro.hideLoading()
      console.log(error)
    })
  }

  loginMobile = () => {
    Taro.navigateTo({
      url: '/pages/auth/mobile'
    })
  }

  render() {
    let userInfo = Taro.getStorageSync('userInfo')

    return (
      <View className='warp'>
        <View className='login-warp'>
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
          <View className='at-row at-row__justify--center'>

            <View
              className='at-col-12'
            >
              <Text className='text'>关联手机号码；操作更便捷</Text>
            </View>
          </View>
          <View className='at-row at-row__justify--center login-not'>
            <View
              className='at-col-5'
            >
              <Button
                className='login-mobile'
                lang='zh_CN'
                onClick={this.loginMobile}
              >输入手机号码登录</Button>
            </View>
          </View>
          <AtDivider />
          <View className='at-row at-row__justify--center'>
            <View
              className='at-col-5'
            >
              <Button
                className='login-wechat'
                lang='zh_CN'
                openType='getPhoneNumber'
                onGetPhoneNumber={this.onGetPhoneNumber}
              >微信快速登录</Button>
            </View>
          </View>

        </View>
      </View>
    )
  }
}
