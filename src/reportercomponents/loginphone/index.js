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
    onInput(opts) {
      this.triggerEvent('input', { value: opts.detail.value });
    },
  },
});
