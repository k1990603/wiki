import Toast from 'react-native-root-toast';
const validators = {
  phone: /^1[3456789]\d{9}$/,
  pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
};
const toast = function (tip, options = {}) {
  let defaultOptions = {
    position: Toast.positions.CENTER,
    animation: true,
  };
  Toast.show (tip, {
    ...defaultOptions,
    ...options,
  });
};
export default {
  validators,
  toast,
};
