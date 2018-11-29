// let env = 'develop';  //  production  test
let env = 'test'; //  production  test
// let env = 'production';  //  production  test

let config_dev = {
  apiUrl: 'http://172.31.75.184:8080/vsc',
};

let config_test = {
  // apiUrl: 'http://172.31.75.179:8080/vsc'
  apiUrl: 'https://apptest.netease.im',
};

let config_production = {
  apiUrl: 'https://vsc.zhilink.com/api/vsc',
};

let config;
if (env === 'production') {
  config = config_production;
} else if (env === 'test') {
  config = config_test;
} else {
  config = config_dev;
}

export default config;
