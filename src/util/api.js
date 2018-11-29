import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config';

let token = '';
let syncToken = () => {
  // 从storage异步获取token,传递给静态变量
  return AsyncStorage.getItem('token').then(res => {
    token = res || '';
  });
}

let request = (option) => {
  // 请求之前异步获取token, 再桥接请求
  let promise1 = syncToken();
  let promise2 = axios(option);
  return promise1.then(() => promise2);
}

//请求拦截器
axios.interceptors.request.use(config => {
  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(response => {
  let res = response.data;
  if (!res || !res.head) {
    throw new Error('请求失败,请确认远程服务是否正常运行');
  }

  if (res.head.status == 1) {
    return res.body;
  } else if (res.head.errorCode === '999') {
    return Promise.reject('您的登录令牌已失效');
  } else {
    return Promise.reject(res.head.errorMsg);
  }
}, error => {
  let status = error && error.response && error.response.status;
  switch (status) {
    case 400:
      return Promise.reject('错误请求');
    case 401:
      return Promise.reject('未授权，请重新登录');
    case 403:
      return Promise.reject('拒绝访问');
    case 404:
      return Promise.reject('请求错误,未找到该资源');
    case 405:
      return Promise.reject('请求方法未允许');
    case 408:
      return Promise.reject('请求超时');
    case 500:
      return Promise.reject('服务器端出错');
    case 501:
      return Promise.reject('网络未实现');
    case 502:
      return Promise.reject('网络错误');
    case 503:
      return Promise.reject('服务不可用');
    case 504:
      return Promise.reject('网络超时');
    case 505:
      return Promise.reject('http版本不支持该请求');
    default:
      return Promise.reject(`连接错误${status}`);
  }
});

axios.defaults.baseURL = config.apiUrl || '/';
axios.defaults.timeout = 10000;

//设置默认请求头
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['Accept'] = 'application/json';

export default {
  get(url, params) {
    return request({
      method: 'get',
      url,
      params
    });
  },
  post(url, params) {
    return request({
      method: 'post',
      url,
      params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  },
  postJson(url, data) {
    return request({
      method: 'post',
      url,
      data,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
