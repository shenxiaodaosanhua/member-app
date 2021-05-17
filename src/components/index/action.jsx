import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {
  View,
} from '@tarojs/components'
import {
  AtDivider,
  AtList,
  AtListItem,
} from 'taro-ui'

export default class Action extends Component {

  selectWork = () => {
    Taro.navigateTo({
      url: '/pages/works/index'
    })
  }

  workAdd = () => {
    Taro.navigateTo({
      url: '/pages/new/index'
    })
  }

  workFault = () => {
    Taro.navigateTo({
      url: '/pages/fault/index'
    })
  }

  workRenew = () => {
    Taro.navigateTo({
      url: '/pages/renew/index'
    })
  }

  render() {
    return (
      <View>
        <AtDivider
          content='操作'
          lineColor='#cccccc'
          fontColor='#cccccc'
        />
        <AtList>
          <AtListItem
            title='查询进度'
            arrow='right'
            iconInfo={{ color: '#13CE66', value: 'eye', }}
            onClick={this.selectWork}
          />
          <AtListItem
            title='宽带报装'
            arrow='right'
            iconInfo={{ color: '#13CE66', value: 'add-circle', }}
            onClick={this.workAdd}
          />
          <AtListItem
            title='宽带续费'
            arrow='right'
            iconInfo={{ color: '#13CE66', value: 'add-circle', }}
            onClick={this.workRenew}
          />
          <AtListItem
            title='故障申报'
            arrow='right'
            iconInfo={{ color: '#FFC82C', value: 'close-circle', }}
            onClick={this.workFault}
          />
        </AtList>
      </View>
    )
  }
}
