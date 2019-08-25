Component({
  properties: {
    tip: {
      type: String,
      value: '',
    },
    src: {
      type: String,
      value: '',
    },
    background: {
      type: String,
      value: '',
    },
    isShowSplit: {
      type: Boolean,
      value: true,
    },
  },

  methods: {
    onTap() {
      this.triggerEvent('tap');
    },
  },
});
