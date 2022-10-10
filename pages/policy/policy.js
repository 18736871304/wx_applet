// pages/policy/policy.js
import http from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: "https://insure.meihualife.com/mh0002/images",

    showtab: '',
    navData: [{
      id: 0,
      name: "全部"
    }, {
      id: 1,
      name: "本人"
    }, {
      id: 2,
      name: "配偶"
    }, {
      id: 3,
      name: "父母"
    }, {
      id: 4,
      name: "子女"
    }],
    mainData: [{
      num: 6,
      family: 2,
      preminu: 34535,
      amount: 34,
    }, {
      num: 5,
      family: 2,
      preminu: 34535,
      amount: 34,
    }, {
      num: 4,
      family: 2,
      preminu: 34535,
      amount: 34,
    }, {
      num: 3,
      family: 2,
      preminu: 34535,
      amount: 34,
    }, {
      num: 2,
      family: 2,
      preminu: 34535,
      amount: 34,
    }],
    currentTab: 0,
    hostList: ['全部', '保障中', '待处理', '已失效', '已终止'],
    hostIndex: '1',
    hostName: '',
    policyNum: '0',
    sumamnt: '',
    sumprem: '',
    insuranceInfo: {
      effectiveNum: '',
      protectionNum: '',
      photourl: '',
      realname: ''
    },
    chartsData: [{
      amnt: "0",
      name: "意外险"
    }, {
      amnt: "0",
      name: "医疗险"
    }, {
      amnt: "0",
      name: "重疾险"
    }, {
      amnt: "0",
      name: "定寿"
    }, {
      amnt: "0",
      name: "年金险"
    }],
    policyData: [],
    allPolicyData: [],
    policyLength: 0,
    total_sumamnt: '家庭总保额',
    total_sumprem: '家庭总保费',
    noPolicy: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.getData("01", "'00','01','02','03'")

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
    } else {}
  },
  // 请求数据
  // 保单详情  获取数据
  getData: function (headtype, relatype) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this
    http({
      url: 'GetTrustPolicyData',
      method: 'POST',
      data: {
        headtype: headtype,
        querytype: "00",
        relatype: relatype
      },
      success(res, header) {
        var chartsData = res.chartsData
        var policyData = res.policyData
        if (policyData.length == '0') {
          that.setData({
            noPolicy: true
          })
        } else {
          that.setData({
            noPolicy: false
          })
        }
        that.charts(chartsData)
        that.setData({
          sumprem: res.sumprem,
          sumamnt: res.sumamnt,
          policyData: policyData,
          allPolicyData: policyData,
          // chartsData: that.data.chartsData,
          insuranceInfo: res.insuranceInfo,
          policyLength: policyData.length,
          hostIndex: 1
        });
        that.insSelect(1)
      }
    })
    wx.hideLoading();
  },

  // 处理保障概况
  charts: function (chartsData) {
    var that = this
    if (chartsData != '') {
      for (var i = 0; i < chartsData.length; i++) {
        if (chartsData[i].name == "意外险") {
          if (chartsData[i].amnt >= 10000000) {
            chartsData[i].zong = chartsData[i].amnt * 1.5
          } else {
            chartsData[i].zong = '10000000'
          }
          that.data.chartsData[0] = chartsData[i]
        } else if (chartsData[i].name == "医疗险") {
          if (chartsData[i].amnt >= 9000000) {
            chartsData[i].zong = chartsData[i].amnt * 1.5
          } else {
            chartsData[i].zong = '10000000'
          }
          that.data.chartsData[1] = chartsData[i]
        } else if (chartsData[i].name == "重疾险") {
          if (chartsData[i].amnt >= 10000000) {
            chartsData[i].zong = chartsData[i].amnt * 1.5
          } else {
            chartsData[i].zong = '10000000'
          }
          that.data.chartsData[2] = chartsData[i]
        } else if (chartsData[i].name == "人寿险") {
          if (chartsData[i].amnt >= 10000000) {
            chartsData[i].zong = chartsData[i].amnt * 1.5
          } else {
            chartsData[i].zong = '10000000'
          }
          that.data.chartsData[3] = chartsData[i]
        } else if (chartsData[i].name == "年金险") {
          if (chartsData[i].amnt >= 10000000) {
            chartsData[i].zong = chartsData[i].amnt * 1.3
          } else {
            chartsData[i].zong = '10000000'
          }
          that.data.chartsData[4] = chartsData[i]
        }
      }
      this.setData({
        chartsData: this.data.chartsData,
      })


    } else {
      this.setData({
        chartsData: [{
          amnt: "0",
          name: "意外险"
        }, {
          amnt: "0",
          name: "医疗险"
        }, {
          amnt: "0",
          name: "重疾险"
        }, {
          amnt: "0",
          name: "定寿"
        }, {
          amnt: "0",
          name: "年金险"
        }]
      })
    }
  },

  //保单状态选择器
  bindPickerChange: function (e) {
    this.setData({
      hostIndex: e.detail.value,
      hostName: this.data.hostList[e.detail.value].hostName,
    })
    this.insSelect(e.detail.value)
  },
  // 处理筛选保单
  insSelect: function (aa) {
    var policyData = this.data.allPolicyData;
    var arr = []
    for (let i = 0; i < policyData.length; i++) {
      if (aa == '0') {
        arr = policyData
      } else if (aa == '1' && policyData[i].status == 'effective') {
        arr.push(policyData[i])
      } else if (aa == '2' && policyData[i].status == 'processing') {
        arr.push(policyData[i])
      } else if (aa == '3' && policyData[i].status == 'invalid') {
        arr.push(policyData[i])
      } else if (aa == '4' && policyData[i].status == 'cancel') {
        arr.push(policyData[i])
      }
    }
    if (arr.length == '0') {
      this.setData({
        noPolicy: true
      })
    } else {
      this.setData({
        noPolicy: false
      })
    }
    this.setData({
      policyData: arr,
      policyLength: arr.length
    });
  },










  // 滑动
  switchTab(event) {
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      hostIndex: '0',
    })
    var cur = event.detail.current;

    if (cur != '0') {
      this.setData({
        total_sumamnt: '个人总保额',
        total_sumprem: '个人总保费'
      })
    } else {
      this.setData({
        total_sumamnt: '家庭总保额',
        total_sumprem: '家庭总保费'
      })
    }
    if (cur == '0') {
      this.getData("01", "'00','01','02','03'")
    } else if (cur == '1') {
      this.getData('03', "'00'")
    } else if (cur == '2') {
      this.getData('03', "'02'")
    } else if (cur == '3') {
      this.getData('03', "'03'")
    } else if (cur == '4') {
      this.getData('03', "'01'")
    }
    if (event.detail.source === "touch") {
      this.setData({
        currentTab: cur,
        chartsData: [{
          amnt: "0",
          name: "意外险"
        }, {
          amnt: "0",
          name: "医疗险"
        }, {
          amnt: "0",
          name: "重疾险"
        }, {
          amnt: "0",
          name: "定寿"
        }, {
          amnt: "0",
          name: "年金险"
        }]
      })
    }
    wx.hideLoading();
  },
  // 点击
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
        chartsData: [{
          amnt: "0",
          name: "意外险"
        }, {
          amnt: "0",
          name: "医疗险"
        }, {
          amnt: "0",
          name: "重疾险"
        }, {
          amnt: "0",
          name: "定寿"
        }, {
          amnt: "0",
          name: "年金险"
        }]
      })
    }
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