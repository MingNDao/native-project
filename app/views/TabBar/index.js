/*
 * @Author: liuxin 
 * @Date: 2018-08-30 21:46:08 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-30 23:50:43
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import ScrollList from '../ScrollList'

import BottomTabBar from './bottomTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class TabBar extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', '资讯')
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0
    }
  }

  changePage = (i) => {
    const titles = [
      '资讯',
      '项目',
      '其他',
      '个人中心'
    ]
    this.props.navigation.setParams({otherParam: titles[Number(i)]})
    this.setState({
      tabIndex: Number(i)
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollableTabView
        style={styles.container}
        renderTabBar={()=><BottomTabBar style={{borderWidth: 0, elevation: 0}} />}
        onChangeTab = {
          (obj)=>{
            console.log('被选中的下标:'+obj.i);
            this.changePage(obj.i)
          }
        }
        locked={true}
        tabBarPosition='bottom'
      >
        <ScrollList navigation={navigation} tabLabel="ios-paper" style={styles.tabView} />
        <ScrollView tabLabel="ios-list" style={styles.tabView}>
          <View style={styles.card}>
            <Text>项目页</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-analytics" style={styles.tabView}>
          <View style={styles.card}>
            <Text>其他页</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-person" style={styles.tabView}>
          <View style={styles.card}>
            <Text>个人中心页</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
    )
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});