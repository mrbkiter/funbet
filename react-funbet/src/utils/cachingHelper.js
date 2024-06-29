import get from 'lodash/get';
import set from 'lodash/set';
import snakeCase from 'lodash/snakeCase';
import isObject from 'lodash/isObject';
import trim from 'lodash/trim';
import { api } from 'utils/helper';

export const Deferred = function () {
  let res;
  let rej;
  const dfd = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  dfd.resolve = res;
  dfd.reject = rej;
  return dfd;
};

const prefix = `cachingHelper_react_ajax`;

window[`${prefix}ajaxParallelQueryStorage`] = {};
window[`${prefix}ajaxGetResponseStorage`] = {};

const safeGet = function (obj, path, defaultValue) {
  const value = get(obj, path, defaultValue);
  if (value == null || trim(value) === '') return defaultValue;
  return value;
};

const makeAjaxResponseStoreKey = function (url, paramsObj = {}) {
  let key = url;
  let paramsStr = '';
  if (isObject(paramsObj)) {
    // either it is array or an object
    paramsStr = JSON.stringify(paramsObj);
  }
  key += paramsStr;
  return snakeCase(key);
};
const getAjaxResponseOf = function (url, paramsObj = {}, defaultValue = null) {
  const key = makeAjaxResponseStoreKey(url, paramsObj);
  return safeGet(window[`${prefix}ajaxGetResponseStorage`], key, defaultValue);
};
const trackAjaxResponse = function (url, paramsObj = {}, responseData) {
  const key = makeAjaxResponseStoreKey(url, paramsObj);
  set(window[`${prefix}ajaxGetResponseStorage`], key, responseData);
};
const getParallelRunningAjaxByKey = function (url, paramsObj = {}) {
  const key = makeAjaxResponseStoreKey(url, paramsObj);
  return window[`${prefix}ajaxParallelQueryStorage`][key];
};
const trackParallelAjaxRequest = function (url, paramsObj = {}, memoAjax) {
  const key = makeAjaxResponseStoreKey(url, paramsObj);
  set(window[`${prefix}ajaxParallelQueryStorage`], key, memoAjax);
};

export const fetchData = function (
  requestUrl,
  requestParams,
  returnedValueOnError,
  alwaysHitServer = false,
) {
  const defer = Deferred();

  const runningInstance = getParallelRunningAjaxByKey(
    requestUrl,
    requestParams,
  );

  if (runningInstance) {
    const { memoAjax } = runningInstance;
    // memoAjax.success(handleSuccess(defer));
    return memoAjax;
  }
  const returnResult = getAjaxResponseOf(requestUrl, requestParams);
  if (!alwaysHitServer && returnResult) {
    return new Promise((resolve) => {
      resolve(returnResult);
    });
  }
  const memoAjax = api
    .get({ url: requestUrl, params: requestParams })
    .then((response) => {
      trackAjaxResponse(requestUrl, requestParams, response.data);
      defer.resolve(response);
      return response;
    })
    .catch((error) => {
      window.console.log('error', error.response.data.error);
      const key = makeAjaxResponseStoreKey(requestUrl, requestParams);
      delete window[`${prefix}ajaxParallelQueryStorage`][key];
      defer.resolve([]);
    });
  trackParallelAjaxRequest(requestUrl, requestParams, {
    memoAjax,
  });

  return defer;
};
