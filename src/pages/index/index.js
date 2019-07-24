/*
 * File: index.js
 * Project: flimi
 * File Created: Saturday, 20th April 2019 10:34:22 pm
 * Author: break (fengyingdian@126.com)
 */

import api from '../../service/api';
import { formatDate, formatTime, formatImage } from '../../utils/util';

Page({
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    hideTimeStamp: null,

    perPage: 6,
    pageKey: '',
    articles: [],
    bottomTips: '- END -',
    fetchedAll: false,

    // loading page
    attachLoadingPage: true,
    showLoadingPage: true,

    // show launching page
    showLaunchingPage: false,

    gyro: {
      x: 1,
      y: 1,
      z: 1,

    },
    timestamp: 0,
  },

  onLoad() {
    // check if user is first launch
    // this action need to do
    // in the very first time
    // this.checkShowLaunchingPage();
    Flimi.AppBase().logManager.log(wx.getSystemInfoSync());

    // then you can do other things
    this.init();
    this.initArticleData();
    this.fetchActivities();
  },

  onShow() {},

  onHide() {},

  // checkShowLaunchingPage() {
  //   if (app.globalData.launchCount === 0) {
  //     this.setData({
  //       showLaunchingPage: true,
  //     });
  //     app.globalData.launchCount += 1;
  //   }
  // },

  // stopLaunchingPage() {
  //   if (app.globalData.launchCount === 0) {
  //     setTimeout(
  //       () => this.setData({
  //         showLaunchingPage: false,
  //       }),
  //       5000,
  //     );
  //   }
  // },

  init() {
    const { screenHeight, statusBarHeight } = wx.getSystemInfoSync();
    const marginTop = statusBarHeight + 45;
    const swiperHeight = screenHeight - marginTop;
    this.setData({
      titleSelected: 0,
      marginTop,
      swiperHeight,
    });

    // a test of device motion
    // wx.startDeviceMotionListening();
    // wx.onDeviceMotionChange(({ alpha, beta, gamma }) => {
    //   Flimi.AppBase().logManager.log(alpha, beta, gamma);
    // });
  },

  initArticleData() {
    this.setData({
      articles: [],
      bottomTips: '- END -',
      fetchedAll: false,
    });
    this.data.pageKey = '';
    this.data.perPage = 6;
  },

  fetchActivities(isPullDown) {
    const that = this;
    const { pageKey, perPage, articles } = that.data;
    const { theOldArticle, theOldKey } = (() => {
      if (isPullDown) {
        return {
          theOldArticle: [],
          theOldKey: '',
        };
      }
      return {
        theOldArticle: articles,
        theOldKey: pageKey,
      };
    })();
    api
      .fetchActivitiesSmart(theOldKey, perPage)
      .then((res) => {
        const {
          data,
          meta: { pageKey: newpageKey = '' },
          status,
        } = res.data;

        if (status !== 0) {
          wx.navigateTo({
            url: '/pages/networkError/index',
          });
        }

        if (articles.length > 0) {
          const [article] = data;
          const [[oldArticle]] = articles;
          if (article.id === oldArticle.id) {
            return;
          }
        }

        data.map((element) => {
          const {
            authorId,
            influencerComments,
            homefeedComments,
            publishedAt,
            createdAt,
            title,
            covers: [cover],
          } = element;
          const result = element;

          // influencer
          const influencer = influencerComments.find(({ authorId: id }) => id === authorId);
          if (influencer) {
            result.influencer = influencer;
            const { fullSlug, comment, avatar } = influencer;
            result.commentTime = formatTime(new Date(parseInt(fullSlug.slice(0, 10), 10) * 1000));
            influencer.avatar = formatImage(avatar, '/resize,w_100/quality,q_80');
            influencer.comment = comment.replace(/[\r\n]/g, '').replace(/(^\s*)|(\s*$)/g, '');
          }

          // prime
          result.prime = (() => {
            if (homefeedComments && homefeedComments.length > 0) {
              return homefeedComments[0];
            }
            return null;
          })();

          // cover
          result.cover = (() => {
            if (cover) {
              return formatImage(cover.url, '/resize,w_400/quality,q_95');
            }
            // TODO
            // need a default cover image
            return '';
          })();

          result.time = formatDate(new Date(publishedAt));
          result.createdTime = formatTime(new Date(createdAt));
          result.title = title.replace(/&quot;/g, '');
          return result;
        });

        if (data.length < 1) {
          that.setData({
            fetchedAll: true,
            articles: [...theOldArticle, data],
          });
        } else {
          that.setData({
            articles: [...theOldArticle, data],
          });
          that.data.pageKey = newpageKey;
        }

        // if the launching page is showing
        // stop it at this time
        // this.stopLaunchingPage();

        setTimeout(() => {
          that.setData({
            showLoadingPage: false,
          });
        }, 300);

        setTimeout(() => {
          that.setData({
            attachLoadingPage: false,
          });
        }, 1300);
      })
      .catch(() => {
        wx.navigateTo({
          url: '/pages/networkError/index',
        });
      });
  },

  tapArticle() {},

  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.fetchActivities(true);
  },

  onReachBottom() {
    this.fetchActivities();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    const that = this;
    const path = '/pages/index/index';
    const { nickname, info, comment } = that.data.celebrity;
    const title = `${nickname}(${info}): ${comment}`;
    return {
      title,
      path,
      success: () => {
        if (res.shareTickets) {
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
          });
        }
      },
      fail: () => {},
      complete: () => {},
    };
  },
});
