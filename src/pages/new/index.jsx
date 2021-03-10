import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import {Button, Form, Input, OfficialAccount, Text, Textarea, View} from "@tarojs/components";
import './index.less'
import {createWork} from "../../servers/servers";
import {getCurrentInstance} from "@tarojs/runtime";

export default class Index extends Component {

  state = {
    isSubmit: false,
    product_id: 0,
  }

  componentDidMount () {
    let params = getCurrentInstance().router.params

    if ((params.product_id) && (params.product_id > 0)) {
      this.setState({
        product_id: params.product_id,
      })
    }

  }

  onSubmit = form => {
    Taro.showLoading({
      title: '提交中...'
    })


    let params = Taro.getStorageSync('new_params')
    let data = {
      name: form.detail.value.name,
      mobile: form.detail.value.mobile,
      remark: form.detail.value.remark,
      category: 'new',
      'user_id': params.user_id,
      'product_id': this.state.product_id,
    }

    createWork(data).then(() => {
      Taro.setStorageSync('path', '')
      Taro.setStorageSync('new_params', '')
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
