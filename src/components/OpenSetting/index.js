Component({
  properties: {
    launchAppAuthorization: {
      type: Boolean,
      value: false,
      // observer(newVal, oldVal, changedPath) {
      // console.log("tab-top", newVal, oldVal, changedPath, this)
      // },
    },
  },

  attached() {},

  ready() {},

  methods: {
    tapOpenSetting() {
      wx.openSetting();
      this.triggerEvent('openSetting', {}, {});
    },
  },
});
