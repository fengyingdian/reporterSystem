Component({
  properties: {},

  data: {
    documentPhoto: [
      {
        filePath: '',
      },
    ],
    idCard: [
      {
        name: '上传正面',
        filePath: '',
      },
      {
        name: '上传背面',
        filePath: '',
      },
    ],
    personnelSitutionSheet: [
      {
        timestamp: Date.now(),
        filePath: '',
      },
    ],
    diploma: [
      {
        timestamp: Date.now(),
        filePath: '',
      },
    ],
    certificate: [
      {
        timestamp: Date.now(),
        filePath: '',
      },
    ],
    laborContract: [
      {
        timestamp: Date.now(),
        filePath: '',
      },
    ],
    confidentialCommitment: [
      {
        timestamp: Date.now(),
        filePath: '',
      },
    ],
    confidentialAgreement: [
      {
        timestamp: Date.now(),
        filePath: '',
      },
    ],
  },

  lifetimes: {
    ready() {
      const value = wx.getStorageSync('uploadfile');
      if (value) {
        const data = JSON.parse(value);
        this.setData({
          ...data,
        });
      }
    },
    detached() {
      const data = JSON.stringify(this.data);
      wx.setStorageSync('uploadfile', data);
    },
  },


  pageLifetimes: {
    show() {
    },
    hide() {
      const data = JSON.stringify(this.data);
      wx.setStorageSync('uploadfile', data);
    },
  },

  methods: {
    onUploadDocumentPhoto(e) {
      this.setData({
        documentPhoto: [{
          filePath: e.detail.filePath,
        }],
      });
    },

    onDeleteDocumentPhoto() {
      this.setData({
        documentPhoto: [{
          filePath: '',
        }],
      });
    },

    onUploadIdCard(e) {
      this.data.idCard[e.detail.index].filePath = e.detail.filePath;
      this.setData({
        idCard: this.data.idCard,
      });
    },

    onDeleteIdCard(e) {
      this.data.idCard[e.detail.index].filePath = '';
      this.setData({
        idCard: this.data.idCard,
      });
    },

    onUploadFile(e) {
      const { name } = e.currentTarget.dataset;
      const item = this.data[name];
      item[item.length - 1].filePath = e.detail.filePath;
      item.push({
        timestamp: Date.now(),
        filePath: '',
      });
      this.setData({
        [name]: item,
        [`isInited.${name}`]: true,
      });
    },

    onDeleteFile(e) {
      const { name } = e.currentTarget.dataset;
      const item = this.data[name];
      const result = item.filter(({ timestamp }) => timestamp !== e.detail.timestamp);
      this.setData({
        [name]: result,
      });
    },

    onPre() {
      this.triggerEvent('pre');
    },

    checkData(data, that) {
      const result = {
        isValid: true,
      };
      // eslint-disable-next-line array-callback-return
      Object.keys(data).map((key) => {
        const item = data[key];
        if (key !== 'isInited' && !item[0].filePath) {
          result.isValid = false;
          that.setData({
            [`isInited.${key}`]: true,
          });
        }
      });
      return result.isValid;
    },

    verifyData() {
      return this.checkData(this.data, this);
    },

    onNext() {
      if (this.verifyData()) {
        this.triggerEvent('next', {
          ...this.data,
        });
      } else {
        wx.showToast({
          title: '尚有未完成的信息',
          icon: 'none',
          duration: 1500,
        });
      }
    },
  },
});
