import React from 'react';
import {Platform} from 'react-native';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

import ZhiXinStack from './pages/ZhiXin';
// import OrderScreen from './pages/Order';
import LoginStack from './pages/Login';
import EnterpriseScreen from './pages/Enterprise';
import MeScreen from './pages/Me';
// import MeStack from './pages/Mes';
import AuthLoadingScreen from './public/authLoading';

const TabNavigator = createBottomTabNavigator (
  {
    Enterprise: EnterpriseScreen,
    ZhiXin: ZhiXinStack,
    // Order: OrderScreen,
    Me: MeScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: '#008ee3',
      inactiveTintColor: '#c2c2c2',
    },
  }
);

// 根路由
const AppNavigator = createSwitchNavigator (
  {
    // 判断是否登录页面(前置)
    AuthLoading: AuthLoadingScreen,
    // 登录页面
    Login: LoginStack,
    // Tab页面
    App: TabNavigator,
  },
  {
    initialRouteName: 'App',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1c82d4',
      },
    },
  }
);

export const Router = createAppContainer (AppNavigator);
