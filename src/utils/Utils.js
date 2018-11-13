/**
 * Created by shangri-la on 2018/8/16.
 */

import configs from '../config';

export default{
  httpInit(){
    // 拦截器
    axios.interceptors.request.use(
      config => {
        config.baseURL = configs.api.BASEURL;
        config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    axios.interceptors.response.use(response => {
        if (response.data.code == 202) {
          ElementUI.Message.error({
            message: '此登录信息已过期，请重新登录',
            center: true,
            onClose:function () {
              window.location.href= "/";
            }
          });

        }
        return response
      }, error => {
        return Promise.reject(error)
      }
    )
    return axios;
  },
  webSocketInit(){
    var websocket = null;
    if ('WebSocket' in window) {
      websocket = new WebSocket(configs.webSocket.URI);
    } else {
      console.log('该浏览器不支持websocket!');
    }
    // websocket.onopen = function (event) {
    //   console.log('建立连接');
    // }
    // websocket.onclose = function (event) {
    //   console.log('连接关闭');
    // }
    //
    // websocket.onmessage = function (event) {
    //   console.log('收到消息:' + event.data)
    // }
    //
    // websocket.onerror = function () {
    //   alert('websocket通信发生错误！');
    // }
    return websocket;
  }

}