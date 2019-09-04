Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
    array: {
      type: Array,
      value: [],
    },
    index: {
      type: Number,
      value: -1,
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
  },

  methods: {
    onchange(e) {
      this.triggerEvent('change', { value: e.detail.value });
    },
  },
});
