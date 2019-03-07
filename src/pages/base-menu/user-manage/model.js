/* eslint-disable */
import { message } from 'antd';
import { updateUserInfo, addUser } from './service';

export default {
  namespace: 'baseMenuUserManage',

  state: {
    status: undefined,
  },

  effects: {
    *updateUser({ payload }, { call, put }) {
      const response = yield call(updateUserInfo, payload);
      if (response.status == 200) {
        message.success('修改人员资料成功.');
        return true;
      } else {
        message.error(`修改人员资料失败.[${response.message}]`);
        return false;
      }
    },
    *addUser({ payload }, { call, put }) {
      const response = yield call(addUser, payload);
      if (response.status == 200) {
        message.success('添加人员资料成功.默认密码[123456]');
        return true;
      } else {
        message.error(`添加人员资料失败.[${response.message}]`);
        return false;
      }
    },
  },

  reducers: {},
};
