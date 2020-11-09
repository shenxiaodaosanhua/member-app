import React from "react"
import Taro from "@tarojs/taro"
import {Button, Form, Input, View} from "@tarojs/components"
import {AtDivider} from "taro-ui"
import './index.less'
import IconFont from "../../components/iconfont";
import {
  getToken,
  login,
} from '../../servers/servers'

export default class Login extends React.Component {

  onSubmit = (e) => {
    let username = e.detail.value.username,
      code = e.detail.value.code

    if (! username) {
      Taro.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 3000,
      })
      return
    }
    if (! code) {
      Taro.showToast({
        title: '请输入验证吗',
        icon: 'none',
        duration: 3000,
      })
      return
    }

    this.loginMember(username, code)
  }

  loginMember(username, code) {
    Taro.showLoading({
      title: '登录中...'
    })
    login({
      username,
      code,
    }).then(result => {
      Taro.setStorageSync('Authorization', result.data.token)
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/index/index',
      })
    }).catch(error => {
      Taro.hideLoading()
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

  onWechat = () => {
    Taro.showLoading({
      title: '登录中...'
    })

    Taro.login({
      success: this.loginWechat
    })
  }

  loginWechat = (result) => {
    getToken({
      code: result.code
    }).then(res => {
      Taro.setStorageSync('Authorization', res.data.token)
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/index/index',
      })
    }).catch(error => {
      Taro.hideLoading()
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

  render() {
    return (
      <View
        className='warp'
      >
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
              className='at-col at-col-8 input'
            />
            <View className='at-col at-col-4'>
              <Button className='code'>获取验证码</Button>
            </View>
          </View>

          <Button
            type='primary'
            formType='submit'
            className='button'
          >登录</Button>
        </Form>
        <AtDivider content='第三方登录' />
        <View
          className='at-row at-row__justify--center'
        >
          <View
            className='at-col at-col-2'
          >
            <IconFont name='weixin' size={80} />
          </View>
        </View>
      </View>
    )
  }
}
