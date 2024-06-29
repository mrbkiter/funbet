/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  lazy,
  Suspense,
} from 'react';
import axios from 'axios';
import { i18n } from 'utils/lib/i18n';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import debounce from 'lodash/debounce';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import head from 'lodash/head';
import tail from 'lodash/tail';
import memoize from 'lodash/memoize';
import trim from 'lodash/trim';
import startsWith from 'lodash/startsWith';
import isNumber from 'lodash/isNumber';
import isNil from 'lodash/isNil';
import {
  parsePhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';
import { australiaRegexPhone } from 'utils/lib/yup';

export const DOCUMENT_TYPE_LINK_CODE = 'save_link_document';
export const SIGN_REQUEST_CODE = 'sign_request';
export const SIGN_REQUEST_LOG_CODE = 'sign_request_log';
export const VINNEO_OUTREACH = 'vinneo_outreach';
export const VINNEO_VIDEO = 'vinneo_video';
export const TSHEET_TIMETEMP = 'tsheet_timetemp';

export const SPECIAL_DOCS_TYPE = [
  SIGN_REQUEST_CODE,
  SIGN_REQUEST_LOG_CODE,
  VINNEO_OUTREACH,
  VINNEO_VIDEO,
  TSHEET_TIMETEMP,
];

export const apiUrl =
  window.location.hostname === 'localhost.vinceredev.com'
    ? isEmpty(window.location.port)
      ? process.env.API_LOCAL_ORIGIN
      : process.env.API_LOCAL
    : window.location.origin;
const apiGateWay = (apiMethod, res) => {
  let requestUrl = window.Toolkit
    ? window.Toolkit.getExchangedRequestUrl(res.url)
    : res.url;
  if (requestUrl && requestUrl.startsWith('/')) {
    requestUrl = `${apiUrl}${res.url}`;
  }
  const gateway = {
    url: requestUrl,
    method: apiMethod,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    withCredentials: true,
    // responseType: 'json',
  };

  if (apiMethod === 'GET' && !isEmpty(res.params)) {
    gateway.params = res.params;
  }

  if (apiMethod === 'POST' || apiMethod === 'PUT') {
    gateway.data = JSON.stringify(res.data);
  }

  if (apiMethod === 'FORMDATA') {
    gateway.method = 'POST';
    gateway.headers = {
      'Content-Type': 'multipart/form-data',
    };
    gateway.data = res.data;
  }

  return gateway;
};

export const api = {
  get: (request) => {
    return axios(apiGateWay('GET', request));
  },
  post: (request) => {
    return axios(apiGateWay('POST', request));
  },
  put: (request) => {
    return axios(apiGateWay('PUT', request));
  },
  patch: (request) => {
    return axios(apiGateWay('PATCH', request));
  },
  delete: (request) => {
    return axios(apiGateWay('DELETE', request));
  },
  postFormData: (request) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    return axios.post(`${apiUrl}${request.url}`, request.data, config);
  },
  formUrlEncoded: (request) => {
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    return axios.post(
      `${apiUrl}${request.url}`,
      new URLSearchParams(request.data),
      config,
    );
  },
  multipartMethods: (request) => {
    return axios(apiGateWay('FORMDATA', request));
  },
};

