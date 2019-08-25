import api from '../../../service/api';
import { formatTime, formatDateChinese, formatImage } from '../../../utils/util';

const app = getApp();

function showLaunchingPage() {
  if (app.globalData.launchCount === 0) {
    this.setData({
      showLaunchingPage: true,
    });
    app.globalData.launchCount += 1;
  }
}

function stopLaunchingPage() {
  if (app.globalData.launchCount === 0) {
    this.setData({
      showLaunchingPage: false,
    });
  }
}

function checkLogin() {
  const that = this;
  that.setData({
    isLogin: getApp().isLogin(),
  });

  // waitting for callback
  getApp().getUserInfoCallBack = () => {
    that.setData({
      isLogin: getApp().isLogin(),
    });
  };
}

function initialize(ops) {
  const that = this;
  const articleId = (() => {
    if (ops.scene) {
      return ops.scene;
    }
    if (ops.articleId) {
      return ops.articleId;
    }
    return null;
  })();

  const { url, authorId, commentId } = ops;

  if (!articleId && !url) {
    wx.redirectTo({
      url: '/pages/index/index',
    });
    return;
  }

  that.setData({
    articleId: articleId || '',
    url: url || '',
  });

  if (authorId) {
    that.setData({
      authorId,
    });
  }

  if (commentId) {
    that.setData({
      selectedCommentId: commentId,
    });
  }

  const { launchCount, isShownNotifyCollection } = getApp().globalData;
  that.setData({
    isShowNotifyCollection: launchCount < 1 && !isShownNotifyCollection,
  });

  Promise.resolve()
    .then(() => that.fetchArticle())
    .then(() => that.fetchArticleComment())
    .then(() => that.drawCover())
    .catch((res) => {
      Reporter.AppBase().logManager.log('fetchActivitiesOne fail', res);
    });
}

function fetchArticle() {
  const that = this;
  const { articleId, url, authorId } = that.data;
  return api.fetchActivitiesOne(articleId, url).then((res) => {
    const { data } = res.data;
    data.cover = (() => {
      const [cover] = data.covers;
      if (cover && cover.url) {
        if (cover.url.indexOf('https') >= 0) {
          return cover.url;
        }
        if (cover.url.indexOf('http') >= 0) {
          return cover.url.replace('http', 'https');
        }
      }
      return null;
    })();
    const { publishedAt, title } = data;
    data.time = formatDateChinese(new Date(publishedAt));
    if (authorId && data.influencerComments.length > 0) {
      const influencer = data.influencerComments.find(({ authorId: id }) => id === authorId);
      if (influencer) {
        that.setData({
          influencer,
        });
      }
    } else if (data.influencerComments.length > 0) {
      that.setData({
        influencer: data.influencerComments[0],
      });
    }
    data.title = title.replace(/&quot;/g, '');
    that.setData({
      article: data,
      navigateTitle: data.title,
    });
    const [circle] = data.circles;
    that.setData({
      circle,
    });

    // if the launching page is showing
    // stop it at this time
    // this.stopLaunchingPage();
  });
}

const getUserId = () => {
  if (app.globalData.userInfo) {
    return app.globalData.userInfo.id;
  }
  return '';
};

const getAvatar = (authorImage) => {
  if (authorImage && authorImage.smallURL) {
    return formatImage(authorImage.smallURL, '/resize,w_100/quality,q_80');
  }
  return '/assets/temp/user.png';
};

const getReplyTo = (replyId, replyAuthor) => {
  if (replyId) {
    const { authorDisplayName } = replyAuthor;
    return `回复 ${authorDisplayName}: `;
  }
  return '';
};

const getFormatComment = (comment) => {
  const {
    dateCreated, authorImage, text, replyAuthor, replyId,
  } = comment;
  const avatar = getAvatar(authorImage);
  const time = formatTime(new Date(dateCreated));
  const replyTo = getReplyTo(replyId, replyAuthor);
  return {
    ...comment,
    avatar,
    time,
    replyTo,
    text: text.replace(/[\r\n]/g, '').replace(/(^\s*)|(\s*$)/g, ''),
  };
};

const checkInfluencerComment = (influencer, userid, text) => {
  if (influencer && userid && text) {
    const { fl_uid: uid, comment } = influencer;
    if (String(uid) === String(userid) && text === comment) {
      return true;
    }
  }
  return false;
};

function fetchArticleComment() {
  const that = this;
  const { id: articleId } = that.data.article;
  const { influencer } = that.data;
  const userId = getUserId();
  const topComments = [];
  const vipComments = [];
  const norComments = [];
  return api
    .fetchArticleComment({
      articleId,
      userId,
    })
    .then((res) => {
      const {
        status,
        data: { comments },
      } = res.data;
      if (status === 0) {
        // eslint-disable-next-line array-callback-return
        comments.map((element) => {
          const {
            verifiedType, prime, userid, text,
          } = element;
          const isInfluencerComment = checkInfluencerComment(influencer, userid, text);
          const result = getFormatComment(element);
          if (isInfluencerComment && !topComments.length) {
            topComments.push(result);
          } else if (verifiedType === 'vip' || prime) {
            vipComments.push(result);
          } else {
            norComments.push(result);
          }
          return result;
        });
        that.setData({
          oriComments: comments,
          topComments,
          vipComments,
          norComments,
        });
        setTimeout(
          () => that.setData({
            'showMgr.page': true,
          }),
          200,
        );
      } else {
        wx.showToast({
          title: '获取失败',
        });
        wx.redirectTo({
          url: '/pages/index/index',
        });
      }
    })
    .catch((res) => {
      Reporter.AppBase().logManager.log('fetch article comments error: ', res);
      wx.navigateTo({
        url: '/pages/networkerror/index',
      });
    });
}

function fetchArticleRecommendComment() {
  const that = this;
  const { id: articleId } = that.data.article;
  const { influencer } = that.data;
  const userId = getUserId();
  return api
    .fetchArticleComment({
      articleId,
      userId,
    })
    .then((res) => {
      const {
        status,
        data: { comments },
      } = res.data;
      if (status === 0) {
        // eslint-disable-next-line max-len
        const vipComments = comments.filter(element => checkInfluencerComment(influencer, element.userId, element.text));
        const primeComments = comments.filter(
          element => !checkInfluencerComment(influencer, element.userId, element.text),
        );
        that.setData({
          vipComments,
          primeComments,
        });
      } else {
        wx.showToast({
          title: '获取失败',
        });
        wx.redirectTo({
          url: '/pages/index/index',
        });
      }
    })
    .catch((res) => {
      Reporter.AppBase().logManager.log('fetch article comments error: ', res);
      wx.navigateTo({
        url: '/pages/networkerror/index',
      });
    });
}

export const init = {
  initialize,

  showLaunchingPage,
  stopLaunchingPage,

  checkLogin,

  fetchArticle,
  fetchArticleComment,
  fetchArticleRecommendComment,
};

export default {};
