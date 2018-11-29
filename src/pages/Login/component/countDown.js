import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import util from '../../../util/util'
export default class CountDown extends Component {
  timer = null;
  phone = '';
  constructor(props) {
    super(props)

    this.phone = this.props.phone;
    this.state = {
      btn_text: '获取验证码',
      seconds: 59,
      timer: null,
      showVcode: true,
      _phone: this.props.phone
    }
  }
  _onGetCode() {
    if (!this.state._phone) {
      util.toast('手机号不能为空');
      return false;
    }
    if (!util.validators.phone.test(this.state._phone)) {
      util.toast('手机号格式不正确');
      return false;
    }
    this.timer = setInterval(() => {
      if (this.state.seconds == 0) {
        clearInterval(this.timer);
        this.setState({
          seconds: 60,
          showVcode: true
        })
      }
      this.setState({
        seconds: --this.state.seconds
      })
    }, 1000);
    this.setState({
      showVcode: false
    });
    DeviceEventEmitter.emit('sendCode');
  }
  render() {
    return (
      this.state.showVcode ?
        <TouchableOpacity activeOpacity={0.9} onPress={() => { this._onGetCode() }}>
          <Text style={[styles.geCode]}>{this.state.btn_text}</Text>
        </TouchableOpacity>
        :
        <Text style={[styles.geCode, styles.hasSend]}>{'已发送' + this.state.seconds + '秒'}</Text>
    )
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      _phone: nextProps.phone
    })
  }
}
const styles = StyleSheet.create({
  geCode: {
    color: '#008ee3',
    width: 100,
    textAlign: 'center'
  },
  hasSend: {
    color: '#dddddd'
  }
})
