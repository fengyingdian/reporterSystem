Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: true,
      observer(newValue) {
        if (!newValue) {
          this.setData({
            hide: 'hide',
          });
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
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