export const axiosBaseQuery =
  (request) =>
  async ({ url }) => {
    try {
      const result = await axios({
        url: `${apiUrl}${url}`,
        ...request,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const rtkApiQuery = {
  get: (request) => {
    return axiosBaseQuery(apiGateWay('GET', request));
  },
  post: (request) => {
    return axiosBaseQuery(apiGateWay('POST', request));
  },
  put: (request) => {
    return axiosBaseQuery(apiGateWay('PUT', request));
  },
  patch: (request) => {
    return axiosBaseQuery(apiGateWay('PATCH', request));
  },
  delete: (request) => {
    return axiosBaseQuery(apiGateWay('DELETE', request));
  },

  multipartMethods: (request) => {
    return axiosBaseQuery(apiGateWay('FORMDATA', request));
  },
};
export const localStore = {
  set: (key, val) => {
    return localStorage.setItem(key, JSON.stringify(val));
  },
  remove: (key) => {
    return localStorage.removeItem(key);
  },
  removeKeys: (keys) => {
    return keys && keys.forEach((key) => localStorage.removeItem(key));
  },
  get: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  clear: () => localStorage.clear(),
};

export const filterObjectHasValue = (obj) => {
  return Object.keys(obj)
    .filter((item) => obj[item] !== undefined)
    .reduce((newObject, key) => {
      newObject[key] = obj[key];
      return newObject;
    }, {});
};

export const removeKeyInObject = (object, key, subKey) => {
  key && delete object[key];
  subKey && delete object[subKey];
  return object;
};

export const getItemsNotExistingList = (list, element) => {
  return filter(list, (item) => !item.includes(element));
};

export const getValuesNotExisting = (list, element) => {
  const getData = [];
  return includes(list, element)
    ? getData.concat(getItemsNotExistingList(list, element))
    : getData.concat(list, element);
};

export const sliceItemFromList = (list, element) => {
  return filter(list, (item) => item !== element);
};

export const sliceItemsExistingFromList = (list, arr) => {
  return filter(list, (item) => !arr.includes(item));
};

export const getValueOnChecked = (list, element) => {
  const getData = [];
  return includes(list, element)
    ? getData.concat(sliceItemFromList(list, element))
    : getData.concat(list, element);
};

export const setMessageResourceDynamic = (messageResource) => {
  return (key) => {
    return !isEmpty(messageResource)
      ? !isEmpty(get(messageResource, key))
        ? get(messageResource, key)
        : 'wrong key translation'
      : '';
  };
};

export const setMessageByKey = (entity, key) => {
  const messageResource = localStore.get(entity);
  return !isEmpty(messageResource)
    ? messageResource[key] || i18n.t(`${entity}.${key}`)
    : i18n.t(`${entity}.${key}`);
};

export const messageResourceCompiler = (str = '', vars = {}) => {
  if (isEmpty(vars)) return str;

  let result = str;
  Object.keys(vars).forEach((key) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), vars[key]);
    return result;
  });

  return result;
};

export const setMessageByKeyHasVars = (entity, key, vars) => {
  const messageResource = localStore.get(entity);
  return !isEmpty(messageResource)
    ? messageResourceCompiler(`${messageResource[key]}`, vars)
    : i18n.t(`${entity}.${key}`, vars);
};

export const eventBus = {
  bind(event, callback) {
    document.addEventListener(event, callback);
  },
  unbind(event, callback) {
    document.removeEventListener(event, callback);
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  /**
   * Deprecated
   *  Please use instead of bind
   */
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  /**
   * Deprecated
   *  Please use instead of unbind
   */
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export const checkEmptyStringInArray = (facet) => {
  return facet.length === 1 && isEmpty(facet[0]);
};

export const plusDateInst = (date, addNumber) => {
  return date ? moment(date).add(addNumber, 'days').valueOf() : 0;
};
export const minusDateInst = (date, addNumber) => {
  return date ? moment(date).subtract(addNumber, 'days').valueOf() : 0;
};
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return date ? moment(date).format(format) : '';
};
export const getPriorOfMonth = (date, discrepancy, format = 'YYYY-MM-DD') => {
  return date
    ? moment(date).subtract(discrepancy, 'months').format(format)
    : '';
};
export const lastOfMonth = (val, date = new Date(), format = 'YYYY-MM-DD') => {
  return moment(date).subtract(val, 'months').format(format);
};

export const dateStartOfMonth = (format = 'YYYY-MM-DD') => {
  return moment().startOf('month').format(format);
};

export const dateValueForFilter = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format);
};

export const getPositionStanding = (element) => {
  if (element) {
    const clientRect = element.getBoundingClientRect();
    return window.innerHeight - clientRect.top - 70;
  }

  return window.innerHeight - 70;
};

export const useDebounce = (object, delayTime) => {
  const [state, setState] = useState(object);
  const DEBOUNCE_DURATION = delayTime || 300;

  const debouncing = useCallback(
    debounce((_prop) => {
      setState(_prop);
    }, DEBOUNCE_DURATION),
    [],
  );

  const setDebouncedState = (_val) => {
    debouncing(_val);
  };
  return [state, setDebouncedState];
};

export const useDeepEffect = (fn, deps) => {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isFirstEffect = isFirst.current;
    const isSame = prevDeps.current.every((obj, index) =>
      isEqual(obj, deps[index]),
    );

    isFirst.current = false;
    prevDeps.current = deps;

    if (isFirstEffect || !isSame) {
      return fn();
    }
  }, deps);
};

export const reactDom = (element) => {
  return document.querySelector(element);
};

export const withCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const convertToString = (value) => {
  return value ? value.toString() : '';
};

