Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
    filePaths: {
      type: Array,
      value: [],
    },
    isInited: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onDeleteFile(e) {
      this.triggerEvent('delete', {
        timestamp: e.detail.timestamp,
      });
    },

    onUploadFile(e) {
      this.triggerEvent('upload', {
        ...e.detail,
      });
    },
  },
});
