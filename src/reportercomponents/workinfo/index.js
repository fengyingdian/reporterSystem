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

    onNext() {
      this.triggerEvent('next');
    },
  },
});
