import { getApplyStatusDescription } from '../../utils/util';

Component({
  properties: {
    status: {
      type: Number,
      value: -1,
      observer(val) {
        if (val >= 0) {
          this.setData({
            title: getApplyStatusDescription(val),
          });
        }
      },
    },
  },

  data: {
    statusFeed: [
      {
        date: '201X年XX月XX日',
        info: '国家新闻出版广电总局 ',
        tips: '照片格式不正确',
        isPassed: false,
      },
      {
        date: '201X年XX月XX日',
        info: '省新闻办公室',
        isPassed: true,
      },
      {
        date: '201X年XX月XX日',
        info: 'xx报社',
        isPassed: true,
      },
      {
        date: '201X年XX月XX日',
        info: '提交申请',
        isPassed: true,
      },
      {
        date: '201X年XX月XX日',
        info: 'xx报社',
        tips: '入社时间与工作经历不符',
        isPassed: false,
      },
      {
        date: '201X年XX月XX日',
        info: '提交申请',
        isPassed: true,
      },
    ],
  },

  pageLifetimes: {
    show() {
      const { statusFeed } = this.data;
      const result = statusFeed.map(item => {
        const temp = item;
        temp.info = `${item.info} ${item.isPassed ? '同意' : '驳回'}`;
        return temp;
      });
      this.setData({
        statusFeed: result,
      });
    },
    hide() {
    },
  },

  method: {

  },
});
