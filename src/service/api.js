/*
 * File: api.js
 * File Created: Friday, 12th April 2019 3:50:06 pm
 * Author: Break <fengyingdian@126.com>
 */

export const platform = 'l';

export const HOST = (() => {
  if (platform === 's') {
    return 'https://influencer-service-staging.flipchina.cn';
  }
  if (platform === 'p') {
    return 'https://influencer-service.flipchina.cn';
  }
  return 'http://localhost:8800';
})();

const wxPromisify = wxCPSFunction => opts => new Promise((resolve, reject) => wxCPSFunction({
  ...opts,
  success: (result) => {
    resolve(result);
  },
  fail: (reason) => {
    reject(reason);
  },
}));

const wxRequest = ({ url, method = 'GET', data = {} }) => {
  console.log(method, url, data);
  return wxPromisify(wx.request)({
    url,
    method,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

// eslint-disable-next-line
const wxRequestWithAuthorization = ({ url, method = 'GET', data = {} }) => {
  console.log(method, url, data);
  const token = (() => {
    const { userInfo } = getApp().globalData;
    if (userInfo) {
      return userInfo.token || '';
    }
    return '';
  })();
  return wxPromisify(wx.request)({
    url,
    method,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // eslint-disable-next-line
      'Authorization': `Bearer ${token}`,
    },
  });
};

/**
 * 得到 sessionKey
 */
const getStatus = () => wxRequest({
  url: `${HOST}/api/status`,
});

/**
 * 得到 sessionKey
 */
const getSessionKey = code => wxRequest({
  url: `${HOST}/auth/wx/sessionkey`,
  data: {
    code,
  },
  method: 'POST',
});

/**
 * 用户是否登录
 */
const isLogin = code => wxRequest({
  url: `${HOST}/auth/wx/islogin`,
  data: {
    code,
  },
  method: 'POST',
});

/**
 * 用户登录
 */
const login = (code, encryptedData, iv) => wxRequest({
  url: `${HOST}/auth/wx/login`,
  data: {
    code,
    encryptedData,
    iv,
  },
  method: 'POST',
});

/**
 * upload id card base64
 */
const uploadIdCard = image => wxRequestWithAuthorization({
  url: `${HOST}/api/app/wechat/actions/id-card-info`,
  data: {
    image,
  },
  method: 'POST',
});

module.exports = {
  wxPromisify,

  getStatus,
  getSessionKey,
  isLogin,
  login,

  uploadIdCard,
};
