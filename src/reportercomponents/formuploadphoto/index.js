Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
    filePaths: {
      type: Array,
      value: [
        {
          filePath: '',
        },
      ],
    },
    isInited: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onDeleteFile() {
      this.triggerEvent('delete');
    },

    onUploadFile(e) {
      this.triggerEvent('upload', {
        ...e.detail,
      });
    },
  },
});
