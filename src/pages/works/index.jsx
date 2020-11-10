import React from "react";
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import {getWorks} from "../../servers/servers";
import Work from "../../components/work";

export default class Index extends React.Component {

  state = {
    works: [],
  }

  componentDidMount() {
    Taro.showLoading({
      title: '加载中...'
    })
    getWorks().then(result => {
      this.setState({
        works: result.data
      })
      Taro.hideLoading()
    }).catch(error => {
      console.log(error)
      Taro.hideLoading()
    })
  }

  render() {
    let works = this.state.works
    return (
      <View>
        {
          works && works.map(item => (
            <Work item={item} />
          ))
        }
      </View>
    )
  }
}
