import api from '../../service/api';

const app = getApp();

Component({
  properties: {
    respondData: {
      type: Object,
      value: {
        articleId: String,
        respondTo: String,
        toUid: String,
        replyId: String,
        rootId: String,
      },
      observer() {
        if (this.data.respondData) {
          const { respondTo } = this.data.respondData;
          if (respondTo.length > 0) {
            this.setData({
              focus: true,
              content: '',
              placeholder: `回复 ${respondTo}: `,
            });
          }
        }
      },
    },
    focus: Boolean,
  },

  data: {
    content: '',
    placeholder: '',
    isDisbleSubmit: false,
    adjustPosition: false,
    showConfirmBar: false,
    fixed: true,
    keyboardHeight: 0,
  },

  attached() {},

  ready() {},

  methods: {
    userInput(e) {
      const { value: content = '' } = e.detail;
      this.setData({
        content,
      });
    },

    keyBoardHeightChange(ops) {
      // Flimi.AppBase().logManager.log('keyBoardHeightChange', ops);
      if (ops.detail.height > this.data.keyboardHeight) {
        this.setData({
          keyboardHeight: ops.detail.height,
        });
      }
    },

    focus(ops) {
      // Flimi.AppBase().logManager.log('focus', ops);
      if (ops.detail.height > this.data.keyboardHeight) {
        this.setData({
          keyboardHeight: ops.detail.height,
        });
      }
    },

    onSubmit() {
      const that = this;
      const content = that.data.content.replace(/(^\s*)|(\s*$)/g, '');
      if (content.length < 1) {
        wx.showToast({
          title: '内容为空',
          icon: 'fail',
          duration: 1500,
        });
        return;
      }
      const {
        userInfo: { fl_uid: uid },
      } = app.globalData;
      if (uid) {
        const {
          articleId, toUid, replyId, rootId,
        } = that.data.respondData;
        that.setData({
          isDisableSubmit: true,
        });
        api
          .addFlipBoardComment({
            articleId,
            uid,
            comment: content,
            toUid,
            replyId,
            rootId,
          })
          .then((res) => {
            // Flimi.AppBase().logManager.log('submit.success', res);
            const { status } = res.data;
            if (status === 0) {
              that.onAfterSumbmit(content);
            } else {
              wx.showToast({
                title: '发表失败',
                duration: 1500,
              });
            }
          })
          .catch(() => {
            // Flimi.AppBase().logManager.log('submit.fail', res);
            wx.showToast({
              title: '发表失败',
              duration: 1500,
            });
          })
          .then(() => that.setData({
            isDisableSubmit: false,
          }));
      } else {
        wx.showToast({
          title: '尚未登录',
        });
      }
    },

    onBlur() {
      // this.triggerEvent('submit', { refresh: false });
    },

    onAfterSumbmit(res) {
      if (app.onRespondCommentSubmitCallback) {
        app.onRespondCommentSubmitCallback(res);
      }
      this.triggerEvent('submit', { refresh: true });
    },
  },
});
