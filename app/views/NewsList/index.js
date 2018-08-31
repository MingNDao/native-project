/*
 * @Author: liuxin 
 * @Date: 2018-08-25 00:29:27 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-30 23:55:52
 */

import React, { Component } from "react";
import { Image,ActivityIndicator, FlatList,TouchableOpacity, StyleSheet, Text, View } from "react-native";
import fecha from "fecha";
import PropTypes from 'prop-types'; 

var REQUEST_URL = "https://api.lxinr.top/snowball/artlist?";
console.log(REQUEST_URL)
import { content } from '../../assets/artlist.json'
console.log(content)

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      refreshing: false,
      page: 1,
      loadingOver: false
    };

    this.fetchData = this.fetchData.bind(this);
    // this.ListFooterComponent = this.ListFooterComponent.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log('get-----type------',this.props)
    let { tabLabel = '' } = this.props
    if(tabLabel === '头条') tabLabel = ''
    const { page } = this.state
    fetch(`${REQUEST_URL}?page=${page}&type=${tabLabel}`)
      .then(res => res.json())
      .then(data => {
        const { content } = data
        this.setState({
          data: page === 1 ? content : this.state.data.concat(content),
          loaded: true,
          refreshing: false,
          loadingOver: !content.length,
          page: content.length && this.state.page + 1
        });
        console.log('-------',data)
      });
  }

  render() {
    console.log('=======',this.props)
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <FlatList
        data={this.state.data}
        renderItem={item => this.renderItem(item, this.props.navigation)}
        extraData={this.state}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={1}
        keyExtractor={(item, index) => '' + index}
        style={styles.list}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f6f8'}}> 
        <ActivityIndicator  animating={true} color='#3471d5d9' size="large" /> 
      </View> 
    );
  }

  renderFooter = () => {
    if (this.state.loadingOver) {
      return (
        <View style={{height:48,alignItems:'center',justifyContent:'flex-start',}}> 
          <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}> 没有更多数据了 </Text> 
        </View>
      );
    } else { 
      return ( 
        <View style={{flex: 1, flexDirection:'row', height:48, justifyContent:'center', alignItems:'center'}}> 
          <ActivityIndicator  animating={true} color='#3471d5d9' size="small" />
          <Text> 加载更多...</Text> 
        </View> 
      ); 
    }
  }

  // 下拉刷新
  onRefresh = async () => {
    await this.setStateAsync({
      refreshing: true,
      page: 1
    })
    this.fetchData()
  }

  onEndReached = (distanceFromEnd) => {
    console.log('hahahahhahaha',distanceFromEnd)
    this.fetchData()
  }

  setStateAsync = (state) => {
    return new Promise(resolve => {
      this.setState(state,resolve)
    })
  }

  renderItem({item},navigation) {
    const { data } = item
    const { photo_domain, profile_image_url } = data && data.user
    console.log(item,navigation)
    const avatar = photo_domain + profile_image_url.split(',')[1]
    let time =
      (data.created_at &&
        fecha.format(new Date(Number(data.created_at)), "MM-DD hh:mm")) ||
      "";
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Detail',{target: data.target})}>
        <View style={styles.container}>
          <View style={styles.cellHeader}>
            <Text style={styles.cellHeaderText}>{data.title}</Text>
          </View>
          <View style={styles.desc}>
            <Text numberOfLines={2} ellipsizeMode={"tail"}  style={styles.descText}>{data.description}</Text>
          </View>
          <View style={styles.bottom}>
            <Image
              source={{ uri: avatar }}
              style={styles.thumbnail}
            />
            <Text>{data.user.screen_name}</Text>
            <View style={styles.bottomDate}>
              <Text>{time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

NewsList.propTypes = {
  tabLabel: PropTypes.string,
  navigation: PropTypes.object
}

var styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d4d7dc'
  },
  cellHeader: {
    flex: 1,
    alignItems: 'flex-start',
    marginBottom: 10
  },
  cellHeaderText: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 25,
    color: '#333',
    textAlign: 'left',
  },
  desc: {
    flex: 1
  },
  descText: {
    lineHeight: 20,
    color: '#666',
    fontSize: 14
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18
  },
  thumbnail: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8
  },
  bottomDate: {
    flex: 1,
    alignItems: 'flex-end'
  },
  footer: {
    flex: 1,
    paddingTop: 18,
    paddingBottom: 40,
    backgroundColor: "#f5f6f8"
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#FFF"
  }
});

export default NewsList