import { reject } from 'lodash';

// 过滤空值
export const isValues = (fields) => {
  return Object.keys(fields)
    .filter((key) => fields[key] !== null && fields[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: fields[key] }), {});
};

// 位置交换
// 例如：arr = [1,2,3,4,5]，将3与1交换swapItem(arr, 2, 0)，结果是[3,2,1,4,5]
// fromIndex: 当前元素所在位置索引, toIndex: 移动到交换的位置索引
export const swapItem = (arr, fromIndex, toIndex) => {
  arr[toIndex] = arr.splice(fromIndex, 1, arr[toIndex])[0];
  return arr;
};

// 上移
// 例如：arr = [1,2,3,4,5]，将3上移moveUpItem(arr, 2)，结果是[1,3,2,4,5]
// index: 当前元素索引
export const moveUpItem = (arr, index) => {
  if (index == 0) {
    return;
  }
  return swapItem(arr, index, index - 1);
};

// 下移
// 例如：arr = [1,2,3,4,5]，将3下移moveDownItem(arr, 2)，结果是[1,2,4,3,5]
export const moveDownItem = (arr, index) => {
  if (index == arr.length - 1) {
    return;
  }
  return swapItem(arr, index, index + 1);
};

// 移动至首位
// 例如：arr = [1,2,3,4,5]，将3移动至首位moveItemToFirst(arr, 2)，结果是[3,1,2,4,5]
// fromIndex: 当前元素所在位置索引
export const moveItemToFirst = (arr, fromIndex) => {
  let item;
  for (let k in arr) {
    item = arr[k];
    if (k == fromIndex) {
      arr.splice(k, 1);
      break;
    }
  }
  return arr.unshift(item);
};

// 关联品项查找父级id
export const getParentId = (options, id, key) => {
  let result;
  options.map((item) => {
    const arr = item?.children.map((order) => order[key]);
    if (arr.indexOf(id) > -1) {
      result = item[key];
    }
  });
  return result;
};
// 将图片URL转为file对象
export const getImgFileFormUrl = (url, imgName) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Accept', 'image/jpeg');
    xhr.responseType = 'blob';
    // 加载时处理
    xhr.onload = () => {
      let blob = xhr.response;
      let imgFile = new File([blob], imgName, { type: 'image/jpeg' });
      resolve(imgFile);
    };
    xhr.onerror = (e) => {
      reject(e);
    };
    xhr.send();
  });
};
//加法
export const accAdd = (a, b) => {
  const arg1 = a || 0;
  const arg2 = b || 0;
  let r1 = 0,
    r2 = 0,
    m = 0;
  try {
    r1 = String(arg1).split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = String(arg2).split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
};

export const isNullOrUndefined = (val) => {
  return val === null || val === undefined;
};

// 是否行业端公司
export const isIndustryCompany = (id) => {
  return [0, 1, 2, 472, 507].indexOf(id) < 0;
};

export const removeEmptyValues = (obj) => {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      removeEmptyValues(obj[key]);
    }
  });
  return obj;
};
//导出跳转
export const redirectWithParams = (url, params) => {
  if (params) {
    // 将参数转换为查询字符串
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    // 如果原URL已包含查询字符串，则使用'&'连接，否则使用'?'
    url += url.includes('?') ? '&' + queryString : '?' + queryString;
  }
  // 跳转到新的URL
  window.location.href = url;
};

//秒数转时分秒
export const formatSeconds = (value) => {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取余，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取余的分，获取分钟除以60取余的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  var result = '' + parseInt(secondTime) + '秒';

  if (minuteTime > 0) {
    result = '' + parseInt(minuteTime) + '分' + result;
  }
  if (hourTime > 0) {
    result = '' + parseInt(hourTime) + '小时' + result;
  }
  console.log('result', result);
  return result;
};

// 对象过滤空值
export const handleFilterObj = (params) => {
  for (let key in params) {
    if (typeof (params[key]) === 'undefined' || params[key] === null || params[key] === '') {
      delete params[key];
    }
  }
  return params;
};