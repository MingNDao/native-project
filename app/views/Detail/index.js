/*
 * @Author: liuxin 
 * @Date: 2018-08-25 00:38:28 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-30 23:47:40
 */

import React, { Component } from 'react';
import { View,ActivityIndicator,WebView } from 'react-native';

export default class Detail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', '阅读正文')
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      startInLoadingState: true,
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
    const { params } = this.props.navigation && this.props.navigation.state
    if(!params || !params.target) return null
    const target = params && params.target && encodeURIComponent(params.target) || ''
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
          onLoadEnd={() => {
            this.setState({
              startInLoadingState:false
            })
          }}
          source={{uri: `https://lxinr.top/reactsnowball/detail/${target}`}}
        />
      </View>
    );
  }
}