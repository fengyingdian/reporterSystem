Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: 0,
    },
    isNeeded: {
      type: Boolean,
      value: true,
    },
    isShowSplit: {
      type: Boolean,
      value: true,
    },
  },

  methods: {
    onConfirm(e) {
      this.triggerEvent('confirm', { value: e.detail.value });
    },
  },
});
