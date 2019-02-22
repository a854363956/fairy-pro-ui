/* eslint-disable */
import request from '@/utils/request';
import requestApi from '../../services/requestApi';

export async function apiUserLogin({ loginName, password }) {
  return requestApi('/api/user/login', {
    loginName,
    password,
    equipment: 0,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/user-login/captcha?mobile=${mobile}`);
}
