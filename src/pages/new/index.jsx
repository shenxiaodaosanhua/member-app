import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import {Button, Form, Input, Text, Textarea, View} from "@tarojs/components";
import './index.less'
import {createWork} from "../../servers/servers";

export default class Index extends React.Component {

  state = {
    isSubmit: false
  }

  onSubmit = form => {
    Taro.showLoading({
      title: '提交中...'
    })
    let data = {
      name: form.detail.value.name,
      mobile: form.detail.value.mobile,
      remark: form.detail.value.remark,
      category: 'new',
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
      </View>
    )
  }
}
