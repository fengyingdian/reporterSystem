// import api from '../../service/api';

Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
  },

  data: {
    isLogin: false,
    image: '',
  },

  methods: {
    onTap() {
      const that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          console.log({ res });
          that.setData({
            image: res.tempFilePaths[0],
          });
          wx.uploadFile({
            url: 'http://localhost:8800/api/app/wechat/actions/id-card-info',
            filePath: res.tempFilePaths[0],
            name: 'file',
            header: {
              'content-type': 'multipart/form-data',
            },
            formData: {
              user: 'test',
            },
            success: (result) => {
              const parsed = JSON.parse(result.data);
              const { status, data } = parsed;
              if (status === 0) {
                that.triggerEvent('idcard', {
                  ...data,
                });
              }
            },
          });
        },
      });
    },
  },
});
