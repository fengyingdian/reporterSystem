/*
 * File: app.js
 * File Created: Monday, 18th February 2019 10:38:49 am
 * Author: Break <fengyingdian@126.com>
 */

// app.js
const api = require('./dist/service/api');
const wxPromisify = require('./dist/service/wxpromisify');
const settings = require('./dist/settings').default;

App({
  onLaunch() {
    this.onLaunchCount();

    this.onIsLogin();
  },

  onShow(ops) {
    this.onLaunchAppAuthorization(ops);

    // check sessionKey
    this.onCheckSessionKey();
  },

  onLaunchCount() {
    try {
      this.globalData.launchCount = wx.getStorageSync(settings.LAUNCH_COUNT);
    } catch (e) {
      this.globalData.launchCount = 0;
    }
    if (!this.globalData.launchCount) {
      this.globalData.launchCount = 0;
    }
    // wx.setStorage({
    //   key: Settings.LAUNCH_COUNT,
    //   data: this.globalData.launchCount + 1,
    // });
  },

  onCheckSessionKey() {
    const that = this;
    wx.checkSession({
      success: () => {
        // session_key 未过期，并且在本生命周期一直有效
      },
      fail: () => {
        // session_key 已经失效，需要重新执行登录流程
        that.getSessionKey();
      },
    });
  },

  onLaunchAppAuthorization(ops) {
    const { scene } = ops;
    if (scene === 1069) {
      this.globalData.launchAppAuthorization = true;
    } else if (scene === 1036) {
      this.globalData.launchAppAuthorization = true;
    } else if (scene !== 1089 && scene !== 1090 && scene !== 1038) {
      this.globalData.launchAppAuthorization = false;
    }
  },

  onIsLogin() {
    const that = this;
    wxPromisify
      .login()
      .then(({ code }) => api.isLogin(code))
      .then(({
        data: {
          status, exist: user, token, openId, sessionKey,
        },
      }) => {
        if (status === 0) {
          if (user) {
            that.globalData.userInfo = {
              token,
              ...user,
            };
            if (this.getUserInfoCallBack) {
              this.getUserInfoCallBack();
            }
          }
          if (sessionKey) {
            that.globalData.sessionKey = sessionKey;
          }
          if (openId) {
            that.globalData.openId = openId;
          }
        }
      });
  },

  onGotAuthorization(ops) {
    const that = this;
    if (!that.globalData.sessionKey) {
      return that.getSessionKey().then((res) => {
        if (res) {
          return that.login(ops);
        }
        return false;
      });
    }
    return that.login(ops);
  },

  getSessionKey() {
    const that = this;
    return wxPromisify
      .login()
      .catch(() => false)
      .then(({ code }) => api.getSessionKey(code))
      .then((res) => {
        const { sessionKey } = res.data;
        if (sessionKey) {
          that.globalData.sessionKey = sessionKey;
          return true;
        }
        return false;
      })
      .catch(() => false);
  },

  login(ops) {
    const that = this;
    const { sessionKey } = that.globalData;
    const { encryptedData, iv } = ops;
    return api
      .login(sessionKey, encryptedData, iv)
      .then((res) => {
        const { status, user, token = '' } = res.data;
        if (status === 0 && user) {
          that.globalData.userInfo = {
            ...user,
            token,
          };
          if (user.openId) {
            that.globalData.openId = user.openId;
          }
          if (that.getUserInfoCallBack) {
            that.getUserInfoCallBack();
          }
          return true;
        }
        return false;
      })
      .catch(() => false);
  },

  isLogin() {
    const { userInfo } = this.globalData;
    if (userInfo) {
      return userInfo.id && userInfo.token;
    }
    return false;
  },

  globalData: {
    openId: null,
    sessionKey: null,
    userInfo: null,
    launchCount: 0,
    launchAppAuthorization: false,
  },
});
