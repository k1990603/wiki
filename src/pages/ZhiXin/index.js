import React, { Component } from 'react'
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ZhiXin from './container';

const home = require('../../assets/images/tabBar/home.png');
const home_active = require('../../assets/images/tabBar/home-selected.png');

export default createStackNavigator(
  {
    ZhiXin: { screen: ZhiXin }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#008ee3',
      },
    },
    navigationOptions: {
      tabBarLabel: '主页',
      tabBarIcon: (({ tintColor, focused }) => {
        return (
          <Image
            source={!focused ? home : home_active}
            style={[{ height: 20, width: 20 }, { resizeMode: 'stretch' }]}
          />
        )
      }),
    },
  }
);