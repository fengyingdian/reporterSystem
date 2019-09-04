Component({
  properties: {
    title: {
      type: String,
      value: '',
    },
  },

  methods: {
    onTap() {
      this.triggerEvent('delete');
    },
  },
});
