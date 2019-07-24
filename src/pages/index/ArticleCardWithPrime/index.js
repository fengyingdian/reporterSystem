// components/ArticleCardE/index.js
import api from '../../../service/notification';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: null,
      observer() {
        this.privateShowImage();
      },
    },
    index: {
      type: Number,
      value: -1,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  attached() {},

  ready() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    privateShowImage() {
      const that = this;
      const { index, data } = that.data;
      if (index >= 0 && data) {
        setTimeout(() => that.setData({
          cover: data.cover,
        }), (index + 1) * 400);
      }
    },

    postFormId(options) {
      const { formId } = options.detail;
      const { openId } = getApp().globalData;
      if (openId && formId) {
        api.postFormId({
          openId,
          formId,
          timestamp: new Date().getTime(),
        });
      }
    },

    onCircle(options) {
      this.postFormId(options);

      const {
        dataset: { name, id },
      } = options.currentTarget;
      if (name) {
        wx.navigateTo({
          url: `/pages/circle/index?name=${name}&id=${id}`,
        });
      }
    },

    onInfluencer(options) {
      this.postFormId(options);

      const { influencer } = this.data.data;
      if (influencer) {
        const { authorId } = influencer;
        wx.navigateTo({
          url: `/pages/influencer/index?userid=${authorId}&flType=`,
        });
      }
    },

    onArticle(options) {
      this.postFormId(options);

      const { data: article } = this.data;
      const { authorId, id: articleId } = article;
      wx.navigateTo({
        url: `/pages/vcomment/index?articleId=${articleId}&authorId=${authorId}`,
      });
      this.triggerEvent('article', { article }, { bubbles: true, composed: true });
    },

    onCoverError(options) {
      Flimi.AppBase().logManager.log(options.detail);
    },

    onCoverLoad() {
      this.setData({
        imageShow: 'image-show',
      });
    },
  },
});
