Component({
  externalClasses: ['custom-class', 'overlay-class'],

  properties: {
    show: Boolean,
    overlayStyle: String,
    overlay: {
      type: Boolean,
      value: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true,
    },
    position: {
      type: String,
      value: 'center',
    },
  },

  methods: {
    onClickOverlay: function onClickOverlay() {
      this.triggerEvent('clickoverlay', {}, {});

      if (this.data.closeOnClickOverlay) {
        this.triggerEvent('close');
      }
    },
  },
});
