Component({
  properties: {
    type: {
      type: String,
      value: '',
    },
    filePath: {
      type: String,
      value: '',
    },
  },

  methods: {
    onchange(e) {
      this.triggerEvent('change', { value: e.detail.value });
    },
  },
});
