import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  DeviceEventEmitter,
  Image,
  ScrollView,
} from 'react-native';
import {inject} from 'mobx-react';
import {observer} from 'mobx-react';
import * as API from '../../../api/loginApi';
import util from '../../../util/util';
import {autorun} from 'mobx';

@observer
@inject ('GlobalStore')
export default class RetrievePassword extends Component<{}> {
  constructor (props) {
    super (props);
    // ToastAndroid.show (
    //   this.props.GlobalStore.authorizationCode,
    //   ToastAndroid.LONG
    // );
    this._toPwd = this._toPwd.bind (this);
    this._toPwdCopy = this._toPwdCopy.bind (this);
    this.state = {
      pwd: '',
      pwdCopy: '',
      color: false,
      authorizationCode: '',
    };
  }
  _toPwd (text) {
    if (text != '' && this.state.pwdCopy != '') {
      this.setState ({pwd: text, color: true});
    } else {
      this.setState ({pwd: text, color: false});
    }
    // console.log (this.state.pwd);
  }
  _toPwdCopy (text) {
    // ToastAndroid.show (this.state.pwdCopy, ToastAndroid.LONG);
    if (text != '' && this.state.pwdCopy != '') {
      this.setState ({pwdCopy: text, color: true});
    } else {
      this.setState ({pwdCopy: text, color: false});
    }
  }
  _forSumbit () {
    // alert (this);
    // ToastAndroid.show (this, ToastAndroid.LONG);
    if (this.state.pwd !== '' && this.state.pwdCopy !== '') {
      if (!this.validatePassword (this)) return;
      var password = this.state.pwd;
      // var { singer, music } = this.props.GlobalStore.musicMessage
      var authorizationCode = this.props.GlobalStore.authorizationCode;
      // ToastAndroid.show ('ok', ToastAndroid.LONG);
      API.findPassword (password, authorizationCode).then (
        res => {
          // util.toast ('密码修改成功!');
          ToastAndroid.show ('密码修改成功', ToastAndroid.LONG);
          setTimeout (() => {
            // this.logout ();
          }, 1000);
        },
        err => {
          // util.toast (err || '修改失败,请稍后再试');
          ToastAndroid.show (err || '修改失败,请稍后再试', ToastAndroid.LONG);
          this.setData ({
            repeatPassword: '',
            newPassword: '',
          });
        }
      );
    } else {
      ToastAndroid.show (this.state.pwd, ToastAndroid.SHORT);
    }
  }
  validatePassword (that) {
    var repeatPassword = this.state.pwdCopy;
    var newPassword = this.state.pwd;
    // alert (util.pwd);
    if (repeatPassword != newPassword) {
      ToastAndroid.show ('密码输入不一致', ToastAndroid.SHORT);
      return false;
    }
    if (!util.validators.pwd.test (newPassword)) {
      ToastAndroid.show ('密码格式错误', ToastAndroid.SHORT);
      return false;
    }
    return true;
  }
  componentDidMount () {
    this.deEmitter = DeviceEventEmitter.addListener (
      'authorizationCode',
      authorizationCode => {
        util.toast (authorizationCode);
        this.setState ({authorizationCode});
      }
    );
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>请设置密码</Text>
        <Text style={styles.label}>密码是8-16位数字或英文字母两者组合,可包含特殊字符</Text>
        <View style={{marginLeft: 22, marginTop: 30, width: 310}}>
          <TextInput
            style={styles.inpt}
            placeholder="设置新密码"
            onChangeText={this._toPwd}
            password={true}
          />
          <TextInput
            style={styles.inpt}
            placeholder="重复新密码"
            onChangeText={this._toPwdCopy}
            password={true}
          />
        </View>

        <TouchableOpacity style={styles.btnNoColor}>
          <Button
            onPress={this._forSumbit.bind (this)}
            title="完成"
            accessibilityLabel="complete"
            color="#c2c2c2"
          />
        </TouchableOpacity>
      </View>
    );
  }
  componentWillUnmount () {
    this.deEmitter.remove ();
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
  label: {
    width: 319,
    fontSize: 12,
    color: '#646464',
    marginTop: 12,
    marginBottom: 32,
    marginLeft: 30,
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
    marginBottom: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#979797',
    borderRadius: 4,
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