export const formatFileSize = (size) => {
  const bytes = parseInt(size, 10);
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (Number.isNaN(bytes)) return '';
  if (bytes === 0) return `0.00 MB`;
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`;
};

export const diffCountDay = (date) => {
  return date ? moment(new Date(date)).diff(moment(), 'days') : 0;
};

export const lazyLoadPages = (
  pageImport,
  name = 'default',
  fallback = null,
) => {
  const PageLazyLoad = lazy(async () => {
    const page = await pageImport();
    return { default: page[name] };
  });

  return forwardRef((props, ref) => (
    <Suspense fallback={fallback}>
      <PageLazyLoad {...props} ref={ref} />
    </Suspense>
  ));
};

export const stripHtmlTags = (htmlStr, isRemoveSpecial = false) => {
  // remove html tags and space chars
  let newReturn = htmlStr
    .replace(/<.[^<>]*?>/g, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&rsquo;/gi, "'")
    .replace(/&nbsp;|&#160;/gi, ' ');
  if (isRemoveSpecial) {
    newReturn = newReturn
      // eslint-disable-next-line no-useless-escape
      .replace(/[.,;:!?#$'"_+=\/\-]*/g, '');
  }
  return newReturn;
};

export const parseHtml = (html) => {
  const parser = new DOMParser();

  return parser.parseFromString(`<!doctype html><body>${html}`, 'text/html')
    .body.textContent;
};

export const convertDateByUserTimezone = (date, timezone) => {
  const dataBackupFormat = window.jsMomentDateFormat
    ? `${window.jsMomentDateFormat} HH:mm`
    : 'DD/MM/YYYY HH:mm';
  /*
   * window.moment use from fe-legacy
   * getFormatDateOfCurrentUser use for react dev local
   * */
  return window.moment
    ? window.moment.tz(date, timezone).format(dataBackupFormat)
    : getFormatDateOfCurrentUser(date, window.jsMomentDateFormat);
};

export const utcFormatDateTime = (dateTimeStamp, userDateFormat) => {
  const dataBackupFormat = window.jsMomentDateFormat
    ? `${window.jsMomentDateFormat} HH:mm`
    : 'DD/MM/YYYY HH:mm';
  const currentUserFormatTime = userDateFormat
    ? `${userDateFormat} HH:mm`
    : dataBackupFormat;

  return dateTimeStamp
    ? moment.utc(dateTimeStamp).format(currentUserFormatTime)
    : '';
};

/** Deprecated function */
export const formatDateUtc = (date, format = 'YYYY-MM-DD') =>
  moment(date).utc().format(format);

/** Deprecated function */
export const getFormatDateOfCurrentUser = (date, userDateFormat) => {
  const dataBackupFormat = window.jsMomentDateFormat
    ? `${window.jsMomentDateFormat} HH:mm`
    : 'DD/MM/YYYY hh:mm';
  const currentUserFormatTime = userDateFormat
    ? `${userDateFormat.toUpperCase()} HH:mm`
    : dataBackupFormat;

  return date ? moment(date).format(currentUserFormatTime) : '';
};

const guessSelectedCountry = memoize(
  (inputNumber, onlyCountries, defaultCountry) => {
    const secondBestGuess = find(onlyCountries, { iso2: defaultCountry }) || {};
    if (trim(inputNumber) === '') return secondBestGuess;

    const bestGuess = reduce(
      onlyCountries,
      (selectedCountry, country) => {
        if (startsWith(inputNumber, country.dialCode)) {
          if (country.dialCode.length > selectedCountry.dialCode.length) {
            return country;
          }
          if (
            country.dialCode.length === selectedCountry.dialCode.length &&
            country.priority < selectedCountry.priority
          ) {
            return country;
          }
        }
        return selectedCountry;
      },
      { dialCode: '', priority: 10001 },
      this,
    );

    if (!bestGuess.name) return secondBestGuess;
    return bestGuess;
  },
);

export const getCountryFromPhoneNumber = (number) => {
  const formatNumber = (text, patternArg) => {
    const { disableCountryCode, enableLongNumbers, autoFormat } = {
      disableCountryCode: false,
      enableLongNumbers: true,
      autoFormat: true,
    };

    let pattern;
    if (disableCountryCode && patternArg) {
      pattern = patternArg.split(' ');
      pattern.shift();
      pattern = pattern.join(' ');
    } else {
      pattern = patternArg;
    }

    if (!text || text.length === 0) {
      return disableCountryCode ? '' : '+';
    }

    // for all strings with length less than 3, just return it (1, 2 etc.)
    // also return the same text if the selected country has no fixed format
    if ((text && text.length < 2) || !pattern || !autoFormat) {
      return disableCountryCode ? text : `+${text}`;
    }

    const formattedObject = reduce(
      pattern,
      (acc, character) => {
        if (acc.remainingText.length === 0) {
          return acc;
        }

        if (character !== '.') {
          return {
            formattedText: acc.formattedText + character,
            remainingText: acc.remainingText,
          };
        }

        return {
          formattedText: acc.formattedText + head(acc.remainingText),
          remainingText: tail(acc.remainingText),
        };
      },
      {
        formattedText: '',
        remainingText: text.split(''),
      },
    );

    let formattedNumber;
    if (enableLongNumbers) {
      formattedNumber =
        formattedObject.formattedText + formattedObject.remainingText.join('');
    } else {
      formattedNumber = formattedObject.formattedText;
    }

    // Always close brackets
    if (formattedNumber.includes('(') && !formattedNumber.includes(')'))
      formattedNumber += ')';
    return formattedNumber;
  };
  const filteredCountries = [];
  const { onlyCountries, defaultCountry } = {
    onlyCountries: filteredCountries,
    defaultCountry: 'vn',
  };
  const { disableCountryCode } = { disableCountryCode: false };

  let countryGuess;
  let inputNumber = number || '';
  let formattedNumber = number || '';

  // if inputNumber does not start with '+', then use default country's dialing prefix,
  // otherwise use logic for finding country based on country prefix.
  if (!inputNumber.startsWith('+')) {
    countryGuess = find(onlyCountries, { iso2: defaultCountry });
    const dialCode =
      countryGuess &&
      !startsWith(inputNumber.replace(/\D/g, ''), countryGuess.dialCode)
        ? countryGuess.dialCode
        : '';
    formattedNumber = formatNumber(
      (disableCountryCode ? '' : dialCode) + inputNumber.replace(/\D/g, ''),
      countryGuess ? countryGuess.format : undefined,
    );
  } else {
    inputNumber = inputNumber.replace(/\D/g, '');
    countryGuess = guessSelectedCountry(
      inputNumber.substring(0, 6),
      onlyCountries,
      defaultCountry,
    );
    formattedNumber = formatNumber(inputNumber, countryGuess.format);
  }

  return { selectedCountry: countryGuess, formattedNumber };
};

export const filterNotUploadDocType = (documentTypes, filterWebLink) => {
  return documentTypes.filter((item) => {
    if (item.code === null) {
      return true;
    }
    const myText = item.code.toLowerCase();
    const myResult = !(
      SPECIAL_DOCS_TYPE.includes(myText) || myText.includes('formatted_cv')
    );
    if (filterWebLink && myResult) {
      return myText !== DOCUMENT_TYPE_LINK_CODE;
    }
    return myResult;
  });
};

/**
 *  return black or white color by hex
 *
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};
/**
 *  return black or white color by hex
 *
 */
export const getEnhanceColor = (bgColor) => {
  const rgb = hexToRgb(bgColor);
  if (!rgb || rgb.length < 3) {
    return '#000';
  }
  // const c = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  // http://www.w3.org/TR/AERT#color-contrast

  const o = Math.round(
    (parseInt(rgb[0], 10) * 299 +
      parseInt(rgb[1], 10) * 587 +
      parseInt(rgb[2], 10) * 114) /
      1000,
  );
  if (o > 125) {
    return '#000';
  }
  return '#fff';
};

export const getAge = (dateString, today = new Date()) => {
  const birthDate = dateString;
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
export const getViewportSize = () => {
  const win = window;
  const doc = document;
  const docElem = doc.documentElement;
  const body = doc.getElementsByTagName('body')[0];
  const w = win.innerWidth || docElem.clientWidth || body.clientWidth;
  const h = win.innerHeight || docElem.clientHeight || body.clientHeight;
  return {
    w,
    h,
  };
};

export const entityHelper = (() => {
  const doOpenPopupEntity = (entityAction, entityId) => {
    if (entityAction) {
      entityAction.doOpenPopup(entityId, null, false, true);
    }
  };

  return {
    closeReactEntityDialog: (entityType) => {
      window.staffingID.closeReactEntityDialog(entityType);
    },
    switchEntityZIndex: (entityType) => {
      window.staffingID?.switchEntityZIndex(entityType);
    },
    closeAllDialog: (exclude) => {
      return window.staffingID?.closeAllDialog(exclude);
    },
    openDistributionDetail: (contactId, contactName, cbFn) => {
      window.FEATURES_INTEGRATION?.payAndBillIntegration.openDistributionDetail(
        contactId,
        contactName,
        cbFn,
      );
    },
    /**
     * Only support: candidate, contact, company, job
     */
    openFullView: (entityType, entityId) => {
      if (includes(['contact', 'company'], entityType)) {
        window.staffingID.entityPtt.doOpenEntityProfile(
          entityType,
          entityId,
          false,
          undefined,
        );
      } else {
        const myType = entityType.toLowerCase();
        const aliasEntity = window.staffingID.entityPtt[myType];
        if (aliasEntity) {
          aliasEntity.openDialog('fullview', '', entityId);
        }
      }
    },
    openQuickView: (entityType, entityId) => {
      const type = entityType.toLowerCase();
      switch (type) {
        case 'candidate':
          doOpenPopupEntity(window.vcQCCandidate, entityId);
          break;
        case 'contact':
          doOpenPopupEntity(window.vcQCContact, entityId);
          break;
        case 'company':
          window.vcQCCompany && window.vcQCCompany.doOpenPopup(entityId, true);
          break;
        case 'job':
          window.vcQCJob && window.vcQCJob.doOpenPopup(entityId, null, true);
          break;
        case 'position':
          window.vcQCJob && window.vcQCJob.doOpenPopup(entityId, null, true);
          break;
        case 'deal':
          window.dealProfileQuickview &&
            window.dealProfileQuickview.open(entityId, null, true);
          break;
        default:
          break;
      }
    },
    openInvoiceQuickView: (invoiceId, invoiceTypeId) => {
      if (invoiceId && invoiceTypeId) {
        if (typeof window.parent.invoicingDialogInst === 'undefined') {
          const callbackFn = () => {
            window.invoicingDialogInst.setQuickViewDialogIndex(6000);
          };
          window.staffingID.entityPtt.invoicing.lazyOpenInvoiceQuickview(
            invoiceId,
            invoiceTypeId,
            callbackFn,
          );
        } else {
          window.parent.invoicingDialogInst.openInvoiceQuickview(
            {
              invoiceId,
              invoiceTypeId,
              onOpened: () => {
                entityHelper.switchEntityZIndex('invoice');
                const zIndex = parseInt(cssVar('zindex-entity-qv-invoice'), 10);
                window.parent.invoicingDialogInst.setQuickViewDialogIndex(
                  zIndex,
                );
              },
            },
            null,
            false,
          );
        }
      }
    },
    openRateCardDialog: (rateCardId, isViewMode) => {
      if (rateCardId && typeof window.FEATURES_INTEGRATION !== 'undefined') {
        window.FEATURES_INTEGRATION.payAndBillIntegration.openRateCard(
          rateCardId,
          isViewMode,
        );
        entityHelper.switchEntityZIndex('ratecard');
      } else {
        // eslint-disable-next-line no-alert
        // window?.alert('Please contact to administration');
      }
    },
    getQVTableHeight: (ref) => {
      const clientRect =
        !isEmpty(ref.current) && ref.current.getBoundingClientRect();
      return window.innerHeight - clientRect.top - 120; // 120 is height of header & footer
    },
    getQVIframeHeight: (ref) => {
      const pad = 20;
      const clientRect =
        !isEmpty(ref.current) && ref.current.getBoundingClientRect();
      return getViewportSize().h - clientRect.top - pad; // 120 is height of header & footer
    },
    getAvatarHref: (entityType, fileName) => {
      const type = entityType.toLowerCase();
      let pUrl = '';
      switch (type) {
        case 'candidate':
          pUrl = `${apiUrl}/ws/download/candidate_photo/${fileName}`;
          break;
        case 'contact':
          pUrl = `${apiUrl}/ws/download/contact_photo/${fileName}`;
          break;
        case 'company':
          pUrl = `${apiUrl}/ws/download/company_photo/${fileName}`;
          break;
        default:
          break;
      }
      return pUrl;
    },
    getPhotoHref: (entityType, entityId) => {
      const type = entityType.toLowerCase();
      let pUrl = '';
      switch (type) {
        case 'candidate':
          pUrl = `/ws/download/candidate_photo/${entityId}`;
          break;
        case 'contact':
          pUrl = `/ws/download/contact_photo/${entityId}`;
          break;
        case 'company':
          pUrl = `/ws/download/company_photo/${entityId}`;
          break;
        default:
          break;
      }
      return pUrl;
    },
    getProfileHref: (entityType, entityId) => {
      const type = entityType.toLowerCase();
      let pUrl = '';
      switch (type) {
        case 'candidate':
          pUrl = `/candidateProfile.do?id=${entityId}`;
          break;
        case 'contact':
          pUrl = `/contactDetails.do?id=${entityId}`;
          break;
        case 'company':
          pUrl = `/companyDetails.do?board=0&id=${entityId}`;
          break;
        case 'job':
          pUrl = `/jobDetail/loadJobDetail.do?id=${entityId}`;
          break;
        case 'position':
          pUrl = `/jobDetail/loadJobDetail.do?id=${entityId}`;
          break;
        case 'deal':
          pUrl = `/deal/profile.do?id=${entityId}`;
          break;
        default:
          break;
      }
      return pUrl;
    },
    getDashboadHref: (entityType, entityId) => {
      const type = entityType.toLowerCase();
      let dbUrl = '';
      switch (type) {
        case 'candidate':
          dbUrl = `/candidateDashboard.do?tabId=1&id=${entityId}`;
          break;
        case 'contact':
          dbUrl = `/contact.do?contactId=${entityId}`;
          break;
        case 'company':
          dbUrl = `/company.do?companyId=${entityId}`;
          break;
        case 'job':
          dbUrl = `/candidateDashboard.do?tabId=0&id=${entityId}`;
          break;
        case 'position':
          dbUrl = `/candidateDashboard.do?tabId=0&id=${entityId}`;
          break;
        case 'deal':
          dbUrl = `/deal/loadChevron.do?board=6&id=${entityId}`;
          break;
        default:
          break;
      }
      return dbUrl;
    },
    openPlacement: ({ entityId, entityName, positionCandidateId, zIndex }) => {
      const aliasEntity = window.parent.staffingID.entityPtt.placement;
      if (aliasEntity) {
        aliasEntity.openDialog(
          positionCandidateId,
          entityId,
          '',
          entityName,
          '',
          null,
          undefined,
          undefined,
          null,
          zIndex,
        );
      }
    },
  };
})();

export const advancedSearchHelper = (() => {
  return (
    window.advancedSearchHelper || {
      isAdvancedSearchPage: () => false,
    }
  );
})();

export const reConfigStringToLink = (str) => {
  if ((str && str.startsWith('http://')) || str.startsWith('https://')) {
    return str;
  }

  return `http://${str}`;
};

