// "entryPagePath": "pages/my/my",

//app.js
App({
  onLaunch: function (options) {

    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    //获取系统信息
    wx.getSystemInfo({
      success: res => {
        //状态栏的高度
        let statusBarHeight = res.statusBarHeight,
          //胶囊按钮与顶部的距离
          navTop = menuButtonObject.top,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        let globalData = this.globalData;
        globalData.navHeight = navHeight; //导航栏高度
        globalData.navTop = navTop; //胶囊按钮与顶部的距离
        globalData.jnheight = menuButtonObject.height; //胶囊的高度
        globalData.jnwidth = menuButtonObject.width; //胶囊的宽度
        globalData.screenHeight = res.screenHeight; //屏幕高度
      },
      fail(err) {
        console.log(err);
      }
    });



    // 展示本地存储能力,登录信息也可以通过缓存功能来处理
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var nickName = wx.getStorageSync('nickName') || []
    var cookie = wx.getStorageSync('cookie') || []
    // if (cookie != '') {
    //   wx.reLaunch({
    //     url: "/pages/index/index",
    //   })
    // } else {
    //   wx.reLaunch({
    //     url: "/pages/updataLogin/updataLogin",
    //   })
    // }
    // 登录
    wx.login({
      success: function (res) {
        const app = getApp()
        app.globalData.code = res.code
        console.log("code：" + app.globalData.code)
        //这里获取code以后，可以向服务器发起请求获取用户的openid
      }
    })

  },
  globalData: {
    userInfo: {},
    hasUserInfo: false,
    openid: "",
    code: "",

    cookie: '',
    navHeight: 0,
    navTop: 0,
    jnheight: 0,
    jnwidth: 0,
    screenHeight: 0,
    imgLink: ''
  },


  //提示--确定
  tipsModal: function (title, msg) {
    wx.showModal({
      title: title,
      content: msg,
      showCancel: false,
      confirmColor: '#2FB385'
    })
  },
  //提示--取消-确定
  tipsModals: function (title, msg) {
    wx.showModal({
      title: title,
      content: msg,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')

        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
    })
  },

  //提示--自定义
  tipsCustom: function (title, msg, cancelText, confirmText) {
    wx.showModal({
      title: title,
      content: msg,
      cancelText: cancelText,
      confirmText: confirmText,
      success(res) {
        if (res.confirm) {
          console.log('用户点击左边')
        } else if (res.cancel) {
          console.log('用户点击右边')
        }
      }
    })
  },

  showLoading: function (message) {
    if (wx.showLoading) {
      // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
      wx.showLoading({
        title: message,
        mask: true
      });
    } else {
      // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
      wx.showToast({
        title: message,
        icon: 'loading',
        mask: true,
        duration: 20000
      });
    }
  },

  hideLoading: function () {
    if (wx.hideLoading) {
      // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
      wx.hideLoading();
    } else {
      wx.hideToast();
    }
  },










})

// {
//   "selectedIconPath": "images/selectSy.png",
//   "iconPath": "images/sy.png",
//   "pagePath": "pages/index/index",
//   "text": "首页"
// },


// {
//   "selectedIconPath": "images/selectOm.png",
//   "iconPath": "images/oneMoney.png",
//   "pagePath": "pages/policyTrust/policyTrust",
//   "text": "保单云托管"
// },  