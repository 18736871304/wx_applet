import http from '../../utils/http.js';
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    link: "https://insure.meihualife.com/mh0002/images",
    nickName: '',
    avatarUrl: '',
    guan: '/index/golden_crown.png',
    registertime: '', //天数
    currentTab: 3,
    equity_txt: '展开',
    equity_src: 'https://insure.meihualife.com/mh0002/images/my/arrow_bottom.png',
    selectedFlag: false,
    callus: false,
    kefu: false,
    equityList: [{
        src: "/my/policy.png",
        lock: false
      },
      {
        src: "/my/service.png",
        lock: false
      },
      {
        src: "/my/examine.png",
        lock: false
      },
      {
        src: "/my/lawyer.png",
        lock: false
      }, {
        src: "/my/jiuyi.png",
        lock: true
      },
      {
        src: "/my/serious.png",
        lock: true
      },
      {
        src: "/my/family.png",
        lock: true
      }, {
        src: "/my/medicine.png",
        lock: true
      },
      {
        src: "/my/licai.png",
        lock: true
      },
    ],

    quanyiNum: 0,
    rightList: [],
    level: "01",
    points: "0",
    // 权益解锁
    policyGroup: '',
    prepay: '',
    doctor: '',
    serious: '',
    familyDoctor: '',
    drugs: '',
    adviser: '',
    lawyer: '',
    //积分情况
    silverPoints: 0,
    goldenPoints: 0,
    platinumPoints: 0,
    diamondPoints: 0,
    millionairePoints: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      avatarUrl: wx.getStorageSync('avatarurl'),
      nickName: wx.getStorageSync('nickName')
    })
    this.getMinePageInfo()
    wx.hideLoading();
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
  // 客户基本信息
  getMinePageInfo() {
    var that = this
    http({
      url: 'getMinePageInfo',
      method: 'POST',
      data: {},
      success(res, header) {
        if (res.code == '0') {



          that.setData({
            registertime: that.checkDate(res.registertime),
            rightList: res.rightList,
            level: res.level,
          })
          that.openData(res.rightList)
          that.accPoints(res.level, res.points)
        }
      }
    })
  },
  // 会员展示
  accPoints(aa, bb) {
    if (aa == '01') {
      this.setData({
        currentTab: 0,
        silverPoints: 0,
        goldenPoints: 0,
        platinumPoints: 0,
        diamondPoints: 0,
        millionairePoints: 0,
        guan: '/index/bronze_crown.png'
      })
    } else if (aa == '02') {
      this.setData({
        currentTab: 1,
        guan: '/index/silver_crown.png'
      })
    } else if (aa == '03') {
      this.setData({
        currentTab: 2,
        guan: '/index/golden_crown.png'
      })
    } else if (aa == '04') {
      this.setData({
        currentTab: 3,
        guan: '/index/platinum_crown.png'
      })
    } else if (aa == '05') {
      this.setData({
        currentTab: 4,
        guan: '/index/diamond_crown.png'
      })
    } else if (aa == '06') {
      this.setData({
        currentTab: 5,
        guan: '/index/Millionaire_crown.png'
      })
    }

    if (1 < bb && bb < 20000) {
      this.setData({
        silverPoints: 1,
        goldenPoints: bb,
        platinumPoints: bb,
        diamondPoints: bb,
        millionairePoints: bb,
      })
    } else if (20000 < bb && bb < 80000) {
      this.setData({
        silverPoints: 1,
        goldenPoints: 20000,
        platinumPoints: bb,
        diamondPoints: bb,
        millionairePoints: bb,
      })
    } else if (80000 < bb && bb < 150000) {
      this.setData({
        silverPoints: 1,
        goldenPoints: 20000,
        platinumPoints: 80000,
        diamondPoints: bb,
        millionairePoints: bb,
      })
    } else if (150000 < bb && bb < 500000) {
      this.setData({
        silverPoints: 1,
        goldenPoints: 20000,
        platinumPoints: 80000,
        diamondPoints: 150000,
        millionairePoints: bb
      })
    } else if (bb > 500000) {
      this.setData({
        silverPoints: 1,
        goldenPoints: 20000,
        platinumPoints: 80000,
        diamondPoints: 150000,
        millionairePoints: 500000
      })
    }
  },
  // 数据归类
  openData(aa) {
    var policy = {}
    var policyGroup = {}
    var prepay = {}
    var doctor = {}
    var serious = {}
    var familyDoctor = {}
    var drugs = {}
    var adviser = {}
    var lawyer = {}
    var dd = []
    var dataList = this.data.rightList
    for (var i = 0; i < dataList.length; i++) {
      if (dataList[i].rightkey == "00010001") {
        policy.isvalid = dataList[i].isvalid
        policy.rightname = "保单云托管"
        policy.src = "/my/policy.png"
      } else if (dataList[i].rightkey == "00010002") {
        policyGroup.isvalid = dataList[i].isvalid
        policyGroup.rightname = "保单服务群"
        policyGroup.src = "/my/service.png"
      } else if (dataList[i].rightkey == "00010004") {

        prepay.isvalid = dataList[i].isvalid
        prepay.rightname = "预理赔审核"
        prepay.src = "/my/examine.png"
      } else if (dataList[i].rightkey == "00020001") {

        doctor.isvalid = dataList[i].isvalid
        doctor.rightname = "就医绿通"
        doctor.src = "/my/jiuyi.png"
      } else if (dataList[i].rightkey == "00020002") {

        serious.isvalid = dataList[i].isvalid
        serious.rightname = "重疾绿通"
        serious.src = "/my/serious.png"
      } else if (dataList[i].rightkey == "00020003") {

        familyDoctor.isvalid = dataList[i].isvalid
        familyDoctor.rightname = "家庭医生"
        familyDoctor.src = "/my/family.png"
      } else if (dataList[i].rightkey == "00020004") {

        drugs.isvalid = dataList[i].isvalid
        drugs.rightname = "购药优惠"
        drugs.src = "/my/medicine.png"
      } else if (dataList[i].rightkey == "00060001") {

        adviser.isvalid = dataList[i].isvalid
        adviser.rightname = "理财经理"
        adviser.src = "/my/licai.png"
      } else if (dataList[i].rightkey == "00010003") {
        lawyer.isvalid = dataList[i].isvalid
        lawyer.rightname = "律师服务"
        lawyer.src = "/my/lawyer.png"
      }
    }

    dd.push(policy)
    dd.push(policyGroup)
    dd.push(prepay)
    dd.push(lawyer)
    dd.push(doctor)
    dd.push(serious)
    dd.push(familyDoctor)
    dd.push(drugs)
    dd.push(adviser)

    var quanyiNum = 0
    for (var i = 0; i < dd.length; i++) {
      if (dd[i].isvalid == "Y") {
        quanyiNum = quanyiNum + 1
      }
    }


    this.setData({
      equityList: dd,
      quanyiNum: quanyiNum
    })
  },
  // 权益
  equity(e) {
    if (e.currentTarget.dataset.isvalid == 'Y') {
      wx.showLoading({
        title: '加载中',
      });
      if (e.currentTarget.dataset.rightname == "保单云托管") {
        wx.switchTab({
          url: "/pages/policy/policy",
        })
      } else if (e.currentTarget.dataset.rightname == "保单服务群") {
        wx.navigateTo({
          url: '/pages/policyGroup/policyGroup',
        })
      } else if (e.currentTarget.dataset.rightname == "预理赔审核") {
        wx.navigateTo({
          url: '/pages/prepay/prepay',
        })
      } else if (e.currentTarget.dataset.rightname == "律师服务") {
        wx.navigateTo({
          url: '/pages/lawyer/lawyer',
        })
      } else if (e.currentTarget.dataset.rightname == "就医绿通") {
        wx.navigateTo({
          url: '/pages/doctor/doctor',
        })
      } else if (e.currentTarget.dataset.rightname == "重疾绿通") {
        wx.navigateTo({
          url: '/pages/serious/serious',
        })
      } else if (e.currentTarget.dataset.rightname == "家庭医生") {
        wx.navigateTo({
          url: '/pages/familyDoctor/familyDoctor',
        })
      } else if (e.currentTarget.dataset.rightname == "购药优惠") {
        wx.navigateTo({
          url: '/pages/drugs/drugs',
        })
      } else if (e.currentTarget.dataset.rightname == "理财经理") {
        wx.navigateTo({
          url: "/pages/financial/financial?title=美华保险理财顾问",
        })
      }
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

  // 轮播图
  switchTab(event) {
    var cur = event.detail.current;
    if (event.detail.source === "touch") {
      this.setData({
        currentTab: cur
      })
    }
  },
  // 展开折叠选择  
  changeToggle: function (e) {
    if (this.data.selectedFlag) {
      this.data.selectedFlag = false;
      this.data.equity_txt = "展开";
    } else {
      this.data.selectedFlag = true;
      this.data.equity_txt = "收起";
    }
    this.setData({
      selectedFlag: this.data.selectedFlag,
      equity_txt: this.data.equity_txt
    })
  },
  // 客户联系我们
  callus: function () {
    var that = this
    http({
      url: 'getQWUrl',
      method: 'POST',
      data: {},
      success(res, header) {
        that.setData({
          qwurl: res.qwurl,
          // qwurl: '',
          callus: true
        })
      }
    })

  },







  close() {
    //点击x号关闭
    this.setData({
      callus: false
    })
  },
  clickefu: function () {
    this.setData({
      kefu: true
    })
  },
  kefuClose() {
    //点击x号关闭
    this.setData({
      kefu: false
    })
  },
  order() {
    wx.showModal({
      title: "美华温馨提示",
      content: "此功能暂未上线，敬请期待",
      showCancel: false,
      confirmColor: '#2FB385'
    })
    // wx.navigateTo({
    //   url: "/pages/order/order",
    // })
  },

  checkDate: function (endTime) {
    //日期格式化
    var myDate = new Date();
    var nowTime = myDate.getTime()
    // var start_date = new Date(startTime.replace(/-/g, "/"));
    var end_date = new Date(endTime.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var ms = nowTime - end_date.getTime();
    //转换成天数
    var day = parseInt(ms / (1000 * 60 * 60 * 24));
    //do something
    return day
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