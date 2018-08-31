import React, { Component } from 'react';
import { Text } from 'react-native';
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import NewList from '../NewsList'

export default class ScrollList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
  }

  changePage = (i) => {
    console.log('呵呵呵呵呵呵',i,this.props)
    this.setState({
      page: Number(i)
    })
  }

  render() {
    const types = [
      '头条',
      '沪深',
      '房产',
      '港股',
      '基金',
      '美股',
      '保险'
    ]
    const { navigation } = this.props
    return (
      <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar style={{borderWidth: 0, elevation: 6}} />}
        page={this.state.page}
        tabBarUnderlineStyle={{
          height: 2,
          backgroundColor: '#3471d5d9'
        }}
        tabBarInactiveTextColor={'#666'}
        tabBarActiveTextColor={'#3471d5d9'}
        tabBarBackgroundColor={'#fff'}
        onChangeTab = {
          (obj)=>{
            console.log('-----被选中的下标:'+obj.i);
            this.changePage(obj.i)
          }
        }
        style={{
          borderWidth: 0
        }}
      >
        {
          types.map((item,index) => {
            return (
              <NewList tabLabel={item} navigation={navigation} key={index}/>
            )
          })
        }
      </ScrollableTabView>
    );
  }
}