import { number2Chinese } from '../../utils/util';

Component({
  properties: {
    index: {
      type: Number,
      value: -1,
      observer(val) {
        const chineseIndex = number2Chinese(val + 1);
        this.setData({
          subTitle: `工作经历${chineseIndex}`,
        });
      },
    },
    timestamp: {
      type: Number,
      value: -1,
    },
    employer: {
      type: Object,
      value: {},
    },
    duty: {
      type: Object,
      value: {},
    },
    startDate: {
      type: Object,
      value: {},
    },
    endDate: {
      type: Object,
      value: {},
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
