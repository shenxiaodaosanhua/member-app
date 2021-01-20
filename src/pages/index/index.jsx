import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {
  Button,
  View,
} from '@tarojs/components'
import {
  AtModal,
  AtModalContent,
  AtModalAction
} from 'taro-ui'
import './index.less'
import {getMy, updateMyInfo} from "../../servers/servers";
import Header from '../../components/index/header'
import Action from '../../components/index/action'
import Setting from '../../components/index/setting'

export default class Index extends Component {

  state = {
    user: {},
    isOpened: false,
  }

  componentDidMount () {
    getMy().then(result => {
      if (result.data.avatar == '') {
        this.setState({
          user: result.data,
          isOpened: true,
        })
      } else {
        this.setState({
          user: result.data,
        })
      }

    }).catch(error => {
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

  handleClose() {
    this.setState({
      isOpened: false,
    })
  }

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

  render () {


    return (
      <View>
        <Header user={this.state.user} />

        <Action />

        <Setting user={this.state.user} />

        <AtModal isOpened={this.state.isOpened}>
          <AtModalContent>
            <Button
              type='primary'
              size='default'
              openType='getUserInfo'
              onGetUserInfo={this.getUserInfo}
            >更新我的个人信息</Button>
          </AtModalContent>
          <AtModalAction>
            <Button
              onClick={this.handleClose.bind(this)}
            >取消</Button>
          </AtModalAction>
        </AtModal>

      </View>
    )
  }
}
