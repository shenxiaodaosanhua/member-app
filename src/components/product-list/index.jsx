import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {
  View,
  Image,
} from '@tarojs/components'
import {
  AtCard,
  AtButton,
} from 'taro-ui'

import './index.less'


export default class ProductList extends Component {

  productInfo(id) {
    Taro.navigateTo({
      url: '/pages/new/index?product_id=' + id
    })
  }

  render() {
    let product = this.props.product
    return (
      <View className='at-col at-col-12 product-item'>
        <AtCard
          extra={product.brand}
          title={product.name}
        >
          <View className='at-row at-row__justify--center'>
            <Image
              src={product.image}
              className='at-article__img'
              aspectFit='aspectFit'
            />
          </View>
          <AtButton
            type='warn'
            size='small'
            className='btn'
            onClick={this.productInfo.bind(this, product.id)}
          >登记报装</AtButton>
        </AtCard>
      </View>
    )
  }
}
