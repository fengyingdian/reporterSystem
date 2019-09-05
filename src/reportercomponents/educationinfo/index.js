Component({
  properties: {},

  data: {
    experiences: [],
  },

  lifetimes: {
    ready() {
      this.onAddExperience();
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

    onNext() {
      const result = this.data.experiences.map(({
        degree, major, school, startDate, endDate,
      }) => ({
        degree: degree.array[degree.value],
        major,
        school,
        startDate,
        endDate,
      }));
      this.triggerEvent('next', { experiences: result });
    },
  },
});
