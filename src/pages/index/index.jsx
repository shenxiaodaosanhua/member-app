import React, { Component } from 'react'
import {
  View,
} from '@tarojs/components'
import {
  AtList,
  AtListItem,
} from 'taro-ui'
import './index.less'

export default class Index extends Component {


  render () {
    return (
      <View>
        <AtList>
          <AtListItem title='查询进度' arrow='right' />
          <AtListItem title='宽带报装' arrow='right' />
          <AtListItem title='故障申报' arrow='right' />
        </AtList>
      </View>
    )
  }
}
