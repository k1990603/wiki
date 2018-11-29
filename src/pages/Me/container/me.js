import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  DeviceEventEmitter,
} from 'react-native';
import {observer} from 'mobx-react';
import Toast from 'react-native-root-toast';
import util from '../../../util/util';
import {hidden} from 'ansi-colors';

const {width} = Dimensions.get ('window');
const {height} = Dimensions.get ('window');

@observer
export default class Me extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [
        {id: 0, name: '我的智联云', navgator: 'AccountSetting'},
        {id: 1, name: '账号与设置', navgator: 'AccountSetting'},
        {id: 2, name: '意见反馈', navgator: 'AccountSetting'},
        {id: 3, name: '关于透明供应链', navgator: 'AccountSetting'},
      ],
    };
  }
  static navigationOptions = ({navigation}) => {
    const {state, setParams} = navigation;
    return {
      title: '我的',
    };
  };
  // _toSetting () {
  //   alert ('ok');
  //   this.navigation.navigate ('AccountSetting');
  // }
  _toNavigate (item) {
    // util.toast (item);
    this.props.navigation.navigate (item, {par: 1});
  }
  render () {
    const {navigate} = this.props.navigation.navigate;
    return (
      <View style={styles.wrap}>
        <View style={styles.top}>
          <Image
            style={styles.bgImg}
            source={require ('../../../assets/images/me/myBackground.png')}
          />
        </View>
        {/* <View style={styles.myRow} /> */}
        <FlatList
          style={styles.baColor}
          extraData={this.state}
          data={this.state.data}
          renderItem={({item}) => (
            <View style={styles.flat}>
              <TouchableOpacity
                onPress={this._toNavigate.bind (this, item.navgator)}
              >
                <View
                  style={styles.content}
                  // onPress={() => navigate ('AccountSetting')}
                >
                  <View style={styles.contentTop}>
                    <Text style={styles.navName}>{item.name}</Text>
                    <Image
                      style={styles.arrowImg}
                      source={require ('../../../assets/images/me/arrow-right-black.png')}
                    />
                  </View>
                  <View style={styles.after} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        {/* <View style={{flex: -1}} /> */}
      </View>
    );
  }
  componentWillUnmount () {}
}

const styles = StyleSheet.create ({
  wrap: {
    // flex: 1,
    // justifyContent: 'space-evenly',
    height: height,
    backgroundColor: '#f7f7f7',
    paddingLeft: 7,
    paddingRight: 7,
  },
  top: {
    // flex: 1,
  },
  bgImg: {
    height: 169,
    width: 343,
    marginTop: 17,
    marginBottom: 11,
    borderRadius: 4,
    // marginRight: 7,
    // marginLeft: 7,
  },
  baColor: {
    backgroundColor: '#fff',
  },
  flat: {
    flex: 1,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    // marginTop: 11,
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
  // myRow: {
  //   marginLeft: 12,
  //   marginRight: 17,
  //   height: 50,
  // },
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
