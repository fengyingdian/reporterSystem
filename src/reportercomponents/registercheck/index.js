Component({
  properties: {
    personalBasicInfo: {
      type: Object,
      value: {},
    },
    educationInfo: {
      type: Array,
      value: [],
    },
    workInfo: {
      type: Object,
      value: {},
    },
    uploadFile: {
      type: Object,
      value: {},
    },
  },

  data: {},

  methods: {
    onPre() {
      this.triggerEvent('pre');
    },

    onNext() {
      wx.showModal({
        title: '提交后将无法修改！',
        cancelColor: '#999',
        cancelText: '继续提交',
        confirmColor: '#0f5aa5',
        confirmText: '返回修改',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '返回修改',
            });
          } else if (res.cancel) {
            wx.showToast({
              title: '继续提交',
            });
          }
        },
      });
      this.triggerEvent('next');
    },
  },
});
