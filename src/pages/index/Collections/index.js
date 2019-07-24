// pages/index/index.js
Component({
  properties: {
    pageHeight: {
      type: Number,
      value: 0,
    },
  },

  data: {
    page: 1,
    perPage: 4,
    articles: [],
    bottomTips: '- 读过的文章会收藏在这里 -',
    fetchedAll: false,
    loadStatus: 1,
  },

  lifetimes: {
    attached() {
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
        this.fetchCollect();
      }
    });
  },

  pageLifetimes: {
    show() {
      this.init();
      this.fetchCollect();
    },
    hide() {},
    resize() {},
  },

  methods: {
    init() {
      this.setData({
        page: 1,
        perPage: 4,
        articles: [],
        bottomTips: '- 读过的文章会收藏在这里 -',
        fetchedAll: false,
        loadStatus: 1,
      });
    },
    fetchCollect() {
      const that = this;
      try {
        const collect = wx.getStorageSync('collect');
        if (collect) {
          const { page = 1, perPage = 4 } = that.data;
          const keys = Object.keys(collect);
          const data = [];
          const contained = perPage * (page - 1);
          const diff = keys.length - contained;
          for (let i = 0; i < diff && i < perPage; i += 1) {
            data.push(collect[keys[contained + i]]);
          }
          if (data.length < perPage) {
            that.setData({
              fetchedAll: true,
              [`articles[${page - 1}]`]: data,
            });
          } else {
            that.setData({
              [`articles[${page - 1}]`]: data,
              page: page + 1,
            });
          }
          setTimeout(() => {
            that.setData({
              loadStatus: 0,
            });
          }, 1000);
        } else {
          // Flimi.AppBase().logManager.log('no collect');
        }
      } catch (e) {
        // Flimi.AppBase().logManager.log('no collect');
      }
    },
  },
});
