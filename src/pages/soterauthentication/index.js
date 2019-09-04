// const AUTH_MODE = ['fingerPrint', 'facial'];

Page({
  startAuth(e) {
    const { mode } = e.currentTarget.dataset;
    const startSoterAuthentication = authmode => {
      wx.startSoterAuthentication({
        requestAuthModes: [authmode],
        challenge: 'test',
        authContent: '小程序示例',
        success: res => {
          console.log(res);
          wx.showToast({
            title: '认证成功',
          });
        },
        fail: err => {
          console.error(err);
          wx.showModal({
            title: '失败',
            content: '认证失败',
            showCancel: false,
          });
        },
      });
    };

    const checkIsEnrolled = (authmode) => {
      wx.checkIsSoterEnrolledInDevice({
        checkAuthMode: authmode,
        success: res => {
          console.log(res);
          if (parseInt(res.isEnrolled, 10) <= 0) {
            wx.showModal({
              title: '错误',
              content: '您暂未录入生物验证信息，请录入后重试',
              showCancel: false,
            });
            return;
          }
          startSoterAuthentication(authmode);
        },
        fail: err => {
          console.error(err);
        },
      });
    };

    wx.checkIsSupportSoterAuthentication({
      success: res => {
        console.log(res);
        checkIsEnrolled(mode);
      },
      fail: err => {
        console.error(err);
        wx.showModal({
          title: '错误',
          content: '您的设备不支持生物认证识别',
          showCancel: false,
        });
      },
    });
  },
});
