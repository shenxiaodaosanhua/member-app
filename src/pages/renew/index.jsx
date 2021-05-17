import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import {Button, Form, Input, OfficialAccount, Text, Textarea, View} from "@tarojs/components";
import './index.less'
import {createWork} from "../../servers/servers";

export default class Index extends Component {

  state = {
    isSubmit: false,
  }

  onSubmit = form => {
    Taro.showLoading({
      title: '提交中...'
    })

    let data = {
      name: form.detail.value.name,
      mobile: form.detail.value.mobile,
      address: form.detail.value.address,
      category: 'renew',
    }

    createWork(data).then(() => {
      Taro.hideLoading()
      Taro.redirectTo({
        url: '/pages/index/index',
      })
    }).catch(error => {
      console.log(error)
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
            <Text className='at-col-3 input-text'>联系地址：</Text>
            <Input
              name='address'
              placeholder='请输入您的地址'
              type='text'
              className='input at-col-8'
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
