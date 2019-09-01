Component({
  properties: {
    isShowMoreInfo: {
      type: Boolean,
      value: false,
    },
    name: {
      type: String,
      value: '',
    },
    employer: {
      type: String,
      value: '',
    },
  },

  data: {
    isLogin: false,
  },

  methods: {
    onTap() {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    },
  },
});
