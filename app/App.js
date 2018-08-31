/*
 * @Author: liuxin 
 * @Date: 2018-08-22 23:02:45 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-30 23:40:34
 */

import React, { Component } from 'react';
import Detail from './views/Detail'
import TabBar from './views/TabBar';
import { View,StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator(
  {
    News: TabBar,
    Detail: Detail
  },
  {
    initialRouteName: 'News',
    navigationOptions: {
      headerStyle: {
        height: 48,
        backgroundColor: '#f9f9f9',
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    
      },
      headerTitleStyle: {
        fontSize: 17,
        color: '#333'
      }
    },
  }
);

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <RootStack />
      </View>
    )
  }
}