export const msgPrefix = (key, prefix, ms) => {
  return isEmpty(key) ? ms(`${prefix}`) : ms(`${prefix}.${key}`);
};

export const plainTextHelper = (text) => {
  return text.toLowerCase().trim();
};

export const adjustHeightFollowMenuSidebar = (height) => {
  const sidebarHeight = document.querySelector(
    '.page-sidebar-wrapper',
  )?.clientHeight;

  if (sidebarHeight > window.innerHeight) {
    return `${
      window.innerHeight + (sidebarHeight - window.innerHeight - height)
    }px`;
  }

  return `${window.innerHeight - height}px`; // calc(100vh - height)
};

export const decodeEntity = (inputStr) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = inputStr;
  return textarea.value;
};

export const REGX_LINK =
  '[a-zA-Z0-9]+://([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?';

export const checkIsURL = (url) => {
  return new RegExp(REGX_LINK).test(url);
};

export const convert2MB = (fromVal, fixedVal) => {
  const oneMB = 1024;
  if (fromVal < oneMB) {
    return `${fromVal}bytes`;
  }
  if (fromVal > oneMB && fromVal < oneMB * oneMB) {
    return `${(fromVal / oneMB).toFixed(fixedVal)}KB`;
  }
  if (fromVal > Math.pow(oneMB, 2) && fromVal < Math.pow(oneMB, 3)) {
    return `${(fromVal / Math.pow(oneMB, 2)).toFixed(fixedVal)}MB`;
  }
  return `${(fromVal / Math.pow(oneMB, 3)).toFixed(fixedVal)}TB`;
};

