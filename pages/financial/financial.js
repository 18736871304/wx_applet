// pages/policyGroup/policyGroup.js
import http from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: "https://insure.meihualife.com/mh0002/images",
    qwurl: '',
    title: '美华保险理财顾问'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      title: options.title,
    })
    this.callus();
    wx.hideLoading();
  },
  callus: function () {
    var that = this
    http({
      url: 'getQWUrl',
      method: 'POST',
      data: {},
      success(res, header) {
        if( res.qwurl!=''){
          that.setData({
            qwurl: res.qwurl,
          })
        }else{
          that.setData({
            qwurl: '../../images/kefu.png',
          })
        }
       
      }
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