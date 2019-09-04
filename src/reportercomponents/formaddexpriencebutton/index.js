Component({
  properties: {
    title: {
      type: String,
      value: '',
    },
    content: {
      type: String,
      value: '',
    },
  },

  methods: {
    onTap() {
      this.triggerEvent('add');
    },
  },
});