export const params = (obj, isEncode = true) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  });
  return Object.keys(obj)
    .map(
      (k) =>
        `${window.encodeURIComponent(k)}=${
          isEncode ? window.encodeURIComponent(obj[k]) : obj[k]
        }`,
    )
    .join('&');
};

export const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

export const doSaveRecentRecord = (historyType, entityType, entityId) => {
  const typeListValue = {
    CANDIDATE: 1,
    COMPANY: 3,
    CONTACT: 2,
    JOB: 4,
    TASK: 5,
    ADVANCE_SEARCH: 6,
    QUICK_SEARCH: 7,
  };
  const urlPattern = {
    CANDIDATE: `/candidateDashboard.do?tabId=1&id=${entityId}`,
    COMPANY: `/company.do?companyId=${entityId}`,
    CONTACT: `/contact.do?contactId=${entityId}`,
    JOB: `/jobDetail/loadJobDetail.do?id=${entityId}`,
  };
  const payload = {
    historyType: Math.max(historyType, 0) || 0,
    referenceParam: entityId,
    type: typeListValue[entityType],
    url: urlPattern[entityType],
  };
  api.post({ url: '/recentRecord/saveRecentRecord.do', data: payload });
};

export const isEmptyValue = (value) => {
  if (isNumber(value)) {
    return false;
  }
  return isEmpty(value);
};

