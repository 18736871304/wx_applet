//显示错误信息 1500
const showMsg = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 1500
  })
}
//加载中  手动停止
const showLoading = (msg) => {
  wx.showLoading({
    title: msg
  })
}
// 关闭加载中
const hideLoading = () => {
  wx.hideLoading()
}

//成功 1500
const showSuccess = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 1500
  })
}

const toast = {
  showMsg,
  showLoading,
  hideLoading,
  showSuccess
}

export default toast;