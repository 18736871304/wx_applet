// const DOMAIN = "https://insure.meihualife.com"; //上线域名
const DOMAIN = "https://insure.meihualife.com"; //上线域名
const API = {

  Login:DOMAIN + "/user/wxapplet_logon.do",//登录加获取手机号
  getHomePageInfo: DOMAIN + "/rights/getHomePageInfo.do", //客户基本信息
  getMinePageInfo: DOMAIN + "/rights/getMinePageInfo.do", //我的页面
  getQWUrl: DOMAIN + "/rights/getQWUrl.do", //联系我们
  GetTrustPolicyData: DOMAIN + "/life/common/getTrustPolicyData.do",//家庭保单
  getJDHealthCard: DOMAIN + "/rights/getJDHealthCard.do",//权益码
  policyDetail: DOMAIN +"/life/common/policyJsonDetail.do"//保单详情
  // History: DOMAIN + "/api/history/?format=json", 
  // authorizationLogin: DOMAIN + "/api/OwnerVeh/AutoLogin",//自动登录
  // GetWeChatOpenInfo: DOMAIN + "/api/OwnerVeh/GetWeChatOpenInfo", //获取用户oppendid
  // GetUserPhone: DOMAIN + "/api/OwnerVeh/GetUserPhone", //获取用户手机号
  // CheckSmsCode: DOMAIN + "/api​/Common​/CheckSmsCode", //手机号验证码验证
}
export {
  API,
  DOMAIN
}