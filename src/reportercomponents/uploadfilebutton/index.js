import wxpromisify from '../../service/wxpromisify';

Component({
  properties: {
    index: {
      type: Number,
      value: 0,
    },
    filePath: {
      type: String,
      value: '',
    },
    timestamp: {
      type: Number,
      value: -1,
    },
  },

  data: {
    // mask's status
    // 1-loading 0-not loadding
    status: 0,
  },

  methods: {
    onDelete() {
      const { timestamp, filePath } = this.data;
      this.triggerEvent('deletefile', {
        timestamp,
        filePath,
      });
    },

    onAdd() {
      if (this.data.status) {
        return;
      }
      this.onUploadFile();
    },

    async onUploadFile() {
      const that = this;
      that.setData({
        status: 1,
      });
      const filePath = await wxpromisify.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
      })
        .then(res => {
          wx.showToast({
            title: '上传成功',
          });
          // that.setData({
          //   filePath: res.tempFilePaths[0],
          // });
          return res.tempFilePaths[0];
        })
        .catch(() => {
          wx.showToast({
            title: '上传失败',
            icon: 'none',
          });
          return '';
        });

      if (filePath) {
        that.triggerEvent('uploadfile', {
          index: that.data.index,
          filePath,
        });
      }

      // await wxpromisify.uploadFile({
      //   url: 'http://localhost:8800/api/app/wechat/actions/id-card-info',
      //   filePath,
      //   name: 'file',
      //   header: {
      //     'content-type': 'multipart/form-data',
      //   },
      // })
      //   .then(res => {
      //     const parsed = JSON.parse(res.data);
      //     that.setData({
      //       parsed,
      //     });
      //   })
      //   .catch(() => {
      //   });

      that.setData({
        status: 0,
      });
    },
  },
});
