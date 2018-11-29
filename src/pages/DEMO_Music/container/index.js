import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { inject, Provider, observer } from 'mobx-react'
import Store from '../store'
import HeaderLeft from '../components/HeaderLeft'
import Album from '../components/Album'
import Player from '../components/Player'

@inject('GlobalStore')
@observer
export default class Music extends Component {
  constructor() {
    super()
    this.store = new Store
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerLeft: (
      <HeaderLeft navigation={navigation} />
    ),
  })
  render() {
    return (
      <Provider store={this.store}>
        <View style={styles.container}>
          <Album />
          <Player />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden'
  }
})