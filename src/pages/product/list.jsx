import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import {View} from "@tarojs/components";
import {
  getProduct,
} from "../../servers/servers"
import ProductList from '../../components/product-list'
import {getCurrentPageUrl} from '../../servers/utils'
import {getCurrentInstance} from "@tarojs/runtime";

export default class List extends Component {
  state = {
    list: [],
  }

  componentDidMount () {
    let params = getCurrentInstance().router.params,
      auth = Taro.getStorageSync('Authorization')

    if ((params.user_id) && (params.user_id > 0)) {
      Taro.setStorageSync('new_params', params);
    }

    if (! auth) {
      let path = getCurrentPageUrl()
      Taro.setStorageSync('path', path)
      Taro.navigateTo({
        url: '/pages/auth/index'
      })
    }

    this.product()
  }

  product() {
    getProduct().then(result => {
      this.setState({
        list: result.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    let list = this.state.list
    return (
      <View>
        <View className='at-row at-row--wrap'>
          {
            list.map(product => <ProductList product={product} />)
          }
        </View>
      </View>
    )
  }
}
