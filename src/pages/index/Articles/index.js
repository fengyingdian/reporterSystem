// pages/index/index.js
import api from '../../../service/api';
import { formatDate, formatTime, formatImage } from '../../../utils/util';

Component({
  properties: {
    pageHeight: {
      type: Number,
      value: 0,
    },
  },

  data: {
    perPage: 20,
    pageKey: '',
    articles: [],
    bottomTips: '- END -',
    fetchedAll: false,
    loadStatus: 1,
  },

  lifetimes: {
    attached() {
      this.fetchActivities();
    },
    moved() {},
    detached() {},
  },

  attached() {},
  ready() {
    this.observer = this.createIntersectionObserver({ observeAll: true });
    this.observer.relativeTo('.scroll-view').observe('.bottom', (res) => {
      const { loadStatus } = this.data;
      const { intersectionRatio } = res;
      if (loadStatus === 0 && intersectionRatio > 0) {
        this.setData({
          loadStatus: 1,
        });
        this.fetchActivities();
      }
    });
  },

  pageLifetimes: {
    show() {},
    hide() {},
    resize() {},
  },

  methods: {
    fetchActivities() {
      const that = this;
      const { pageKey, perPage, articles } = that.data;
      api
        .fetchActivitiesSmart(pageKey, perPage)
        .then((res) => {
          // Flimi.AppBase().logManager.log('home feed', res);
          const {
            data,
            meta: { pageKey: newpageKey = '' },
          } = res.data;
          data.map((element) => {
            const {
              authorId,
              influencerComments,
              covers: [cover],
            } = element;
            const result = element;
            if (influencerComments) {
              const influencer = influencerComments.find(({ authorId: id }) => id === authorId);
              if (influencer) {
                result.influencer = influencer;
                const { fullSlug } = influencer;
                result.commentTime = formatTime(
                  new Date(parseInt(fullSlug.slice(0, 10), 10) * 1000),
                );
              }
            }
            const { publishedAt, createdAt } = result;
            result.time = formatDate(new Date(publishedAt));
            result.createdTime = formatTime(new Date(createdAt));

            // cover
            result.cover = (() => {
              if (cover) {
                return formatImage(cover.url, '/resize,w_375');
              }
              // TODO
              // need a default cover image
              return '';
            })();
            return result;
          });
          if (data.length < 1) {
            that.setData({
              fetchedAll: true,
              articles: [...articles, data],
            });
          } else {
            that.setData({
              articles: [...articles, data],
              pageKey: newpageKey,
            });
          }
          setTimeout(() => {
            that.setData({
              loadStatus: 0,
            });
          }, 1000);
        })
        .catch(() => {
          // Flimi.AppBase().logManager.log('catch home feed error', res);
          wx.navigateTo({
            url: '/pages/networkError/index',
          });
        });
    },

    tapArticle() {
      // Flimi.AppBase().logManager.log('tapArtcleIndex', ops);
      // const { article } = ops.detail;
      // this.collect({ article });
    },

    collect(ops) {
      const { article } = ops;
      const {
        meta: { page, count },
      } = article;

      // Flimi.AppBase().logManager.log('collect', article);

      try {
        const collect = wx.getStorageSync('collect');
        if (collect) {
          const key = `articles[${page - 1}][${count}].found`;
          this.setData({
            [key]: true,
          });
          article.found = true;
          collect[article.fl_url] = article;
          try {
            wx.setStorageSync('collect', collect);
          } catch (e) {
            // Flimi.AppBase().logManager.log('collect error', e);
          }
        } else {
          // need init collect in app.js
        }
      } catch (e) {
        // do something when catch error
      }
    },
  },
});
