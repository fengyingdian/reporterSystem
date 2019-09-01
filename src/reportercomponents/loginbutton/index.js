Component({
  properties: {
    hasVerifyCode: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onTap() {
      this.triggerEvent('login');
    },
  },
});
