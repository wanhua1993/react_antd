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
// 创建 个人用户
export function newUser(data) {
  return request({
    url: `${api}/users/add_user`,
    method: 'POST',
    data
  });
}
// 新建项目
export function addProject(data) {
  return request({
    url: `${api}/users/add_project`,
    method: 'POST',
    data
  });
}
// 获取项目列表
export function projectList(data) {
  return request({
    url: `${api}/users/load_project`,
    method: 'POST',
    data
  });
}
// 获取某一个项目
export function getOneProject(data) {
  return request({
    url: `${api}/users/get_one_project`,
    method: 'POST',
    data
  });
}
// 修改某一个项目
export function updateOneProject(data) {
  return request({
    url: `${api}/users/update_one_project`,
    method: 'POST',
    data
  });
}