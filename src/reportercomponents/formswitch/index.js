Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
    value: {
      type: Boolean,
      value: true,
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
    onChange(e) {
      this.triggerEvent('change', { value: e.detail.value });
    },
  },
});
