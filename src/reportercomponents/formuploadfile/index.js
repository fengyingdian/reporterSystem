Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
  },

  data: {
    filePaths: [
      {
        timestamp: Date.now(),
        filePath: '',
      },
    ],
    isInited: false,
  },

  methods: {
    onDeleteFile(e) {
      const { filePaths } = this.data;
      const { timestamp } = e.detail;
      // eslint-disable-next-line max-len
      const result = filePaths.filter((path) => path.timestamp !== timestamp);
      this.setData({
        filePaths: result,
      });
    },

    onUploadFile(e) {
      const { filePaths, isInited } = this.data;
      const { filePath } = e.detail;
      if (!isInited) {
        this.setData({
          isInited: true,
        });
      }
      if (filePath) {
        filePaths[filePaths.length - 1].filePath = filePath;
        filePaths.push({
          timestamp: Date.now(),
          filePath: '',
        });
        this.setData({
          filePaths,
        });
      }
    },
  },
});
