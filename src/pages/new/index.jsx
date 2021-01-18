import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import {Button, Form, Input, OfficialAccount, Text, Textarea, View} from "@tarojs/components";
import './index.less'
import {createWork} from "../../servers/servers";
import {getCurrentInstance} from "@tarojs/runtime";

export default class Index extends Component {

  state = {
    isSubmit: false,
  }

  componentDidMount () {
    let params = getCurrentInstance().router.params
    if ((params.user_id) && (params.user_id > 0)) {
      Taro.setStorageSync('user_id', params.user_id);
    }
  }

  onSubmit = form => {
    Taro.showLoading({
      title: '提交中...'
    })

    let userId = getCurrentInstance().router.params.user_id
    if (! userId) {
      userId = Taro.getStorageSync('user_id')
    }

    let data = {
      name: form.detail.value.name,
      mobile: form.detail.value.mobile,
      remark: form.detail.value.remark,
      category: 'new',
      'user_id': userId,
    }

    createWork(data).then(() => {
      Taro.redirectTo({
        url: '/pages/index/index',
      })
      Taro.hideLoading()
    }).then(error => {
      Taro.hideLoading()
      Taro.showToast({
        title: error.data.message,
        icon: 'none',
        duration: 3000,
      })
    })
  }

  onLoad = result => {
    console.log(result)
  }

  onError = result => {
    console.log(result)
  }

  render() {
    return (
      <View className='warp'>
        <Form
          onSubmit={this.onSubmit}
        >
          <View className='at-row input-block'>
            <Text className='at-col-3 input-text'>称呼：</Text>
            <Input
              name='name'
              placeholder='请输入您的称呼'
              type='text'
              className='input at-col-8'
            />
          </View>
          <View className='at-row input-block'>
            <Text className='at-col-3 input-text'>联系电话：</Text>
            <Input
              name='mobile'
              placeholder='请输入您的联系电话'
              type='number'
              className='input at-col-8'
            />
          </View>
          <View className='at-row input-block'>
            <Text className='at-col-3 input-text'>留言：</Text>
            <Textarea
              name='remark'
              className='at-col-8 input'
            />
          </View>
          <Button
            type='primary'
            size='default'
            loading={this.state.isSubmit}
            formType='submit'
          >
            提交
          </Button>
        </Form>
        <OfficialAccount onLoad={this.onLoad} onError={this.onError} />
      </View>
    )
  }
}
