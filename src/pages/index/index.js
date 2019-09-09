/*
 * File: index.js
 * Project: Reporter
 * File Created: Saturday, 20th April 2019 10:34:22 pm
 * Author: break (fengyingdian@126.com)
 */

const app = getApp();

Page({
  data: {
    // top margin
    topMargin: wx.getSystemInfoSync().statusBarHeight + 44,

    // user name
    name: '李明月',

    // user's employer
    employer: '人民日报社',

    // pageIndex
    pageIndex: 0,

    // apply status
    applyStatus: 3,
  },

  onLoad() {
    this.init();
  },

  onShow() { },

  onHide() { },

  init() {
    const that = this;
    console.log({ app });
    app.resetPageIndexCallBack = (index) => {
      that.setData({
        pageIndex: index,
      });
    };
  },

  onReachBottom() { },

  onPageScroll() { },

  onShareAppMessage() { },
});
