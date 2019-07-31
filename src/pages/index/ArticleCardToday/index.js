// pages/index/index.js
Component({
  properties: {
    title: String,
    cover: String,
    excerpt: String,
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
    onCoverError() {},
    onCoverLoad() {},
  },
});
