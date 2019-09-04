Page({
  data: {
    // attach loading page
    attachLoadingPage: true,

    // show loading page
    showLoadingPage: true,

    // top margin
    topMargin: wx.getSystemInfoSync().statusBarHeight + 44,

    // title
    title: '',

    // page index
    pageIndex: 0,

    // page size
    pageSize: 4,
  },

  onLoad() {
    // then you can do other things
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

  onPre() {
    this.setData({
      pageIndex: this.data.pageIndex > 0 ? this.data.pageIndex - 1 : 0,
    });
  },

  onNext() {
    this.setData({
      pageIndex:
      this.data.pageIndex < this.data.pageSize - 1
        ? this.data.pageIndex + 1 : this.data.pageSize - 1,
    });
  },

  onReachBottom() { },

  onPageScroll() { },

  onShareAppMessage() { },
});
