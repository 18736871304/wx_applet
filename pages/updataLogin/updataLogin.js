import http from '../../utils/http.js';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    link: "https://insure.meihualife.com/mh0002/images",
    navbar: {
      shoppingName: '授权页',
    },
    dialog: false,
    dialog2: false,
    avatarurl: '',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getuserInfo(e) { //
    this.getPhoneNumber(e) 
    var that = this
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: (res) => {
        var rawData = JSON.parse(res.rawData)
        that.setData({
          avatarurl: res.userInfo.avatarUrl,
          nickName: rawData.nickName
        })
        wx.setStorageSync('avatarurl', res.userInfo.avatarUrl)
        wx.setStorageSync('nickName', rawData.nickName)
      }
    })
  },

  // 授权
  getPhoneNumber(e) {
    
    http({
      url: 'Login',
      method: 'POST',
      data: {
        code: e.detail.code
      },
      success(res, header) {
        if (res.code == '0') {
          wx.reLaunch({
            url: '/pages/index/index'
          })
        } else {
          // wx.showToast({
          //   title: '登录失败',
          //   icon: 'loading',
          //   mask: true,
          //   duration: 2000
          // });
        }
      },
    })

  },
  // 选中隐私政策
  switchChange: function (e) {
    this.setData({
      switchValue: e.detail.value
    })
  },
  // 打开隐私政策
  open() {
    this.setData({
      dialog: true,
    });
  },
  close() {
    this.setData({
      dialog: false,
    });
  },
  open2() {
    this.setData({
      dialog2: true,
    });
  },
  close2() {
    this.setData({
      dialog2: false,
    });
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