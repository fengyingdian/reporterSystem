Component({
  properties: {},

  data: {
    // duty
    duty: {
      value: '',
      placeholder: '请输入',
      isInited: false,
    },

    // job title
    jobTitle: {
      value: '',
      placeholder: '请输入',
      isInited: false,
    },

    // department
    department: {
      value: '',
      placeholder: '请输入',
      isInited: false,
    },

    // job relationship
    jobRelationship: {
      value: '',
      placeholder: '请输入',
      isInited: false,
    },

    // work experiences
    experiences: [],
  },

  lifetimes: {
    ready() {
      this.onAddExperience();
      const value = wx.getStorageSync('workInfo');
      if (value) {
        const data = JSON.parse(value);
        this.setData({
          ...data,
        });
      }
    },
    detached() {
      const data = JSON.stringify(this.data);
      wx.setStorageSync('workInfo', data);
    },
  },

  pageLifetimes: {
    show() {
    },
    hide() {
      const data = JSON.stringify(this.data);
      wx.setStorageSync('workInfo', data);
    },
  },

  methods: {
    onAddExperience() {
      const { experiences } = this.data;
      experiences.push({
        timestamp: Date.now(),
        employer: {
          value: '',
          placeholder: '请输入',
          isInited: false,
        },
        duty: {
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

    onChange(e) {
      const item = this.data[e.currentTarget.dataset.name];
      item.value = e.detail.value;
      item.isInited = true;
      this.setData({
        [e.currentTarget.dataset.name]: item,
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
        const {
          duty, jobTitle, department, jobRelationship, experiences,
        } = this.data;
        const result = experiences.map(({
          employer, duty: exduty, startDate, endDate,
        }) => ({
          employer: employer.value,
          duty: exduty.value,
          startDate: startDate.value,
          endDate: endDate.value,
        }));
        this.triggerEvent('next', {
          duty: duty.value,
          jobTitle: jobTitle.value,
          department: department.value,
          jobRelationship: jobRelationship.value,
          experiences: result,
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
