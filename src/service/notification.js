/*
 * File: notification.js
 * Project: Reporter
 * File Created: Tuesday, 30th April 2019 10:13:51 am
 * Author: break (fengyingdian@126.com)
 */
export const platform = 'p';

export const HOST = (() => {
  if (platform === 's') {
    return 'https://influencer-service-staging.flipchina.cn';
  }
  if (platform === 'p') {
    return 'https://influencer-service.flipchina.cn';
  }
  return 'http://localhost:8800';
})();

const wxPromisify = wxCPSFunction => e => new Promise((resolve, reject) => wxCPSFunction({
  ...e,
  success: (result) => {
    resolve(result);
  },
  fail: (reason) => {
    reject(reason);
  },
}));

function wxRequest({ url, method = 'GET', data = {} }) {
  console.log(method, url);
  return wxPromisify(wx.request)({
    url,
    method,
    data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

/**
 *
 */
const postFormId = ({ openId, formId, timestamp }) => wxRequest({
  url: `${HOST}/api/app/notify/actions/update-formid`,
  method: 'POST',
  data: {
    openId,
    formId,
    timestamp,
  },
});

/**
 *
 */
const sendClapMessage2User = (ops) => {
  const {
    toUid,
    url,
    articleTitle,
    commentId,
    commentContent,
    fromUserName,
    timestamp,
    clapCount,
  } = ops;
  return wxRequest({
    url: `${HOST}/api/app/notify/actions/send-clap-notification`,
    method: 'POST',
    data: {
      toUid,
      url,
      articleTitle,
      commentId,
      commentContent,
      fromUserName,
      timestamp,
      clapCount,
    },
  });
};

// remark text length need to be stricted in a proper length
const REMARK_MAX_LENGTH = 30;

/**
 *
 */
const sendRespondMessage2User = (ops) => {
  const {
    toUid,
    url,
    articleTitle,
    replyId,
    commentContent,
    fromUserName,
    remark,
    timestamp,
  } = ops;

  const formmatted = (() => {
    if (remark && remark.length > REMARK_MAX_LENGTH) {
      return `${remark.substr(0, REMARK_MAX_LENGTH - 1)}...`;
    }
    return remark;
  })();

  return wxRequest({
    url: `${HOST}/api/app/notify/actions/send-respond-notification`,
    method: 'POST',
    data: {
      toUid,
      url,
      articleTitle,
      replyId,
      commentContent,
      fromUserName,
      remark: formmatted,
      timestamp,
    },
  });
};

module.exports = {
  postFormId,
  sendClapMessage2User,
  sendRespondMessage2User,
};
