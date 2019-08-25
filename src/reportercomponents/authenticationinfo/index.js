Component({
  properties: {
  },

  data: {
    authentications: ['身份证', '军官证', '护照'],
    authenticationType: 0,

    idCode: '',
    score: '',

    isDispatched: false,
    isFreeTraining: false,
  },

  methods: {
    onChangeAuthenticationType(e) {
      this.setData({
        authenticationType: e.detail.value,
      });
    },

    onConfirmIDCode(e) {
      this.setData({
        idCode: e.detail.value,
      });
    },

    onConfirmScore(e) {
      this.setData({
        score: e.detail.value,
      });
    },

    onChangeFreeTraining(e) {
      this.setData({
        isFreeTraining: e.detail.value,
      });
    },

    onChangeDisPatched(e) {
      this.setData({
        isDispatched: e.detail.value,
      });
    },
  },
});
