Component({
  properties: {
    name: {
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
