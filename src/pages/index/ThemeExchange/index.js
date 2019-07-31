// pages/index/index.js
Component({
  properties: {},

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
    onExchange() {
      this.triggerEvent('themeExchange');
    },
  },
});
