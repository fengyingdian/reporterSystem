import { number2Chinese } from '../../utils/util';

Component({
  properties: {
    index: {
      type: Number,
      value: -1,
      observer(val) {
        const chineseIndex = number2Chinese(val + 1);
        this.setData({
          subTitle: `教育经历${chineseIndex}${val === 0 ? '（最高学历）' : ''}`,
        });
      },
    },
    timestamp: {
      type: Number,
      value: -1,
    },
    degree: {
      type: Object,
      value: {
        array: ['学士', '硕士', '博士'],
        value: -1,
        isInited: false,
      },
    },
    major: {
      type: Object,
      value: {
        value: '',
        placeholder: '请输入',
        isInited: false,
      },
    },
    school: {
      type: Object,
      value: {
        value: '',
        placeholder: '请输入',
        isInited: false,
      },
    },
    startDate: {
      type: Object,
      value: {
        value: '',
        isInited: false,
      },
    },
    endDate: {
      type: Object,
      value: {
        value: '',
        isInited: false,
      },
    },
  },

  methods: {
    onChange(e) {
      const item = this.data[e.currentTarget.dataset.name];
      item.value = e.detail.value;
      item.isInited = true;
      this.triggerEvent('change', {
        timestamp: this.data.timestamp,
        name: e.currentTarget.dataset.name,
        item,
      });
    },

    onDelete() {
      this.triggerEvent('delete', { timestamp: this.data.timestamp });
    },
  },
});
