const App = getApp();
Component({
  // 组件的属性列表
  properties: {
    pageName: String, //中间的title
    showNav: { //判断是否显示左上角的按钮    
      type: Boolean,
      value: true
    },
    showHome: { //判断是否显示左上角的home按钮
      type: Boolean,
      value: true
    },
    imgUrl:{//图片背景路径
      type: String,
      value: App.globalData.imgLink+'index.jpg',
    },
  },
  // 组件的初始数据
  data: {
    showNav: true, //判断是否显示左上角的home按钮
    showHome: true, //判断是否显示左上角的按钮

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      this.setData({
        navHeight: App.globalData.navHeight, //导航栏高度
        navTop: App.globalData.navTop, //胶囊按钮与顶部的距离
        jnheight: App.globalData.jnheight, //胶囊高度
        jnwidth: App.globalData.jnwidth //胶囊宽度
      })
    }
  },
  // 组件的方法列表
  methods: {
    //回退
    navBack: function() {
      wx.navigateBack()
    },
    //回主页
    navHome: function() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },
  }
})
