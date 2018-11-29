import React, {Component} from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import stackOption from '../../assets/styles/defaultStackOption';
import Toast from 'react-native-root-toast';

import util from '../../util/util';

import Me from './container/me';
import About from './container/about';
import AccountSetting from './container/accountSetting';
const Mine = require ('../../assets/images/tabBar/me.png');
const Mine_active = require ('../../assets/images/tabBar/me-selected.png');

export default createStackNavigator (
  {
    Me: Me,
    About: About,
    AccountSetting: AccountSetting,
  },
  {
    initialRouteName: 'Me',
    defaultNavigationOptions: stackOption,
    navigationOptions: ({navigation}) => {
      if (navigation.state.params) {
        alert (navigation.state.params.par);
      } else {
      }
      // return tabIsHide;
      if (true) {
        return tabIsHide;
      } else {
        return {tabBarVisible: false};
      }
    },
    // {
    //   tabBarLabel: '我的',
    //   tabBarIcon: ({tintColor, focused}) => {
    //     return (
    //       <Image
    //         source={!focused ? Mine : Mine_active}
    //         style={[{height: 20, width: 20}, {resizeMode: 'stretch'}]}
    //       />
    //     );
    //   },
    // },
  }
);
const tabIsHide = {
  tabBarLabel: '我的',
  tabBarIcon: ({tintColor, focused}) => {
    return (
      <Image
        source={!focused ? Mine : Mine_active}
        style={[{height: 20, width: 20}, {resizeMode: 'stretch'}]}
      />
    );
  },
};

function stackStyle () {
  alert (navigation.state.index);
  if (navigation.state.index > 0) {
    return false;
  } else {
    return stackOption;
  }
}
