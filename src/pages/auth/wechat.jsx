import React from "react";
import Taro from "@tarojs/taro"
import {Button, Form, Input, View} from "@tarojs/components";
import {AtAvatar, AtModal, AtModalContent, AtModalHeader} from "taro-ui";
import './wechat.less'
import {getMemberSession, loginWechat} from "../../servers/servers";
import IconFont from "../../components/iconfont";


export default class Wechat extends React.Component {
  state = {
    isOpened: false,
    wechatOpened: false,
    code: '',
  }

  onGetUserInfo = (result) => {
    if (!result.detail.userInfo) {
      this.setState({
        isOpened: true
      })
      return
    }

    this.getCode()

    Taro.setStorageSync('userInfo', result.detail.userInfo)
    this.setState({
      wechatOpened: true
    })

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
      code: this.state.code
    }

    Taro.showLoading({
      title: '登录中...'
    })
    loginWechat(data).then(res => {
      Taro.setStorageSync('Authorization', res.data.token)
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/index/index',
      })
    }).catch(error => {
      this.getCode()
      Taro.hideLoading()
      console.log(error)
    })
  }

  onError = error => {
    console.log(error)
  }

  onSubmit = result => {
    console.log(result)
  }

  render() {
    return (
      <View className='warp'>
        <View className='login-header'>
          <View className='at-row at-row__justify--center'>
            <View className='at-col-2'>
              <IconFont name='touxiang' size={80} />
            </View>
          </View>
          <View
            className='login-button'
          >
            <Button
              size='default'
              type='primary'
              openType='getUserInfo'
              onGetUserInfo={this.onGetUserInfo}
              lang='zh_CN'
            >登录</Button>
          </View>
        </View>
        <AtModal
          isOpened={this.state.wechatOpened}
        >
          <AtModalHeader>手机登录</AtModalHeader>
          <AtModalContent>
            <Button
              size='default'
              type='primary'
              openType='getPhoneNumber'
              onGetPhoneNumber={this.onGetPhoneNumber}
            >微信手机登录</Button>
          </AtModalContent>
        </AtModal>

        <AtModal isOpened={this.state.isOpened}>
          <AtModalHeader>手机号码登录</AtModalHeader>
          <AtModalContent>
            <Form
              className='form'
              onSubmit={this.onSubmit}
            >
              <Input
                name='username'
                type='number'
                placeholder='请输入手机号码'
                className='input'
              />
              <View className='at-row'>
                <Input
                  name='code'
                  type='number'
                  placeholder='请输入验证码'
                  className='at-col at-col-7 input'
                />
                <View className='at-col at-col-5'>
                  <Button className='code' size='mini'>验证码</Button>
                </View>
              </View>

              <View className='at-row at-row__justify--between'>
                <View className='at-col-2'></View>
                <View className='at-col-4'>
                  <Button
                    type='primary'
                    formType='submit'
                    className='button'
                    size='mini'
                  >登录</Button>
                </View>
              </View>
            </Form>
          </AtModalContent>
        </AtModal>
      </View>
    )
  }
}
