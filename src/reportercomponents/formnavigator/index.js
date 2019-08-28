Component({
  properties: {
    icon: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: [],
    },
    isShowSplit: {
      type: Boolean,
      value: true,
    },
  },

  methods: {
    onTap(e) {
      this.triggerEvent('tap', { value: e.detail.value });
    },
  },
});
