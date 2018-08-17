/**
 * Created by shangri-la on 2018/8/16.
 */

import config from '../config';
export default{
  initWebSocket(){
    var websocket = null;
    if ('WebSocket' in window) {
      websocket = new WebSocket(config.webSocket.URI);
    } else {
      console.log('该浏览器不支持websocket!');
    }

    websocket.onopen = function (event) {
      console.log('建立连接');
    }

    websocket.onclose = function (event) {
      console.log('连接关闭');
    }

    websocket.onmessage = function (event) {
      console.log('收到消息:' + event.data)
    }

    websocket.onerror = function () {
      alert('websocket通信发生错误！');
    }
    return websocket;
  }

}