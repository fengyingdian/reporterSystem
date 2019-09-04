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
        name: '上传正面',
        filePath: '',
      },
      {
        name: '上传背面',
        filePath: '',
      },
    ],
    isInited: false,
  },

  methods: {
    onDeleteFile(e) {
      const { filePaths } = this.data;
      const { index } = e.detail;
      filePaths[index].filePath = '';
      this.setData({
        filePaths,
      });
    },

    onUploadFile(e) {
      const { filePaths, isInited } = this.data;
      const { index, filePath } = e.detail;
      if (filePath) {
        filePaths[index].filePath = filePath;
        this.setData({
          filePaths,
        });
      }
      if (!isInited) {
        this.setData({
          isInited: true,
        });
      }
    },
  },
});
