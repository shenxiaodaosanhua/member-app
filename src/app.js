import { Component } from 'react'
import Taro from "@tarojs/taro";
import 'taro-ui/dist/style/index.scss'

class App extends Component {

  componentDidMount () {
    this.updateMiNiApp()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  updateMiNiApp() {
    if(Taro.canIUse("getUpdateManager")){
      const update=Taro.getUpdateManager();
      update.onCheckForUpdate((res)=>{
        if(res.hasUpdate){
          update.onUpdateReady(()=>{
            Taro.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function () {
                if (res.confirm) {
                  update.applyUpdate();
                }
              }
            })
          })
          update.onUpdateFailed(()=>{
            Taro.showModal({
              title: '已经有新版本了',
              content: '新版本已经上线，请您删除当前小程序，重新打开。'
            })
          })

        }
      })
    }else{
      Taro.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
