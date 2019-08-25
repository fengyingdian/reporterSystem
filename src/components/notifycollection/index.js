Component({
  properties: {},

  data: {
    tips: '单击“添加到我的小程序”收藏',
    // status bar height, for margin top
    statusBar: wx.getSystemInfoSync().statusBarHeight,
    // menu button rect
    menuButton: wx.getMenuButtonBoundingClientRect(),
  },

  attached() {},

  ready() {
    const that = this;
    setTimeout(() => {
      that.setData({
        hide: true,
      });
      setTimeout(() => {
        that.setData({
          remove: true,
        });
        getApp().globalData.isShownNotifyCollection = true;
      }, 300);
    }, 6000);
  },

  methods: {
    onClose() {
      this.setData({
        remove: true,
      });
      getApp().globalData.isShownNotifyCollection = true;
    },
  },
});
