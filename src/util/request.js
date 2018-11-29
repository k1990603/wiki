import {AsyncStorage} from 'react-native';
import {BASE_URL} from '../config';
// const BASE_URL = 'http://172.31.75.179:8080/vsc/';
let CurTime = '123456789';
let Nonce = '123456789';
function reqPost (
  url,
  formData,
  option = {
    method: 'POST',
    contentType: 'form',
  }
) {
  if (!url.startsWith ('https')) url = BASE_URL + url;
  let token = AsyncStorage.getItem ('token');
  let headers = {
    Accept: 'application/json',
  };
  if (option.method === 'POST' && option.contentType === 'form') {
    headers['content-type'] = 'application/x-www-form-urlencoded';
  }
  headers['AppKey'] = '708e7d4445de7d60502414f88f768ce9';
  headers['Nonce'] = Nonce;
  headers['CurTime'] = CurTime;
  headers['CheckSum'] = 'b3db157bc8c6' + Nonce + CurTime;
  if (token) {
    headers['token'] = token;
  }

  return new Promise (function (resolve, reject) {
    fetch (url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify (formData),
    })
      .then (response => {
        if (response.ok) {
          return response.json ();
        } else {
          reject ({status: response.status});
        }
      })
      .then (response => {
        resolve (response.body);
      })
      .catch (err => {
        let message = '';
        let status = error && error.response && error.response.status;
        switch (status) {
          case 400:
            message = '错误请求';
            break;
          case 401:
            message = '未授权，请重新登录';
            break;
          case 403:
            message = '拒绝访问';
            break;
          case 404:
            message = '请求错误,未找到该资源';
            break;
          case 405:
            message = '请求方法未允许';
            break;
          case 408:
            message = '请求超时';
            break;
          case 500:
            message = '服务器端出错';
            break;
          case 501:
            message = '网络未实现';
            break;
          case 502:
            message = '网络错误';
            break;
          case 503:
            message = '服务不可用';
            break;
          case 504:
            message = '网络超时';
            break;
          case 505:
            message = 'http版本不支持该请求';
            break;
          default:
            message = `连接错误${status}`;
        }
        reject (message);
      });
  });
}

export function get (
  url,
  params,
  headers = {contentType: 'application/json;charset=UTF-8'}
) {
  if (!url.startsWith ('https')) url = BASE_URL + url;
  let token = '';
  AsyncStorage.getItem ('token', (err, resoult) => {
    if (error) {
      alert ('读取token失败');
    } else {
      console.log (result);
      token = result;
    }
  });
  if (params) {
    let paramsArray = [];
    Object.keys (params).forEach (key =>
      paramsArray.push (key + '=' + params[key])
    );
    if (url.search (/\?/) === -1) {
      url += '?' + paramsArray.join ('&');
    } else {
      url += '&' + paramsArray.join ('&');
    }
  }
  if (token) {
    headers['token'] = token;
  }
  return new Promise (function (resolve, reject) {
    fetch (url, {
      method: 'GET',
      headers: headers,
    })
      .then (response => {
        if (response.ok) {
          return response.json ();
        } else {
          reject ({status: response.status});
        }
      })
      .then (response => {
        console.log ('--resres--', response);
        resolve (response);
      })
      .catch (err => {
        reject ({status: -1});
      });
  });
}

export function post (url, formData) {
  return reqPost (
    url,
    formData,
    (option = {
      method: 'POST',
      contentType: 'form',
    })
  );
}
export function postJson (url, formData) {
  return reqPost (
    url,
    formData,
    (option = {
      method: 'POST',
      contentType: 'json',
    })
  );
}
