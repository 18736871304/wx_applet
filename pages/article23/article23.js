// pages/article/article01.js
import http from '../../utils/http.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearch: '',
    code: '',
    title: '',
    titleTwo: '',
    middlecontent: '',
    middlecontent1: '',
    bottomcontent: '',
    bottomcontentTwo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    this.getToken();


  },
  getToken: function () {
    //获取access_token
    wx.login({
      success: res => {

        const appid = "wx934f4a92de4f081e" // 这里填写你的appid
        const secret = "92dac275177b66539204410a4872bd34" // 这里填写你的secret
        wx.request({
          url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(res.data.access_token)
            // console.log("at微信小程序" + res.data.access_token)
            // that.access_token = res.data.access_token
            // console.log("onload:" + that.access_token)
            // wx.setStorageSync('at', res.data.access_token)
          },
          fail(error) {
            console.log(error)
          }
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})