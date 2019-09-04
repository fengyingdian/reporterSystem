Component({
  properties: {
    hasVerifyCode: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onNext() {
      this.triggerEvent('next');
    },
  },
});
