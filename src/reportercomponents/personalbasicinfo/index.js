Component({
  properties: {
  },

  data: {
    genders: ['男', '女'],
    genderType: 0,

    politicalStatuss: ['共产党员', '团员', '群众', '其他党派'],
    politicalStatusType: 0,

    residences: ['北京', '上海'],
    residenceType: 0,

    provinces: ['北京', '上海'],
    provinceType: 0,

    formalName: '',
    birthday: '1989-06-15',
  },

  methods: {
    onChangeGenderType(e) {
      this.setData({
        genderType: e.detail.value,
      });
    },

    onConfirmFormalName(e) {
      this.setData({
        formalName: e.detail.value,
      });
    },
  },
});
