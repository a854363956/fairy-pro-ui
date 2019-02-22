import { message } from 'antd';
import { formatMessage } from 'umi/locale';
import { routerRedux } from 'dva/router';
import { getPageQuery } from './utils/utils';
import { setAuthority } from './utils/authority';
import { reloadAuthorized } from './utils/Authorized';
import { apiUserLogin, getFakeCaptcha } from './service';

export default {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(apiUserLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.data.status === 'SUCCESS') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.error(formatMessage({ id: `user-login.login.msg.${response.data.status}` }));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data.sessionCode);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
