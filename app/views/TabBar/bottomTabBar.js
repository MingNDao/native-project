import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class BottomTabBar extends Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
  }

  render() {
    return <View style={[styles.tabs, this.props.style ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Ionicons
            name={tab}
            size={30}
            color={this.props.activeTab === i ? '#3471d5d9' : 'rgb(186,186,186)'}
            ref={(icon) => { this.icons[i] = icon; }}
          />
        </TouchableOpacity>;
      })}
    </View>;
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 52,
    flexDirection: 'row',
    borderWidth: 0,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: '#f9f9f9',
    borderTopColor: '#f1f1f1'
  },
});

export default BottomTabBar;