Page({
  data: {
    // attach loading page
    attachLoadingPage: true,

    // show loading page
    showLoadingPage: true,

    // top margin
    topMargin: wx.getSystemInfoSync().statusBarHeight + 44,

    // title
    title: '登录',

    // phone number
    phoneNumber: '',

    // verify code
    verifyCode: '',
  },

  onLoad() {
    this.init();
  },

  onShow() { },

  onHide() { },

  init() {
    const that = this;
    setTimeout(() => {
      that.setData({
        attachLoadingPage: false,
      });
      setTimeout(() => {
        that.setData({
          showLoadingPage: false,
        });
      }, 1000);
    }, 1000);
  },

  onPhoneNumber(e) {
    this.setData({
      phoneNumber: e.detail.value,
    });
  },

  onVerifyCode(e) {
    this.setData({
      verifyCode: e.detail.value,
    });
  },

  onLogin() {
    if (this.verifyData()) {
      wx.redirectTo({
        url: '/pages/index/index',
      });
    }
  },

  verifyData() {
    const { phoneNumber, verifyCode } = this.data;
    if (phoneNumber.length === 11 && verifyCode.length === 4) {
      return true;
    }
    return false;
  },

  onReachBottom() { },

  onPageScroll() { },

  onShareAppMessage() { },
});
