// pages/index/index.js
Component({
  properties: {
    articleList: Array,
  },

  data: {},

  lifetimes: {
    attached() {},
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

  methods: {},
});
