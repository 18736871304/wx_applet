import {
  API
} from './api';
// import toast from './toast.js';
const App = getApp()

var token = wx.getStorageSync('token')
var qkauthtoken = token
//异步请求
function http(request) {
  let qkToken;
  try {
    qkToken = qkauthtoken;
  } catch (e) {}
  if (!request.dataType) {
    request.dataType = 'json'
  }
  let header;
  if (qkToken !== 'undefined') {
    header = {
      'qk-auth-token': qkauthtoken
    }
  }
  var cookieStr = ""; //请求报文头中cookie的字符串
  // var Cookie = App.globalData.cookie; //获取全局变量中的cookie内容
  var Cookie = wx.getStorageSync('cookie'); //获取全局变量中的cookie内容
  cookieStr = Cookie;

  if ("header" in request) {
    header = request.header;
    header["Cookie"] = cookieStr;
  } else {
    header["Cookie"] = cookieStr;
  }
  header['content-type'] = 'application/x-www-form-urlencoded'
  wx.request({
    url: API[request.url],
    header,
    data: request.data,
    dataType: request.dataType,
    method: request.method,
    success: function (res) {
      //先将检查服务器返回报文头中有无sessionId，有则存到全局变量中
      var cookie = res.header["Set-Cookie"];
      if (undefined != cookie) {
        var sessionPos;

        if ((sessionPos = cookie.indexOf("JSESSIONID=")) != -1) {
          //每次请求成功都将sessionId存入全局变量
          // App.globalData.cookie = cookie.substring(sessionPos, 64);
          wx.setStorageSync('cookie', cookie.substring(sessionPos, 64))
        }
      }
      request.success(res.data, res.header, res)
    },
    fail: function (err) {
      if (request.fail) {
        request.fail()
      }
    },
    complete() {
      if (request.complete) {
        request.complete()
      }
    }
  });
}

export default http;