export const openNewTab = (href) => {
  window.open(href, '_blank', 'noopener noreferrer');
};

export const rtkAsyncBuilder = (extraReducersBuilder, requestAsyncThunk) => {
  return (onFulfilled, onPending, onRejected) => {
    extraReducersBuilder
      .addCase(requestAsyncThunk.pending, (state, action) => {
        state.currentRequestId = action.meta.requestId;
        onPending(state);
      })
      .addCase(requestAsyncThunk.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.currentRequestId === requestId) {
          state.currentRequestId = undefined;
          onFulfilled(state);
        }
      })
      .addCase(requestAsyncThunk.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.currentRequestId === requestId) {
          state.error = action.error;
          state.currentRequestId = undefined;
          onRejected(state);
        }
      });
  };
};

export const handleRtkAsyncRequest = (
  builder,
  requestAsyncThunk,
  loaderPropName,
) => {
  return rtkAsyncBuilder(builder, requestAsyncThunk)(
    (state) => {
      // onFulfilled | response received
      state[loaderPropName] = false;
    },
    (state) => {
      // onPending | request is sending
      state[loaderPropName] = true;
    },
    (state) => {
      // onRejected | request is rejected
      state[loaderPropName] = false;
    },
  );
};

export const handleAsyncThunkLoader = (callBackProps, loaderSelector) => {
  const { getState, loaderPropName } = callBackProps;
  const loaderState = loaderSelector(getState());
  return loaderState[loaderPropName];
};

