import NIM from '../util/NIM_Web_NIM_rn_v5.8.0';
var nim = NIM.getInstance ({
  onroamingmsgs: onRoamingMsgs,
  onofflinemsgs: onOfflineMsgs,
  onmsg: onMsg,
});
function onRoamingMsgs (obj) {
  console.log ('收到漫游消息', obj);
  pushMsg (obj.msgs);
}
function onOfflineMsgs (obj) {
  console.log ('收到离线消息', obj);
  pushMsg (obj.msgs);
}
function onMsg (msg) {
  console.log ('收到消息', msg.scene, msg.type, msg);
  pushMsg (msg);
  switch (msg.type) {
    case 'custom':
      onCustomMsg (msg);
      break;
    case 'notification':
      // 处理群通知消息
      onTeamNotificationMsg (msg);
      break;
    // 其它case
    default:
      break;
  }
}
function pushMsg (msgs) {
  if (!Array.isArray (msgs)) {
    msgs = [msgs];
  }
  var sessionId = msg[0].scene + '-' + msgs[0].account;
  data.msgs = data.msgs || {};
  data.msgs[sessionId] = nim.mergeMsgs (data.msgs[sessionId], msgs);
}
function onCustomMsg (msg) {
  // 处理自定义消息
}
