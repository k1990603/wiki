import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  FlatList
} from 'react-native'
import OrderCell from '../components/OrderCell'
const { width } = Dimensions.get('window')

export default class Order extends Component<{}> {
  state = {
    data: [
      {
        title: '智互联深圳有限公司智互联深圳有限公司智互联深圳有限公司智互联深圳有限公司'
      }
    ]
  }
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '订单'
    };
  };


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <OrderCell item={item} />
          )} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }


})
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   ground: {
//     width: width,
//     height: (730 * width) / 750
//   },
//   shadowAndroid: {
//     width: width,
//     flex: 1,
//     backgroundColor: 'rgb(244,243,247)'
//   },
//   shadowIos: {
//     width: width,
//     height: 100,
//     transform: [
//       { translateY: -20 }
//     ],
//     backgroundColor: 'white',
//     shadowColor: 'white',
//     shadowOffset: {
//       width: 0,
//       height: -40
//     },
//     shadowOpacity: 1,
//     shadowRadius: 20
//   },
//   willLogin: {
//     alignSelf: "center",
//     position: 'absolute',
//     bottom: 20
//   },
//   edition: {
//     color: 'gray',
//     fontSize: 12,
//   }

// })