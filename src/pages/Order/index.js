import React, { Component } from 'react'
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Order from './container';
const Msg = require('../../assets/images/tabBar/msg.png');
const Msg_active = require('../../assets/images/tabBar/msg-selected.png');
export default createStackNavigator(
  {
    Order: { screen: Order }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#008ee3',
      },
    },
    navigationOptions: {
      tabBarLabel: '订单',
      tabBarIcon: (({ tintColor, focused }) => {
        return (
          <Image
            source={!focused ? Msg : Msg_active}
            style={[{ height: 20, width: 20 }, { resizeMode: 'stretch' }]}
          />
        )
      }),
    },
  }
);