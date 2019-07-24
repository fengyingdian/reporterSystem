/*
 * File: wxpromisify.js
 * Project: flimi
 * File Created: Wednesday, 5th June 2019 5:15:25 pm
 * Author: break (fengyingdian@126.com)
 */

const wxPromisify = wxCPSFunction => opts => new Promise((resolve, reject) => wxCPSFunction({
  ...opts,
  success: (result) => {
    resolve(result);
  },
  fail: (reason) => {
    reject(reason);
  },
}));

const getImageInfo = wxPromisify(wx.getImageInfo);

const canvasToTempFilePath = wxPromisify(wx.canvasToTempFilePath);

const pageScrollTo = wxPromisify(wx.pageScrollTo);

const login = wxPromisify(wx.login);

const startGyroscope = wxPromisify(wx.startGyroscope);

module.exports = {
  getImageInfo,
  canvasToTempFilePath,

  startGyroscope,

  pageScrollTo,

  login,
};
