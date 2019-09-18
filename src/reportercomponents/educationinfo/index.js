Component({
  properties: {},

  data: {
    experiences: [],
  },

  lifetimes: {
    ready() {
      this.onAddExperience();
      const value = wx.getStorageSync('educationInfo');
      if (value) {
        const data = JSON.parse(value);
        this.setData({
          ...data,
        });
      }
    },
    detached() {
      const data = JSON.stringify(this.data);
      wx.setStorageSync('educationInfo', data);
    },
  },

  pageLifetimes: {
    show() {
    },
    hide() {
      const data = JSON.stringify(this.data);
      wx.setStorageSync('educationInfo', data);
    },
  },

  methods: {
    onAddExperience() {
      const { experiences } = this.data;
      experiences.push({
        timestamp: Date.now(),
        degree: {
          array: ['学士', '硕士', '博士'],
          value: -1,
          isInited: false,
        },
        major: {
          value: '',
          placeholder: '请输入',
          isInited: false,
        },
        school: {
          value: '',
          placeholder: '请输入',
          isInited: false,
        },
        startDate: {
          value: '',
          isInited: false,
        },
        endDate: {
          value: '',
          isInited: false,
        },
      });
      this.setData({
        experiences,
      });
    },

    onChangeExperience(e) {
      const { experiences } = this.data;
      const { timestamp, name, item } = e.detail;
      // eslint-disable-next-line max-len
      const result = experiences.map((ex) => {
        const temp = ex;
        if (ex.timestamp === timestamp) {
          // eslint-disable-next-line array-callback-return
          Object.keys(ex).map(key => {
            if (key === name) {
              temp[key] = item;
            }
          });
        }
        return temp;
      });
      this.setData({
        experiences: result,
      });
    },

    onDeleteExperience(e) {
      const { experiences } = this.data;
      // eslint-disable-next-line max-len
      const result = experiences.filter(({ timestamp }) => timestamp !== e.detail.timestamp);
      this.setData({
        experiences: result,
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
        const itemType = Object.prototype.toString.call(item);
        if (itemType === '[object Object]') {
          const valueType = Object.prototype.toString.call(item.value);
          if (!item.isInited) {
            item.isInited = true;
            result.isValid = false;
          } else if (item.isInited && result.isValid) {
            if (valueType === '[object String]' && !item.value) {
              result.isValid = false;
            } else if (valueType === '[object Number]' && item.value >= 0) {
              result.isValid = false;
            }
          }
        } else if (itemType === '[object Array]') {
          // eslint-disable-next-line array-callback-return
          item.map(element => {
            result.isValid = that.checkData(element, that) && result.isValid;
          });
        }
      });
      return result.isValid;
    },

    verifyData() {
      const result = this.checkData(this.data, this);
      this.setData({
        ...this.data,
      });
      return result;
    },

    onNext() {
      if (this.verifyData()) {
        const result = this.data.experiences.map(({
          degree, major, school, startDate, endDate,
        }) => ({
          degree: degree.array[degree.value],
          major: major.value,
          school: school.value,
          startDate: startDate.value,
          endDate: endDate.value,
        }));
        this.triggerEvent('next', { experiences: result });
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
