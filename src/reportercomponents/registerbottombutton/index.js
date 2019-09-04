Component({
  properties: {
    pre: {
      type: String,
      value: '上一步',
    },
    next: {
      type: String,
      value: '下一步',
    },
  },

  methods: {
    onPre() {
      this.triggerEvent('pre');
    },
    onNext() {
      this.triggerEvent('next');
    },
  },
});
