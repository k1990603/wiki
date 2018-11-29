import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  DeviceEventEmitter,
} from 'react-native';
import {observer} from 'mobx-react';
import Toast from 'react-native-root-toast';
@observer
export default class AccountSetting extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [
        {id: 0, name: '账号资料', navgator: ''},
        {id: 1, name: '修改密码', navgator: ''},
      ],
    };
  }
  render () {
    return (
      <FlatList
        style={styles.flat}
        extraData={this.state}
        data={this.state.data}
        renderItem={({item}) => (
          <View style={styles.content}>
            <View style={styles.contentTop}>
              <Text style={styles.navName}>{item.name}</Text>
              <Image
                style={styles.arrowImg}
                source={require ('../../../assets/images/me/arrow-right-black.png')}
              />
            </View>
            <View style={styles.after} />
          </View>
        )}
      />
    );
  }
  componentWillUnmount () {}
}

const styles = StyleSheet.create ({
  flat: {
    flex: 1,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  contentTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  myRow: {
    marginLeft: 12,
    marginRight: 17,
    height: 50,
  },
  navName: {
    // float: left,
    fontSize: 14,
    color: '#323232',
    marginTop: 16,
    letterSpacing: 0,
  },
  arrowImg: {
    width: 5,
    height: 8,
    marginTop: 22,
  },
  after: {
    // position: absolute,
    // right: 0,
    // left: 0,
    height: 1,
    bottom: 0,
    marginTop: 15,
    // border-bottom:1px solid #f0f0f0;
    borderWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderStyle: 'solid',
    // background: '#EAEAEA',
    // transformOrigin:0;
    transform: [{scaleY: 0.2}],
  },
});
