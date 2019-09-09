import settings from '../settings';

export const formatNumber = (n) => {
  const m = n.toString();
  return m[1] ? m : `0${m}`;
};

export const formatTime = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${[month, day].map(formatNumber).join('-')} ${[hour, minute]
    .map(formatNumber)
    .join(':')}`;
};

export const formatDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${[month, day].map(formatNumber).join('-')}`;
};

export const formatDateChinese = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}月${day}日`;
};

export const formatImage = (url, format) => {
  if (url.indexOf(settings.OSS_IMAGE_FORMAT) > 0) {
    return url + format;
  }
  if (url.indexOf(settings.COMPANY_NAME_CHINA) > 0 || url.indexOf(settings.COMPANY_NAME) > 0) {
    return `${url}?${settings.OSS_IMAGE_FORMAT_JPG}${format}`;
  }
  return url;
};

export const toHttps = (url) => {
  if (url) {
    if (url.indexOf('https') >= 0) {
      return url;
    }
    if (url.indexOf('http') >= 0) {
      return url.replace('http', 'https');
    }
  }
  return null;
};

export const number2Chinese = section => {
  const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const chnUnitChar = ['', '十', '百', '千', '万', '亿', '万亿', '亿亿'];
  let inValue = section;
  let strIns = '';
  let chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (inValue > 0) {
    const v = inValue % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos += 1;
    inValue = Math.floor(inValue / 10);
  }
  return chnStr;
};

export const getPageIndexDescription = index => {
  switch (index) {
    case 0:
      return '1/4 基本信息';
    case 1:
      return '2/4 教育经历';
    case 2:
      return '3/4 工作经历';
    case 3:
      return '4/4 上传附件';
    case 4:
      return '信息和材料确认';
    default:
      break;
  }
  return '未知错误';
};

export const getApplyStatusDescription = status => {
  switch (status) {
    case 0:
      return '未提交申请';
    case 1:
      return '申请审核中';
    case 2:
      return '申请成功';
    case 3:
      return '申请失败';
    default:
      break;
  }
  return '未知错误';
};
