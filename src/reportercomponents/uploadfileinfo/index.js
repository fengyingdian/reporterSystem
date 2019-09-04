Component({
  properties: {},

  data: {},

  methods: {
    onPre() {
      this.triggerEvent('pre');
    },

    onNext() {
      this.triggerEvent('next');
    },
  },
});
