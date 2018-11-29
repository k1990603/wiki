import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Platform, ToastAndroid, BackHandler } from 'react-native';
import { observer, Provider } from 'mobx-react';
import { Router } from './router';
import GlobalStore from './store';

type Props = {};
@observer
export default class App extends Component<Props> {
  constructor() {
    super()
    this.lastBackPressed = 0;
  }

  componentDidMount() {
    setTimeout(() => {
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
      }
    }, 500);
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    if (this.index == 0) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再点击一次退出应用', ToastAndroid.SHORT);
      return true;
    }
  }

  handleNavigationChange() {

  }

  render() {
    return (
      <Provider GlobalStore={GlobalStore}>
        <Router
          onNavigationStateChange={() => this.handleNavigationChange}
          uriPrefix="/"
        />
      </Provider>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#0000ff',
    marginBottom: 5
  }
});
