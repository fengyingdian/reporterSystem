/*
 * File: index.js
 * Project: Flime
 * File Created: Saturday, 20th April 2019 10:34:22 pm
 * Author: break (fengyingdian@126.com)
 */

import api from '../../service/api';

Page({
  data: {
    // loading page
    attachLoadingPage: true,
    showLoadingPage: true,

    // top margin
    topMargin: wx.getSystemInfoSync().statusBarHeight + 45,
    // eslint-disable-next-line max-len
    contentAreaHeight:
      wx.getSystemInfoSync().screenHeight - wx.getSystemInfoSync().statusBarHeight - 45,

    // current theme
    currentThemeIndex: 0,
    // theme list
    themeList: [
      {
        id: 1,
        name: '互联网资讯',
        desc: '',
      },
      {
        id: 2,
        name: '科技测评',
        desc: '',
      },
      {
        id: 3,
        name: '编程开发',
        desc: '',
      },
      {
        id: 4,
        name: '产品/运营',
        desc: '',
      },
      {
        id: 5,
        name: '数据报告',
        desc: '',
      },
      {
        id: 6,
        name: '观影追剧',
        desc: '',
      },
      {
        id: 7,
        name: '游戏爱好者',
        desc: '',
      },
      {
        id: 8,
        name: '今日收图',
        desc: '',
      },
      {
        id: 9,
        name: '美好生活',
        desc: '',
      },
    ],
    // current article list
    currentArticleList: [],
    perPage: 7,
  },

  onLoad() {
    // then you can do other things
    this.init();
  },

  onShow() {},

  onHide() {},

  async init() {
    const that = this;
    const { perPage } = that.data;
    // get theme list

    // get current theme article list
    // const currentTheme = themeList[currentThemeIndex];

    api.fetchActivitiesSmart('', perPage).then((res) => {
      const {
        data: articles,
        meta: { pageKey },
      } = res.data;
      const currentArticleList = articles.map((article) => {
        const {
          covers: [cover],
          title,
          excerpt,
          id: articleId,
        } = article;
        return {
          cover: cover.url,
          title,
          excerpt,
          articleId,
        };
      });
      if (articles.length < perPage) {
        that.setData({
          endOfPage: true,
        });
      } else {
        that.setData({
          currentArticleList: [...that.data.currentArticleList, ...currentArticleList],
          pageKey,
        });
        console.log(that.data.currentArticleList);
      }
    });

    setTimeout(() => {
      that.setData({
        attachLoadingPage: false,
      });
      setTimeout(() => {
        that.setData({
          showLoadingPage: false,
        });
      }, 1000);
    }, 1000);
  },

  // onPullDownRefresh() {
  //   wx.stopPullDownRefresh();
  // },

  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
