/*
 * @Author: liuxin 
 * @Date: 2018-08-25 00:38:28 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-09-01 02:02:00
 */

import React, { Component } from 'react';
import { View,ActivityIndicator,WebView } from 'react-native';

export default class Detail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', '')
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      startInLoadingState: true,
    }
  }

  componentWillMount() {
    const { title, navigation } = this.props
    const { params } = navigation && navigation.state
    // 设置title
    let tit = title || (params && params.tit)
    this.props.navigation.setParams({otherParam: tit})
  }

  getParamValue(url){
    const reg = /[^&=?]+=[^&]*/g;
    let name = url.split('?')[0]
    let params = {}
    url.match(reg) && url.match(reg).forEach((item,index) => {
      const splitItem = item.split('=')
      let obj = {}
      obj[splitItem[0]] = splitItem[1]
      params = Object.assign(params,obj)
    })
    return {
      name,
      params
    }
  }

  handleMessage(event) {
    const { data } = event.nativeEvent
    parseData = data && JSON.parse(data)
    if(!parseData) return
    console.log('handleMessage---',parseData)
    const { url, title, replace, uri } = parseData
    if(!uri && url) {
      this.props.navigation[(replace && 'replace') || 'push']('WB',{source: encodeURIComponent(url), tit: title})
    }
    if(uri) {
      const { name, params } = this.getParamValue(uri)
      this.props.navigation.navigate(name,Object.assign(params,{jump: true}))
    }
  }
  

  renderLoadingView = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f6f8'}}> 
        <ActivityIndicator  animating={true} color='#3471d5' size="large" /> 
      </View> 
    );
  }

  render() {
    const { source, navigation } = this.props
    let url = ''
    if(source) {
      url = decodeURIComponent(source)
    }else {
      const { params } = navigation && navigation.state
      if(!params || !params.source) return null
      url = params && params.source && decodeURIComponent(params.source) || ''
    }
    
    return (
      <View style={{flex: 1}}>
        <WebView 
          style={{flex:1}}
          originWhitelist={['*']}
          contentInset={{top:0,left:0}}
          scalesPageToFit={false}
          automaticallyAdjustContentInsets={true}
          domStorageEnabled={true}
          startInLoadingState={this.state.startInLoadingState}
          renderLoading={this.renderLoadingView}
          onMessage={(e) => {
            this.handleMessage(e)
          }}
          onLoadEnd={() => {
            this.setState({
              startInLoadingState:false
            })
          }}
          source={{uri: url}}
        />
      </View>
    );
  }
}