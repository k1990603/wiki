import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

type Props = {
  title: string
};

export default class AppHeader extends Component<Props> {
  static defaultProps = {
    title: '标题'
  }

  render() {
    return (
      <View style={{ backgroundColor: '#999' }}>
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}