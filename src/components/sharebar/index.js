Component({
  properties: {},

  attached() {},

  ready() {
    this.setData({
      isIphoneX: wx.isIphoneX(),
    });
  },

  methods: {
    tapPoster() {
      this.triggerEvent('showPoster');
    },
  },
});
