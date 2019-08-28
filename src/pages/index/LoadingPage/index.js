Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: '中国记者',
  },

  attached() { },

  ready() { },

  lifetimes: {
    attached() { },
    moved() { },
    detached() { },
  },
  /**
   * 组件的方法列表
   */
  methods: {},
});
