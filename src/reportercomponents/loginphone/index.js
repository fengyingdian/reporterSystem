Component({
  properties: {
    value: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '手机号',
    },
    maxlength: {
      type: Number,
      value: 11,
    },
    placeholder: {
      type: String,
      value: '请输入手机号',
    },
    isShowTips: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onInput(e) {
      this.triggerEvent('input', { value: e.detail.value });
    },
  },
});
