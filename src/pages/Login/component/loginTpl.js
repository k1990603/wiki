import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import CountDown from './countDown';

function PasswordFrom(props) {
  return (
    <View style={styles.formOne}>
      <TextInput
        style={styles.inputRow}
        value={props.phone}
        placeholder='请输入手机号'
        underlineColorAndroid="transparent"
        onChangeText={(phone) => { props._onPhoneChange(phone) }}
      />
      <TextInput
        style={styles.inputRow}
        value={props.passWord}
        password={true}
        placeholder='请输入密码'
        underlineColorAndroid="transparent"
        onChangeText={(passWord) => { props._onPasswordChange(passWord) }}
      />
      <TouchableOpacity style={styles.forgetPas} activeOpacity={0.9} onPress={() => { props._gotoForgetPsw() }}>
        <Text>忘记密码?</Text>
      </TouchableOpacity>
      {
        props.phone.length > 0 && props.passWord.length > 0 ?
          <TouchableOpacity activeOpacity={0.9} style={[styles.loginBtn, styles.loginBtnActived]} onPress={() => { props._onLoginByPass() }}>
            <Text style={styles.login}>{props.loginBtnTxt}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity activeOpacity={0.9} style={[styles.loginBtn]} >
            <Text style={styles.login}>{props.loginBtnTxt}</Text>
          </TouchableOpacity>
      }

    </View>
  )

}
function VerCodeForm(props) {
  return (
    <View style={styles.formTwo}>
      <View style={[styles.phoneInput, styles.inputRow]}>
        <TextInput
          value={props.phone}
          placeholder='请输入手机号'
          underlineColorAndroid="transparent"
          onChangeText={(phone) => { props._onPhoneChange(phone) }}
        />
      </View>
      <View style={[styles.vertifyInput, styles.inputRow]}>
        <TextInput
          style={{ flex: 1 }}
          value={props.verCode}
          placeholder='请输入验证码'
          underlineColorAndroid="transparent"
          onChangeText={(verCode) => { props._onVerCodeChange(verCode) }}
        />
        <CountDown phone={props.phone}></CountDown>
      </View>
      <TouchableOpacity style={styles.forgetPas} activeOpacity={0.9} onPress={() => { props._gotoForgetPsw() }}>
      </TouchableOpacity>
      {
        props.phone.length > 0 && props.verCode.length > 0 ?
          <TouchableOpacity activeOpacity={0.9} style={[styles.loginBtn, styles.loginBtnActived]} onPress={() => { props._onLoginByVercode() }}>
            <Text style={styles.login}>{props.loginBtnTxt}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity activeOpacity={0.9} style={[styles.loginBtn]} >
            <Text style={styles.login}>{props.loginBtnTxt}</Text>
          </TouchableOpacity>
      }
    </View>
  )

}
const styles = StyleSheet.create({
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

export { PasswordFrom, VerCodeForm }

