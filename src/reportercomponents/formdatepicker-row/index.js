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
    onchange(e) {
      this.triggerEvent('change', { value: e.detail.value });
    },
  },
});
