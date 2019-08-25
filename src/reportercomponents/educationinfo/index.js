Component({
  properties: {
  },

  data: {
    academicDegrees: ['学士', '硕士', '博士'],
    academicDegreeType: 0,

    idCode: '',
    score: '',

    isDispatched: false,
    isFreeTraining: false,
  },

  methods: {
    onChangeAcademicDegreeType(e) {
      this.setData({
        academicDegreeType: e.detail.value,
      });
    },
  },
});
