import { getApplyStatusDescription } from '../../utils/util';

Component({
  properties: {
    status: {
      type: Number,
      value: -1,
      observer(val) {
        if (val >= 0) {
          this.setData({
            subtitle: getApplyStatusDescription(val),
          });
        }
      },
    },
  },

  methods: {
    onTap() {
      wx.navigateTo({
        url: `/pages/process/index?status=${this.data.status}`,
      });
    },
  },
});
