import api from '../util/api';
// import * as api2 from '../util/request';
export function loginByPwd(phone, password) {
  let postbody = {
    loginName: phone,
    password: password,
  };
  return api.post('/applets/provider/login', postbody);
}

export function login(phone, vCode) {
  let postbody = {
    loginType: 'APPLETS_PROVIDER',
    phone: phone,
    vCode: vCode,
  };
  return api.postJson('/applets/customUser/login', postbody);
}
export function sendVCode(phone) {
  return api.post('/applets/customUser/sendCode', {
    phone
  });
}
export function getOrderList(body) {
  body = {
    pageNo: 1,
    pageSize: 20,
    deliverStatus: '',
    orderByWhat: '',
    orderDateBegin: '',
    orderDateEnd: '',
    goodsDeliveryDateBegin: '',
    goodsDeliveryDateEnd: '',
    sort: '',
    customName: '',
  };
  return api.get('/applets/provider/order/findOrderListByUserId', body);
}


/**
 * 找回密码点击下一步
 * @param {*} phone 
 * @param {*} vCode 
 */
export function findPasswordNextStep(phone, vCode) {
  let postBody = {
    phone: phone,
    phoneVCode: vCode,
  };
  return api.post('/applets/buyer/pwdNextStep', postBody);
}

/**
 * 找回密码:设置新密码
 * @param {*} password 
 * @param {*} authorizationCode 
 */
export function findPassword(password, authorizationCode) {
  let postbody = {
    password: password,
    authorizationCode: authorizationCode,
  };
  return api.post('/applets/buyer/findPassword', postbody);
}

/**
 * 修改密码
 * @param {*} phone 
 * @param {*} password 
 */
export function setPassword(phone, password) {
  let postbody = {
    phone: phone,
    confirmNewPwd: password,
    newPwd: password,
  };
  return api.postJson('/applets/customUser/newPassword', postbody);
}
