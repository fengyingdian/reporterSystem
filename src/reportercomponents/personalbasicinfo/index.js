Component({
  properties: {
    gender: {
      type: Object,
      value: {
        array: ['男', '女'],
        value: -1,
        isInited: false,
      },
    },
    ethnic: {
      type: Object,
      value: {
        value: '',
        placeholder: '请输入',
        isInited: false,
      },
    },
    nationality: {
      type: Object,
      value: {
        value: '',
        placeholder: '请输入',
        isInited: false,
      },
    },
    politicalStatus: {
      type: Object,
      value: {
        array: ['共产党员', '团员', '群众', '其他党派'],
        value: -1,
        isInited: false,
      },
    },
    birthday: {
      type: Object,
      value: {
        value: '',
        isInited: false,
      },
    },
    residence: {
      type: Object,
      value: {
        array: ['北京', '上海'],
        value: -1,
        isInited: false,
      },
    },
    accountLocation: {
      type: Object,
      value: {
        array: ['北京', '上海'],
        value: -1,
        isInited: false,
      },
    },
    deliveryAddress: {
      type: Object,
      value: {
        value: '',
        placeholder: '请输入',
        isInited: false,
      },
    },
    phoneNumber: {
      type: Object,
      value: {
        value: '',
        placeholder: '请输入',
        isInited: false,
      },
    },
    email: {
      type: Object,
      value: {
        value: '',
        placeholder: '请输入',
        isInited: false,
      },
    },
  },

  lifetimes: {
    ready() {
      const value = wx.getStorageSync('personalBasicInfo');
      if (value) {
        const data = JSON.parse(value);
        this.setData({
          ...data,
        });
      }
    },
    detached() {
      const data = JSON.stringify(this.data);
      wx.setStorageSync('personalBasicInfo', data);
    },
  },

  pageLifetimes: {
    show() {
    },
    hide() {
      const data = JSON.stringify(this.data);
      wx.setStorageSync('personalBasicInfo', data);
    },
  },

  methods: {
    onChange(e) {
      const item = this.data[e.currentTarget.dataset.name];
      item.value = e.detail.value;
      item.isInited = true;
      this.setData({
        [e.currentTarget.dataset.name]: item,
      });
    },

    verifyData() {
      const that = this;
      const result = {
        isValid: true,
      };
      // eslint-disable-next-line array-callback-return
      Object.keys(that.data).map((key) => {
        if (!that.data[key].isInited) {
          that.setData({
            [`${key}.isInited`]: true,
          });
          result.isValid = false;
        } else if (that.data[key].isInited && result.isValid) {
          if (Object.prototype.toString.call(that.data[key].value) === '[object String]' && !that.data[key].value) {
            result.isValid = false;
          } else if (Object.prototype.toString.call(that.data[key].value) === '[object Number]' && that.data[key].value >= 0) {
            result.isValid = false;
          }
        }
      });
      return result.isValid;
    },

    onNext() {
      if (this.verifyData()) {
        const {
          gender,
          ethnic,
          nationality,
          politicalStatus,
          birthday,
          residence,
          accountLocation,
          deliveryAddress,
          phoneNumber,
          email,
        } = this.data;

        this.triggerEvent('next', {
          gender: gender.array[gender.value],
          ethnic: ethnic.value,
          nationality: nationality.value,
          politicalStatus: politicalStatus.array[politicalStatus.value],
          birthday: birthday.value,
          residence: residence.array[residence.value],
          accountLocation: accountLocation.array[accountLocation.value],
          deliveryAddress: deliveryAddress.value,
          phoneNumber: phoneNumber.value,
          email: email.value,
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
