import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import {
  View,
} from '@tarojs/components'
import {
  AtAvatar,
  AtDivider,
  AtList,
  AtListItem,
} from 'taro-ui'
import './index.less'

export default class Index extends Component {


  render () {
    let userInfo = Taro.getStorageSync('userInfo')
    return (
      <View>
        <View className='at-row at-row__justify--center'>
          <View
            className='at-col-2'
          >
            <AtAvatar
              image={userInfo.avatarUrl}
              circle
              size='large'
            />
          </View>
        </View>
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
          />
          <AtListItem
            title='宽带报装'
            arrow='right'
            iconInfo={{ color: '#13CE66', value: 'add-circle', }}
          />
          <AtListItem
            title='故障申报'
            arrow='right'
            iconInfo={{ color: '#FFC82C', value: 'close-circle', }}
          />
        </AtList>
        <AtDivider
          content='个人设置'
          lineColor='#cccccc'
          fontColor='#cccccc'
        />
        <AtListItem
          title='绑定小程序'
          arrow='right'
          iconInfo={{ color: '#13CE66', value: 'message', }}
        />
        <AtListItem
          title='退出'
          arrow='right'
          iconInfo={{ color: '#FFC82C', value: 'trash', }}
        />
      </View>
    )
  }
}
