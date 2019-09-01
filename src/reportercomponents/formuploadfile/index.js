Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
  },

  data: {
    filePaths: [''],
  },

  methods: {
    onFilePath(opts) {
      const { filePaths } = this.data;
      const { index, filePath } = opts.detail;
      filePaths[index] = filePath;
      if (index === filePaths.length - 1) {
        filePaths.push('');
        this.setData({
          filePaths,
        });
      }
    },
  },
});
