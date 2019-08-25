Component({
  properties: {
    academicDegrees: {
      type: Array,
      value: ['学士', '硕士', '博士'],
    },
    academicDegreeType: {
      type: Number,
      value: 0,
    },
    startDate: {
      type: String,
      value: '1989-06-15',
    },
    endDate: {
      type: String,
      value: '1989-06-15',
    },
    schoolName: {
      type: String,
      value: '',
    },
    specialization: {
      type: String,
      value: '',
    },
  },

  methods: {
    onChangeAcademicDegreeType(e) {
      this.setData({
        academicDegreeType: e.detail.value,
      });
    },

    onChangeStartDate(e) {
      this.setData({
        startDate: e.detail.value,
      });
    },

    onChangeEndDate(e) {
      this.setData({
        endDate: e.detail.value,
      });
    },

    onConfirmSchoolName(e) {
      this.setData({
        schoolName: e.detail.value,
      });
    },

    onConfirmSpecialization(e) {
      this.setData({
        specialization: e.detail.value,
      });
    },
  },
});
