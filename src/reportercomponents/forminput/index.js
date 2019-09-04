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
    isInited: {
      type: Boolean,
      value: false,
    },
    isNeeded: {
      type: Boolean,
      value: true,
    },
    isShowSplit: {
      type: Boolean,
      value: true,
    },
    type: {
      type: String,
      value: 'text',
    },
  },

  methods: {
    onchange(e) {
      this.triggerEvent('change', { value: e.detail.value });
    },
  },
});
