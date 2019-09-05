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

    // upload data
    // personal basic info
    personalBasicInfo: {
      gender: '',
      ethnic: '',
      nationality: '',
      politicalStatus: '',
      birthday: '',
      residence: '',
      accountLocation: '',
      deliveryAddress: '',
      phoneNumber: '',
      email: '',
    },

    // education info
    educationInfo: [],

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

  onNext(e) {
    const { pageIndex, pageSize } = this.data;
    switch (pageIndex) {
      case 0:
        this.setData({
          personalBasicInfo: {
            ...e.detail,
          },
        });
        break;
      case 1:
        this.setData({
          educationInfo: e.detail.experiences,
        });
        break;
      case 2:
        this.setData({
          workInfo: {
            ...e.detail,
          },
        });
        break;
      default:
        break;
    }
    this.setData({
      pageIndex:
      pageIndex < pageSize - 1
        ? pageIndex + 1 : pageSize - 1,
    });
  },

  onReachBottom() { },

  onPageScroll() { },

  onShareAppMessage() { },
});
