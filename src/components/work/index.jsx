import React from "react";
import Taro from "@tarojs/taro";
import {AtCard} from "taro-ui";
import {View} from "@tarojs/components";
import './index.less'

export default class Index extends React.Component {

  hrefInfo() {
    Taro.redirectTo({
      url: '/pages/info/index?id=' + this.props.item.id
    })
  }

  render() {
    let item = this.props.item
    return (
      <View>
        <AtCard
          note={'生成时间:' + item.created_at}
          extra={'状态:' + item.state}
          title={'类型:' + item.category}
          onClick={this.hrefInfo.bind(this)}
        >
          <View className='item-content'>称呼:{item.name}</View>
          <View className='item-content'>电话:{item.mobile}</View>
          <View className='item-content'>地址:{item.address}</View>
          <View className='item-content'>产品:{item.product}</View>
          <View className='item-content'>品牌:{item.brand}</View>
          <View className='item-content'>地区:{item.area}</View>
        </AtCard>
      </View>
    )
  }
}
