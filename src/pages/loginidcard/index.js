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

    name: 'xxx',
    addr: 'xxxxxxxx',
    id: 'xxxxxxxxxxxxxxxxxx',
  },

  onLoad() {
    // then you can do other things
    this.init();
  },

  onShow() {},

  onHide() {},

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

  onIdCard(e) {
    console.log({ e });
    this.setData({
      id: e.detail.id,
      name: e.detail.name,
      addr: e.detail.addr,
    });
  },

  onReachBottom() {},

  onPageScroll() {},

  onShareAppMessage() {},
});
