import isNumber from 'lodash/isNumber';
import axios from 'axios';
import moment from 'moment';
import CryptoJS from 'crypto-js';

export const API_CALL = Symbol('API Call');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function toQueryString(obj) {
  let keys = Object.keys(obj);
  keys.sort();
  const parts = [];
  for (let i in keys) {
    const key = keys[i];
    if (obj.hasOwnProperty(key) && !!obj[key] && !!obj[key].toString().length) {
      parts.push(
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(obj[key]).replace(/%20/g, '+')
      );
    }
  }
  return parts.join('&');
}

function formattedDate() {
  const format = 'YYYYMMDDTHHmmss';
  return (
    moment()
      .utc()
      .format(format) + 'Z'
  );
}
function _sign(value, formattedDate, apiKey) {
  return _hmac(_hmac(formattedDate, apiKey), value);
}
function _hmac(key, value) {
  return CryptoJS.HmacSHA256(
    value.toString(CryptoJS.enc.Utf8),
    key.toString(CryptoJS.enc.Utf8)
  ).toString(CryptoJS.enc.Hex);
}
// Fetches an API response and normalizes the result JSON according to schema.

// This makes every API response have the same shape, regardless of how nested it was.

export const callApi = (
  endpoint,
  method = 'get',
  body = {},
  mobile,
  accessToken = '',
  contentType = 'application/json'
) => {
  let baseUrl = 'https://api-v3.redcarpetup.com';
  const date = formattedDate();
  let valueToHash;
  if (method.toLowerCase() === 'get') {
    const query = toQueryString(body).length ? '?' + toQueryString(body) : '';
    valueToHash = endpoint + query;
  } else if (Object.prototype.toString.call(body) === '[object FormData]') {
    valueToHash = body.get('hash');
    body.delete('hash');
  } else {
    valueToHash = JSON.stringify(body);
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': contentType,
    mobile: mobile,
    'RC-Timestamp': date,
    'RC-HashV2': _sign(valueToHash, date, accessToken)
  };
  if (endpoint === '/app_number' || endpoint === '/app_number_verify') {
    delete headers['RC-HashV2'];
  }
  return axios({
    method: method,
    baseURL: baseUrl,
    url: endpoint,
    data: body,
    params: method.toLowerCase() === 'get' ? body : null,
    paramsSerializer: toQueryString,
    transformRequest: data => {
      /* if form data, send as is */
      if (Object.prototype.toString.call(data) === '[object FormData]') {
        return data;
      }
      /** send array as is */
      if (Object.prototype.toString.call(data) === '[object Array]') {
        return JSON.stringify(data);
      }
      /** cut indexed keys from object */
      const res = {};
      Object.keys(data).forEach(key => {
        if (!isNumber(key)) {
          res[key] = data[key];
        }
      });
      return JSON.stringify(res);
    },
    headers,
  })
    .then(checkStatus)
    .then(response => response.data);
};
