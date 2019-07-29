import request from '@/utils/request';
import url from '@/config/basicApi';
const api = url.api;
// 登录 
export function loginIn(data) {
  return request({
    url: `${api}/users/login`,
    method: 'POST',
    data
  })
}

// 获取用户列表

export function getUserList() {
  return request({
    url: `${api}/users/load_user`,
    method: 'get'
  });
}