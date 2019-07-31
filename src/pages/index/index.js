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
    // bottom margin
    bottomMargin: 80,
    // eslint-disable-next-line max-len
    contentAreaHeight:
      wx.getSystemInfoSync().screenHeight - wx.getSystemInfoSync().statusBarHeight - 45,

    isTopShow: true,
    isBottomShow: false,

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
    pageKey: '',
  },

  onLoad() {
    // then you can do other things
    this.init();
  },

  onShow() {},

  onHide() {},

  init() {
    const that = this;
    const { perPage, pageKey } = that.data;
    // get theme list

    // get current theme article list
    // const currentTheme = themeList[currentThemeIndex];

    api.fetchActivitiesSmart(pageKey, perPage).then((res) => {
      const {
        data: articles,
        meta: { pageKey: newKey },
      } = res.data;
      if (articles.length < 1) {
        that.setData({
          endOfPage: true,
        });
        return;
      }
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
      const [todayArticle] = currentArticleList;
      if (articles.length < perPage) {
        that.setData({
          currentArticleList: [...that.data.currentArticleList, ...currentArticleList.slice(1)],
          todayArticle,
          endOfPage: true,
        });
      } else {
        that.setData({
          currentArticleList: [...currentArticleList.slice(1)],
          todayArticle,
          pageKey: newKey,
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

  onPageScroll({ scrollTop }) {
    if (this.data.topMargin + 168 < scrollTop) {
      if (!this.data.isBottomShow) {
        this.setData({
          isBottomShow: true,
          isTopShow: false,
          navigatorBarTitle: this.data.themeList[this.data.currentThemeIndex].name,
        });
      }
    } else if (this.data.isBottomShow) {
      this.setData({
        isBottomShow: false,
        isTopShow: true,
        navigatorBarTitle: '',
      });
    }
  },

  onShareAppMessage() {},

  onThemeExchange() {
    this.init();
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    });
  },
});