export const cssVar = (name, value) => {
  if (name[0] !== '-') name = `--${name}`; // allow passing with or without --
  if (value) document.documentElement.style.setProperty(name, value);
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};

export const parsePhoneNumberIntl = (value) => {
  const phoneNumber = value ? parsePhoneNumber(value) : null;
  if (!phoneNumber?.country && australiaRegexPhone.test(phoneNumber?.number)) {
    return { ...phoneNumber, country: 'AU' };
  }
  return phoneNumber;
};

export const formatPhoneNumberObject = (
  phoneNumber,
  ignoreCountryCode = false,
) => {
  let formatNumber = formatPhoneNumberIntl(phoneNumber?.number);
  if (formatNumber && ignoreCountryCode) {
    formatNumber = formatNumber.replace(
      `+${phoneNumber.countryCallingCode} `,
      '',
    );
  }

  return phoneNumber?.ext
    ? `${formatNumber} ext. ${phoneNumber.ext}`
    : formatNumber;
};

export const openDialogContactBulkEmail = (contactId) => {
  if (typeof window.emailPopup === 'undefined') {
    window.head.load(
      [`${window.CDN_FE_URL}js/parent/app/email/emailPopup.js`],
      () => {
        window.emailPopup.openDialogContactBulkEmail([contactId], 1, false);
      },
    );
  } else {
    window.emailPopup.openDialogContactBulkEmail([contactId], 1, false);
  }
};

export const userDateFormatMoment = window.jsMomentDateFormat
  ? window.jsMomentDateFormat
  : 'MM/DD/YYYY';

export const yupTransformDateFormat = (castValue, originalValue, pattern) => {
  if (Number.isNaN(castValue)) {
    return castValue;
  }
  return pattern ? formatDate(originalValue, pattern) : new Date(originalValue);
};

export const wait = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const checkValidTimestampString = (timestamp) =>
  typeof timestamp === 'string' &&
  timestamp !== '' &&
  !Number.isNaN(Number(timestamp));

export const getDateTimestamp = (dateString) => {
  const date = checkValidTimestampString(dateString)
    ? Number(dateString)
    : dateString;
  return moment(date).utc().valueOf();
};

