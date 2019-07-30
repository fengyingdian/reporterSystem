// pages/index/index.js
Component({
  properties: {
    themeList: Array,
    currentTheme: Number,
  },

  data: {},

  lifetimes: {
    attached() {},
    moved() {},
    detached() {},
  },

  attached() {},
  ready() {},

  pageLifetimes: {
    show() {},
    hide() {},
    resize() {},
  },

  methods: {
    tapTheme(opts) {
      this.setData({
        currentTheme: opts.currentTarget.dataset.index,
      });
    },
  },
});
