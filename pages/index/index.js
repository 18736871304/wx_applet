import http from '../../utils/http.js';
const app = getApp()
// "navigationStyle":"custom",
Page({
  data: {
    quanyi:false,
    navbar: {
      shoppingName: '首页',
    },
    islogin: true,
    link: "https://insure.meihualife.com/mh0002/images",
    nickName: '',
    avatarUrl: 'https://insure.meihualife.com/mh0002/images/index/user.png',
    guan: '/index/bronze_crown.png',
    pointsNum: 0,
    navData: [{
      id: 0,
      name: "保单服务"
    }, {
      id: 1,
      name: "医疗服务"
    }, {
      id: 2,
      name: "理财顾问"
    }, {
      id: 3,
      name: "法律咨询"
    }],
    rightList: [],
    level: "01",
    peopleCount: 0,
    points: "0",
    maxpoints: '',
    policyCount: 0,
    currentTab: 0,
    // 权益解锁
    policyGroup: '',
    prepay: '',
    doctor: '',
    serious: '',
    familyDoctor: '',
    drugs: '',
    adviser: '',
    lawyer: '',
  },
  //事件处理函数
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    });
    var nickName = wx.getStorageSync('nickName')
    if (nickName == '') {
      // wx.reLaunch({
      //   url: "/pages/updataLogin/updataLogin",
      // })
    } else {
      this.setData({
        islogin: false,
        avatarUrl: wx.getStorageSync('avatarurl'),
        nickName: wx.getStorageSync('nickName')
      })
      this.progressiveLoad() // 渐进式加载数据，逐步隐藏 loading
      this.getHomePageInfo()
    }
    wx.hideLoading();

  },
  // /渐进式加载数据，逐步隐藏 loading
  progressiveLoad() {
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1000)
  },

  // 监听是否登录
  onTabItemTap() {
    let self = this
    if (!wx.getStorageSync('nickName')) {
      wx.showModal({
        title: '提示',
        content: '账号尚未登录，请先登录账号',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/updataLogin/updataLogin'
            })
          } else if (res.cancel) {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        }
      })
    } else {

    }
  },
  login() {
    this.onTabItemTap()
  },
  // 客户基本信息
  getHomePageInfo() {
    var that = this
    http({
      url: 'getHomePageInfo',
      method: 'POST',
      data: {},
      success(res, header) {
        if (res.code == '0') {
          if (parseInt(res.points) >parseInt(res.maxpoints)) {
            res.points = res.maxpoints
          }
          that.setData({
            rightList: res.rightList,
            level: res.level,
            points: res.points,
            policyCount: res.policyCount,
            peopleCount: res.peopleCount,
            maxpoints: res.maxpoints,
          })
          that.openData(res.rightList)
          that.accPoints(res.level)
        }

      }
    })
  },
  // 会员展示
  accPoints(aa) {
    if (aa == '01') {
      this.setData({
        guan: '/index/bronze_crown.png'
      })
    } else if (aa == '02') {
      this.setData({
        guan: '/index/silver_crown.png'
      })
    } else if (aa == '03') {
      this.setData({
        guan: '/index/golden_crown.png'
      })
    } else if (aa == '04') {
      this.setData({
        guan: '/index/platinum_crown.png'
      })
    } else if (aa == '05') {
      this.setData({
        guan: '/index/diamond_crown.png'
      })
    } else if (aa == '06') {
      this.setData({
        guan: '/index/Millionaire_crown.png'
      })
    }
  },


  // 数据归类
  openData(aa) {
    var policyGroup, prepay, doctor, serious, familyDoctor, drugs, adviser, lawyer
    var dataList = this.data.rightList
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].rightkey == "00010002") {
        policyGroup = dataList[i].isvalid
      } else if (dataList[i].rightkey == "00010004") {
        prepay = dataList[i].isvalid
      } else if (dataList[i].rightkey == "00020001") {
        doctor = dataList[i].isvalid
      } else if (dataList[i].rightkey == "00020002") {
        serious = dataList[i].isvalid
      } else if (dataList[i].rightkey == "00020003") {
        familyDoctor = dataList[i].isvalid
      } else if (dataList[i].rightkey == "00020004") {
        drugs = dataList[i].isvalid
      } else if (dataList[i].rightkey == "00060001") {
        adviser = dataList[i].isvalid
      } else if (dataList[i].rightkey == "00010003") {
        lawyer = dataList[i].isvalid
      }
    }
    this.setData({
      policyGroup: policyGroup,
      prepay: prepay,
      doctor: doctor,
      serious: serious,
      familyDoctor: familyDoctor,
      drugs: drugs,
      adviser: adviser,
      lawyer: lawyer,
    })

  },


  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    // wx.showLoading({
    //   title: '加载中',
    // });

    var cur = event.detail.current;
    if (event.detail.source === "touch") {
      this.setData({
        currentTab: cur
      })
    }
    // wx.hideLoading();
  },
  // gonn
  qunyi() {
    wx.showModal({
      title: "美华温馨提示",
      content: "此功能暂未上线，敬请期待",
      showCancel: false,
      confirmColor: '#2FB385'
    })
  },



  // hotSearch: function () {
  //   var that = this;
  //   http({
  //     url: 'Hotsearch',
  //     method: 'POST',
  //     data: {},
  //     success(res, header) {
  //       that.setData({
  //         hotSearch: res.data
  //       })
  //     }
  //   })
  // },



  // 页面跳转到二级页面
  policyGroup: function () {
    if (this.data.policyGroup != "N") {
      wx.showLoading({
        title: '加载中',
      });
      wx.navigateTo({
        url: '/pages/policyGroup/policyGroup',
      })
      wx.hideLoading();
    } else {
      wx.showModal({
        title: "美华温馨提示",
        content: "您还未解锁此项权益",
        showCancel: false,
        confirmColor: '#2FB385'
      })

    }
  },
  adviser: function () {
    if (this.data.adviser != "N") {
      wx.showLoading({
        title: '加载中',
      });
      wx.navigateTo({
        url: "/pages/financial/financial?title=美华保险理财顾问",
      })
      wx.hideLoading();
    } else {
      wx.showModal({
        title: "美华温馨提示",
        content: "您还未解锁此项权益",
        showCancel: false,
        confirmColor: '#2FB385'
      })
    }
  },

  lawyer: function () {
    if (this.data.lawyer != "N") {
      wx.showLoading({
        title: '加载中',
      });
      wx.navigateTo({
        url: '/pages/lawyer/lawyer',
      })
      wx.hideLoading();
    } else {
      wx.showModal({
        title: "美华温馨提示",
        content: "您还未解锁此项权益",
        showCancel: false,
        confirmColor: '#2FB385'
      })
    }
  },

  prepay: function () {
    if (this.data.prepay != "N") {
      wx.showLoading({
        title: '加载中',
      });
      wx.navigateTo({
        url: '/pages/prepay/prepay',
      })
      wx.hideLoading();
    } else {
      wx.showModal({
        title: "美华温馨提示",
        content: "您还未解锁此项权益",
        showCancel: false,
        confirmColor: '#2FB385'
      })
    }
  },

  serious: function () {
    if (this.data.serious != "N") {
      wx.showLoading({
        title: '加载中',
      });
      wx.navigateTo({
        url: '/pages/serious/serious',
      })
      wx.hideLoading();
    } else {
      wx.showModal({
        title: "美华温馨提示",
        content: "您还未解锁此项权益",
        showCancel: false,
        confirmColor: '#2FB385'
      })
    }
  },
  familyDoctor: function () {
    if (this.data.familyDoctor != "N") {
      wx.showLoading({
        title: '加载中',
      });
      wx.navigateTo({
        url: '/pages/familyDoctor/familyDoctor',
      })
      wx.hideLoading();
    } else {
      wx.showModal({
        title: "美华温馨提示",
        content: "您还未解锁此项权益",
        showCancel: false,
        confirmColor: '#2FB385'
      })
    }
  },
  doctor: function () {
    if (this.data.doctor != "N") {
      wx.showLoading({
        title: '加载中',
      });
      wx.navigateTo({
        url: '/pages/doctor/doctor',
      })
      wx.hideLoading();
    } else {
      wx.showModal({
        title: "美华温馨提示",
        content: "您还未解锁此项权益",
        showCancel: false,
        confirmColor: '#2FB385'
      })
    }
  },

  drugs: function () {
    if (this.data.drugs != "N") {
      wx.showLoading({
        title: '加载中',
      });
      wx.navigateTo({
        url: '/pages/drugs/drugs',
      })
      wx.hideLoading();
    } else {
      wx.showModal({
        title: "美华温馨提示",
        content: "您还未解锁此项权益",
        showCancel: false,
        confirmColor: '#2FB385'
      })
    }
  },


  Topolicy: function () {
    wx.switchTab({
      url: '/pages/policy/policy',
    })
  },

  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
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