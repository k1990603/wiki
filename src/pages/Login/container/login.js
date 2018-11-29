import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity, AsyncStorage, DeviceEventEmitter } from 'react-native';
import { observer } from 'mobx-react';
import Toast from 'react-native-root-toast';
import util from '../../../util/util';
import CountDown from '../component/countDown';
import { PasswordFrom, VerCodeForm } from '../component/loginTpl';
import * as API from '../../../api/loginApi';
const logoImg = require('../../../assets/images/login/zhl-logo.png');
@observer
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.navigation = this.props.navigation;
    this._onPhoneChange = this._onPhoneChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._onVerCodeChange = this._onVerCodeChange.bind(this);
    this._gotoForgetPsw = this._gotoForgetPsw.bind(this);
    this._onLoginByPass = this._onLoginByPass.bind(this);
    this._onLoginByVercode = this._onLoginByVercode.bind(this);
    this.state = {
      curSelectIdx: 0,
      phone: '',
      passWord: '',
      verCode: '',
      visible: false,
      loginBtnTxt: '登录'
    };

  }

  static navigationOptions = navigation => ({
    headerTitle: (
      <Text style={{ flex: 1, textAlign: 'center', fontSize: 18 }}>用户登录</Text>
    )
  });

  _tabCahnge(idx) {
    this.setState({
      curSelectIdx: idx
    })
  }
  _onLoginByPass() {
    if (!this.state.phone) {
      util.toast('手机号不能为空');
      return false;
    }
    if (!util.validators.phone.test(this.state.phone)) {
      util.toast('手机号格式不正确');
      return false;
    }
    if (!this.state.passWord) {
      util.toast('密码不能为空');
      return false;
    }
    this.setState({
      loginBtnTxt: '正在登录'
    })
    API.loginByPwd(this.state.phone, this.state.passWord).then(res => {
      this._gotoHome(res.user.token);
    }).catch(err => {
      util.toast(err);
    })
  }
  _onLoginByVercode() {
    this.setState({
      loginBtnTxt: '正在登录'
    })
    API.login(this.state.phone, this.state.verCode).then(res => {
      this._gotoHome(res.user.token);
    }, err => {
      util.toast(err);
    })
  }
  _gotoHome(token) {
    AsyncStorage.setItem('token', token, () => {
      util.toast('登录成功,跳转中', {
        onHidden: () => {
          this.navigation.navigate('App');
        }
      })
    });
  }
  _onPhoneChange(phone) {
    this.setState({
      phone
    })
  }
  _onPasswordChange(passWord) {
    this.setState({
      passWord
    })
  }
  _onVerCodeChange(verCode) {
    this.setState({
      verCode
    })
  }
  _gotoForgetPsw() {
    this.navigation.navigate('RetrievePassword');
  }
  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('sendCode', () => {
      let phone = this.state.phone;
      API.sendVCode(phone).then(() => {
        util.toast('发送验证码成功');
      }).catch(err => {
        util.toast('发送验证码失败');
      })
    })
  }
  render() {
    let loginFrom = null;
    if (this.state.curSelectIdx == 0) {
      loginFrom = <PasswordFrom {...this.state} _onPhoneChange={this._onPhoneChange} _onPasswordChange={this._onPasswordChange} _gotoForgetPsw={this._gotoForgetPsw} _onLoginByPass={this._onLoginByPass}></PasswordFrom>;
    } else {
      loginFrom = <VerCodeForm {...this.state} _onPhoneChange={this._onPhoneChange} _onVerCodeChange={this._onVerCodeChange} _onLoginByVercode={this._onLoginByVercode} ></VerCodeForm>;
    }
    return (
      <View style={styles.container}>
        <View style={styles.logoWrap}>
          <Image
            source={logoImg}
            style={[{ height: 48, width: 70 }, { resizeMode: 'contain' }]}
          />
          <View style={styles.logoName}>
            <Text style={styles.name}>
              透明供应链
            </Text>
            <Text style={styles.appName}>
              企业端
            </Text>
          </View>
        </View>
        <View style={styles.paddingGap}>
          {/* tab */}
          <View style={styles.loginTitle}>
            <TouchableOpacity key={0} activeOpacity={0.9} onPress={e => this._tabCahnge(0)}>
              <View style={[styles.tab]}>
                <Text style={[styles.accLogin, this.state.curSelectIdx == 0 ? styles.tabActive : null]}>
                  账号密码登录
              </Text>
                <Text style={this.state.curSelectIdx == 0 ? styles.titleBottom : null}>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity key={1} activeOpacity={0.9} onPress={e => this._tabCahnge(1)}>
              <View style={styles.tab}>
                <Text style={[styles.vertifyLogin, this.state.curSelectIdx == 1 ? styles.tabActive : null]}>
                  验证码登录
              </Text>
                <Text style={this.state.curSelectIdx == 1 ? styles.titleBottom : null}>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {
            loginFrom
          }
        </View>
      </View>
    );
  }
  componentWillUnmount() {
    this.subscription.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ffffff'
  },
  logoWrap: {
    marginTop: 80,
    alignItems: 'center',
  },
  logoName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14
  },
  name: {
    color: '#323232',
    fontSize: 14,
    marginRight: 12
  },
  appName: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#313131',
    fontSize: 12,
    color: '#323232',
    borderRadius: 4,
  },
  paddingGap: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60
  },
  loginTitle: {
    flexDirection: 'row',
    marginTop: 40,

  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20
  },
  tabActive: {
    fontWeight: 'bold'
  },
  titleBottom: {
    width: 30,
    height: 3,
    backgroundColor: '#1c82d4',
    marginTop: 3

  },
  inputRow: {
    marginTop: 35,
    height: 40,
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 4
  },
  vertifyInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  geCode: {
    color: '#008ee3',
    width: 100,
    textAlign: 'center'
  },
  hasSend: {
    color: '#dddddd'
  },
  forgetPas: {
    alignItems: 'flex-end',
    marginTop: 10,
    color: '#323232'
  },
  loginBtn: {
    padding: 15,
    marginTop: 40,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#0079FD',
    backgroundColor: '#c2c2c2'
  },
  loginBtnActived: {
    backgroundColor: '#008ee3'
  },
  login: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  span: {
    fontSize: 12
  }
});
