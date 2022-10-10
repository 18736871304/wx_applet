// pages/prepay/prepay.js
import http from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: "https://insure.meihualife.com/mh0002/images",
    cardno: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getJDHealthCard()
  },

  getJDHealthCard: function () {
    var that = this;
    http({
      url: 'getJDHealthCard',
      method: 'POST',
      data: {},
      success(res, header) {
        that.setData({
          cardno: res.cardno
        })
      }
    })
  },



  copy: function (e) {
    wx.setClipboardData({
      data: e.target.dataset.code, //复制的数据
     
      success: (res) => {
        wx.showToast({
          title: '复制成功',
          duration: 2000,
          mask: false,
        })
      },
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})