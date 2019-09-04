Component({
  properties: {
    value: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '',
    },
    maxlength: {
      type: Number,
      value: 0,
    },
    placeholder: {
      type: String,
      value: '',
    },
  },

  methods: {
    onInput(e) {
      this.triggerEvent('input', { value: e.detail.value });
    },
  },
});
