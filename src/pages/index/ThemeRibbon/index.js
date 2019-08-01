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
    onTheme(opts) {
      this.triggerEvent('themeSelect', { currentThemeIndex: opts.currentTarget.dataset.index });
    },

    onMore() {},
  },
});
