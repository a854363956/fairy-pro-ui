import request from '@/utils/request';
import requestApi from './requestApi';

export async function query() {
  return request('/api/users');
}

// 查询当前登入人的资料
export async function queryCurrent() {
  return requestApi('/api/user/getCurrentUser', {});
}
// 获取菜单节点信息
export async function queryAccessibleMenuAll() {
  return requestApi('/api/menu/getAccessibleMenuAll', {});
}
export async function queryNotices() {
  return request('/api/notices');
}
