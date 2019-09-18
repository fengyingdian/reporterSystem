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
    pageSize: 5,

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

    // work info
    workInfo: {
      duty: '',
      jobTitle: '',
      department: '',
      jobRelationship: '',
      experiences: [],
    },

    // upload file
    uploadFile: {
      documentPhoto: [],
      idCard: [],
      personnelSitutionSheet: [],
      diploma: [],
      certificate: [],
      laborContract: [],
      confidentialCommitment: [],
      confidentialAgreement: [],
    },
  },

  onLoad(opts) {
    // then you can do other things
    this.init(opts);
  },

  onShow() {
    const value = wx.getStorageSync('register');
    if (value) {
      const data = JSON.parse(value);
      this.setData({
        ...data,
      });
    }
  },

  onHide() {
    this.quit();
  },

  onUnload() {
    this.quit();
  },

  init(opts) {
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
    that.setData({
      pageIndex: parseInt(opts.pageIndex, 10),
    });
  },

  quit() {
    if (getApp().resetPageIndexCallBack) {
      getApp().resetPageIndexCallBack(this.data.pageIndex);
    }
    const {
      personalBasicInfo, educationInfo, workInfo, uploadFile,
    } = this.data;
    const data = JSON.stringify({
      personalBasicInfo,
      educationInfo,
      workInfo,
      uploadFile,
    });
    wx.setStorageSync('register', data);
  },

  onPre() {
    this.setData({
      pageIndex: this.data.pageIndex > 0 ? this.data.pageIndex - 1 : 0,
    });
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
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
      case 3:
        this.setData({
          uploadFile: {
            ...e.detail,
          },
        });
        break;
      case 4:
        wx.navigateBack({
          delta: 1,
        });
        break;
      default:
        break;
    }
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    });
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
