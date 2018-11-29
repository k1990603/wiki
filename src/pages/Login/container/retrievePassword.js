import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
  ToastAndroid,
  Image,
  ScrollView,
} from 'react-native';
import {inject} from 'mobx-react';
import {observer} from 'mobx-react';
import Toast from 'react-native-root-toast';
import util from '../../../util/util';
import * as API from '../../../api/loginApi';
import CountDown from '../component/countDown';

import {autorun} from 'mobx';

@observer
@inject ('GlobalStore')
export default class RetrievePassword extends Component<{}> {
  constructor (props) {
    super (props);
    this._toPhone = this._toPhone.bind (this);
    this._toVCode = this._toVCode.bind (this);
    this.state = {
      phone: '',
      vCode: '',
      isLock: false,
      btnText: '获取验证码',
      isSendClass: '',
      isSend: false,
    };
  }
  _toPhone (text) {
    if (text != '' && this.state.vCode != '') {
      this.setState ({phone: text, isLock: true});
    } else {
      this.setState ({phone: text, isLock: false});
    }
  }
  _toVCode (text) {
    if (text != '' && this.state.phone != '') {
      this.setState ({vCode: text, isLock: true});
    } else {
      this.setState ({vCode: text, isLock: false});
    }
  }
  _formSubmit () {
    //校验输入是否有效
    if (!this._validatePhone ()) return;
    if (!this._validateCode ()) return;
    API.findPasswordNextStep (this.state.phone, this.state.vCode).then (
      res => {
        // util.toast (res.authorizationCode);
        // this.props.navigation.navigate ('RetrievePassword2');
        this.props.GlobalStore.getAuthorizationCode (res.authorizationCode);
        this.props.navigation.navigate ('RetrievePassword2');
      },
      err => {
        util.toast (err || '失败，请稍后再试');
      }
    );
  }
  _validatePhone () {
    var value = this.state.phone;
    if (!value || value.length < 1) {
      util.toast ('请输入手机号');
      return false;
    }
    if (!util.validators.phone.test (value)) {
      util.toast ('手机号格式错误');
      return false;
    }
    return true;
  }
  _validateCode () {
    var value = this.state.vCode;
    if (!value || value.length != 4) {
      util.toast ('验证码错误');
      return false;
    }
    return true;
  }

  // 验证码
  // countDown (count) {
  //   var that = this;
  //   if (count <= 0) {
  //     this.setState ({
  //       btnText: '获取验证码',
  //       isSendClass: '',
  //       isSend: false,
  //     });
  //     return;
  //   }
  //   this.setState ({
  //     isSend: true,
  //     isSendClass: 'isSendClass',
  //     btnText: '已发送' + count + 'S',
  //   });

  //   this.timer = setTimeout (function () {
  //     count--;
  //     that.countDown (count);
  //   }, 1000);
  // }
  // _sendCode () {
  //   if (!this._validatePhone ()) return;
  //   util.toast ('验证码发送中');
  //   API.sendVCode (this.state.phone).then (
  //     res => {
  //       util.toast ('验证码发送成功');
  //       this.countDown (60);
  //     },
  //     err => {
  //       util.toast (err);
  //     }
  //   );
  // }
  componentDidMount () {
    this.subscription = DeviceEventEmitter.addListener ('sendCode', () => {
      util.toast ('ok');
      let phone = this.state.phone;
      API.sendVCode (phone)
        .then (() => {
          util.toast ('发送验证码成功');
        })
        .catch (err => {
          util.toast ('发送验证码失败');
        });
    });
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>请先获取短信验证码</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inpt}
            placeholder="请输入手机号"
            onChangeText={this._toPhone}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inpt}
            placeholder="请输入验证码"
            onChangeText={this._toVCode}
          />
          {/* <Text onPress={this._sendCode.bind (this)}>{this.state.btnText}</Text> */}
          <CountDown phone={this.state.phone} />
        </View>

        {/* <TouchableOpacity style={styles.btnNoColor}>
          <Button
            onPress={this.toOther.bind (this)}
            title="下一步"
            accessibilityLabel="nextStep"
            color="#c2c2c2"
          />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.btnNoColor}>
          <Button
            onPress={this._formSubmit.bind (this)}
            title="下一步"
            accessibilityLabel="nextStep"
            color="#d0d0d0"
          />
        </TouchableOpacity>
      </View>
    );
  }
  componentWillUnmount () {
    // this.timer && clearTimeout (this.timer);
    this.subscription.remove ();
  }
}

const styles = StyleSheet.create ({
  container: {
    // flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#323232',
    fontWeight: '900',
    marginTop: 20,
    marginLeft: 30,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 22,
    marginTop: 30,
    width: 310,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#979797',
    borderRadius: 4,
  },
  btnNoColor: {
    height: 40,
    lineHeight: 40,
    fontSize: 16,
    borderRadius: 4,
    width: 319,
    color: '#fff',
    // backgroundColor: '#c2c2c2',
    marginLeft: 22,
    marginTop: 50,
  },
  inpt: {
    // marginTop: 23,
    // marginBottom: 30,
  },
  // bottom: {
  //   marginBottom: 30,
  // },
  // welcome: {
  //   fontSize: 10,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
