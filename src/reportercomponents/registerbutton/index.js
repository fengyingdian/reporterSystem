import { getPageIndexDescription } from '../../utils/util';

Component({
  properties: {
    pageIndex: {
      type: Number,
      value: -1,
      observer(val) {
        if (val >= 0) {
          this.setData({
            pageDescription: getPageIndexDescription(val),
          });
        }
      },
    },
  },

  methods: {
    onTap() {
      wx.navigateTo({
        url: `/pages/register/index?pageIndex=${this.data.pageIndex}`,
      });
    },
  },
});
