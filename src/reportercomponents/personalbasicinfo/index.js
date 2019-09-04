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

  methods: {
    onChangeGender(e) {
      this.setData({
        'gender.value': e.detail.value,
      });
      if (!this.data.gender.isInited) {
        this.setData({
          'gender.isInited': true,
        });
      }
    },
    onChangeEthnic(e) {
      this.setData({
        'ethnic.value': e.detail.value,
      });
      if (!this.data.ethnic.isInited) {
        this.setData({
          'ethnic.isInited': true,
        });
      }
    },
    onChangeNationality(e) {
      this.setData({
        'nationality.value': e.detail.value,
      });
      if (!this.data.nationality.isInited) {
        this.setData({
          'nationality.isInited': true,
        });
      }
    },
    onChangeBirthday(e) {
      this.setData({
        'birthday.value': e.detail.value,
      });
      if (!this.data.birthday.isInited) {
        this.setData({
          'birthday.isInited': true,
        });
      }
    },
    onChangePoliticalStatus(e) {
      this.setData({
        'politicalStatus.value': e.detail.value,
      });
      if (!this.data.politicalStatus.isInited) {
        this.setData({
          'politicalStatus.isInited': true,
        });
      }
    },
    onChangeResidence(e) {
      this.setData({
        'residence.value': e.detail.value,
      });
      if (!this.data.residence.isInited) {
        this.setData({
          'residence.isInited': true,
        });
      }
    },
    onChangeAccountLocation(e) {
      this.setData({
        'accountLocation.value': e.detail.value,
      });
      if (!this.data.accountLocation.isInited) {
        this.setData({
          'accountLocation.isInited': true,
        });
      }
    },
    onChangeDeliveryAddress(e) {
      this.setData({
        'deliveryAddress.value': e.detail.value,
      });
      if (!this.data.deliveryAddress.isInited) {
        this.setData({
          'deliveryAddress.isInited': true,
        });
      }
    },
    onChangePhoneNumber(e) {
      this.setData({
        'phoneNumber.value': e.detail.value,
      });
      if (!this.data.phoneNumber.isInited) {
        this.setData({
          'phoneNumber.isInited': true,
        });
      }
    },
    onChangeEmail(e) {
      this.setData({
        'email.value': e.detail.value,
      });
      if (!this.data.email.isInited) {
        this.setData({
          'email.isInited': true,
        });
      }
    },
    verifyData() {
      // const that = this;
      // const result = {
      //   isValid: true,
      // };
      // // eslint-disable-next-line array-callback-return
      // Object.keys(that.data).map((key) => {
      //   if (!that.data[key].isInited) {
      //     that.setData({
      //       [`${key}.isInited`]: true,
      //     });
      //     result.isValid = false;
      //   } else if (that.data[key].isInited && !that.data[key].value && result.isValid) {
      //     result.isValid = false;
      //   }
      // });

      // return result.isValid;
      return true;
    },
    onNext() {
      if (this.verifyData()) {
        this.triggerEvent('next');
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
