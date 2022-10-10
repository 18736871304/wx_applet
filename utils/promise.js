import { API } from 'api.js';
//同步请求
const promise = (request) => {
  let qkToken;
  try {
    qkToken = wx.getStorageSync('qk-auth-token');
  } catch (e) { }
  let header;
  if (qkToken !== 'undefined') {
    header = {
      'qk-auth-token': qkToken
    }
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: API[request.url],
      header,
      data: request.data,
      method: request.method,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        if (request.complete) {
          request.complete()
        }
      }
    })
  })
}


export default promise;