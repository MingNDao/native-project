/*
 * @Author: liuxin 
 * @Date: 2018-08-30 21:46:08 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-09-01 01:13:42
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import ScrollList from '../ScrollList';
import WebviewBridge from '../WebviewBridge';
import BottomTabBar from './bottomTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const titles = [
  '资讯',
  '项目列表',
  '其他',
  '个人中心'
]

export default class TabBar extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', '资讯')
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
      source: encodeURIComponent('https://lxinr.top/reactsnowball/demo')
    }
  }

  componentWillMount() {
    const { navigation } = this.props
    const { params } = navigation && navigation.state
    let tab = (params && params.tab) || 0
    this.props.navigation.setParams({otherParam: titles[Number(tab)]})
    this.setState({
      tabIndex: Number(tab)
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('-----------next---props----',nextProps)
    if(nextProps.navigation.state.params.jump) {
      const { navigation } = nextProps
      const { params } = navigation && navigation.state
      let tab = (params && params.tab) || 0
      this.setState({
        tabIndex: Number(tab)
      })
    }
  }

  changePage = (i) => {
    console.log('tabbar----',i,this.props)
    this.props.navigation.setParams({otherParam: titles[Number(i)],tab: Number(i)})
    this.setState({
      tabIndex: Number(i)
    })
  }

  render() {
    const { navigation } = this.props
    console.log('this.state.tabIndex---',this.state.tabIndex)
    return (
      <ScrollableTabView
        style={styles.container}
        renderTabBar={()=><BottomTabBar style={{borderWidth: 0, elevation: 0}} />}
        initialPage={0}
        page={this.state.tabIndex}
        onChangeTab = {
          (obj)=>{
            console.log('被选中的下标:'+obj.i);
            this.changePage(obj.i)
            {/* this.props.navigation.navigate('News',{tab: 3}) */}
          }
        }
        locked={true}
        tabBarPosition='bottom'
      >
        <ScrollList navigation={navigation} tabLabel="ios-paper" style={styles.tabView} />
        <WebviewBridge tabLabel="ios-list" style={styles.tabView} navigation={navigation} source={this.state.source} />
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