export const sprintf = (...a) => {
  // http://kevin.vanzonneveld.net
  const regex =
    // eslint-disable-next-line no-useless-escape
    /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
  // const a = [...arguments];
  let i = 0;
  const format = a[i++];

  // pad()
  const pad = function (str, len, chr, leftJustify) {
    if (!chr) {
      chr = ' ';
    }
    const padding =
      // eslint-disable-next-line no-bitwise
      str.length >= len ? '' : Array((1 + len - str.length) >>> 0).join(chr);
    return leftJustify ? str + padding : padding + str;
  };

  // justify()
  const justify = function (
    value,
    prefix,
    leftJustify,
    minWidth,
    zeroPad,
    customPadChar,
  ) {
    const diff = minWidth - value.length;
    if (diff > 0) {
      if (leftJustify || !zeroPad) {
        value = pad(value, minWidth, customPadChar, leftJustify);
      } else {
        value =
          value.slice(0, prefix.length) +
          pad('', diff, '0', true) +
          value.slice(prefix.length);
      }
    }
    return value;
  };

  // formatBaseX()
  const formatBaseX = function (
    value,
    base,
    prefix,
    leftJustify,
    minWidth,
    precision,
    zeroPad,
  ) {
    // Note: casts negative numbers to positive ones
    // eslint-disable-next-line no-bitwise
    const number = value >>> 0;
    prefix =
      (prefix &&
        number &&
        {
          2: '0b',
          8: '0',
          16: '0x',
        }[base]) ||
      '';
    value = prefix + pad(number.toString(base), precision || 0, '0', false);
    return justify(value, prefix, leftJustify, minWidth, zeroPad);
  };

  // formatString()
  const formatString = function (
    value,
    leftJustify,
    minWidth,
    precision,
    zeroPad,
    customPadChar,
  ) {
    if (precision != null) {
      value = value.slice(0, precision);
    }
    return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
  };

  // doFormat()
  const doFormat = function (
    substring,
    valueIndex,
    flags,
    minWidth,
    _,
    precision,
    type,
  ) {
    let number;
    let prefix;
    let method;
    let textTransform;
    let value;

    if (substring === '%%') {
      return '%';
    }

    // parse flags
    let leftJustify = false;
    let positivePrefix = '';
    let zeroPad = false;
    let prefixBaseX = false;
    let customPadChar = ' ';
    const flagsl = flags.length;
    if (flags) {
      for (let j = 0; j < flagsl; j++) {
        // eslint-disable-next-line default-case
        switch (flags.charAt(j)) {
          case ' ':
            positivePrefix = ' ';
            break;
          case '+':
            positivePrefix = '+';
            break;
          case '-':
            leftJustify = true;
            break;
          case "'":
            customPadChar = flags.charAt(j + 1);
            break;
          case '0':
            zeroPad = true;
            break;
          case '#':
            prefixBaseX = true;
            break;
        }
      }
    }
    // parameters may be null, undefined, empty-string or real valued
    // we want to ignore null, undefined and empty-string values
    if (!minWidth) {
      minWidth = 0;
    } else if (minWidth === '*') {
      minWidth = +a[i++];
    } else if (minWidth.charAt(0) === '*') {
      minWidth = +a[minWidth.slice(1, -1)];
    } else {
      minWidth = +minWidth;
    }

    // Note: undocumented perl feature:
    if (minWidth < 0) {
      minWidth = -minWidth;
      leftJustify = true;
    }

    // eslint-disable-next-line no-restricted-globals
    if (!isFinite(minWidth)) {
      throw new Error('sprintf: (minimum-)width must be finite');
    }

    if (!precision) {
      precision = 'fFeE'.indexOf(type) > -1 ? 6 : type === 'd' ? 0 : undefined;
    } else if (precision === '*') {
      precision = +a[i++];
    } else if (precision.charAt(0) === '*') {
      precision = +a[precision.slice(1, -1)];
    } else {
      precision = +precision;
    }

    // grab value using valueIndex if required?
    value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

    switch (type) {
      case 's':
        return formatString(
          String(value),
          leftJustify,
          minWidth,
          precision,
          zeroPad,
          customPadChar,
        );
      case 'c':
        return formatString(
          String.fromCharCode(+value),
          leftJustify,
          minWidth,
          precision,
          zeroPad,
        );
      case 'b':
        return formatBaseX(
          value,
          2,
          prefixBaseX,
          leftJustify,
          minWidth,
          precision,
          zeroPad,
        );
      case 'o':
        return formatBaseX(
          value,
          8,
          prefixBaseX,
          leftJustify,
          minWidth,
          precision,
          zeroPad,
        );
      case 'x':
        return formatBaseX(
          value,
          16,
          prefixBaseX,
          leftJustify,
          minWidth,
          precision,
          zeroPad,
        );
      case 'X':
        return formatBaseX(
          value,
          16,
          prefixBaseX,
          leftJustify,
          minWidth,
          precision,
          zeroPad,
        ).toUpperCase();
      case 'u':
        return formatBaseX(
          value,
          10,
          prefixBaseX,
          leftJustify,
          minWidth,
          precision,
          zeroPad,
        );
      case 'i':
      case 'd':
        number = +value || 0;
        number = Math.round(number - (number % 1)); // Plain Math.round doesn't just truncate
        prefix = number < 0 ? '-' : positivePrefix;
        value = prefix + pad(String(Math.abs(number)), precision, '0', false);
        return justify(value, prefix, leftJustify, minWidth, zeroPad);
      case 'e':
      case 'E':
      case 'f': // Should handle locales (as per setlocale)
      case 'F':
      case 'g':
      case 'G':
        number = +value;
        prefix = number < 0 ? '-' : positivePrefix;
        method = ['toExponential', 'toFixed', 'toPrecision'][
          'efg'.indexOf(type.toLowerCase())
        ];
        textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
        value = prefix + Math.abs(number)[method](precision);
        return justify(value, prefix, leftJustify, minWidth, zeroPad)[
          textTransform
        ]();
      default:
        return substring;
    }
  };
  return format.replace(regex, doFormat);
};

export const objectSelectionConverted = (array, key) =>
  array
    ? array.map((item) => {
        return { [key]: item };
      })
    : [];

export const getValuesOfSpecificKey = (array, key) =>
  array.map((item) => item[key]);

export const postMessageToIframe = (iframe, message) => {
  const targetWindow = document.getElementById(iframe);
  if (targetWindow) {
    targetWindow.contentWindow.postMessage(message, window.location.origin);
  }
};

export const isNullOrZero = (value) => {
  return isNil(value) || value === 0;
};
// performance way.
export const uniqueArrayObject = (arr) =>
  Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
