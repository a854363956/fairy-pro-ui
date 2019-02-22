import request from '@/utils/request';
import { getAuthority } from '../utils/authority';

export default async function requestApi(url, params) {
  return request(url, {
    method: 'POST',
    data: {
      data: params,
      token: getAuthority(),
    },
  });
}
