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
// 修改某一个用户信息
export function updateUser(data) {
  return request({
    url: `${api}/users/update_user`,
    method: 'POST',
    data
  });
}
// 获取某一个用户信息
export function getOneUserInfo(data) {
  return request({
    url: `${api}/users/load_one_user`,
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
// 获取所有项目列表
export function projectListAll(data) {
  return request({
    url: `${api}/users/load_project_all`,
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
// 删除某一个项目
export function deleteOneProject(data) {
  return request({
    url: `${api}/users/delete_one_project`,
    method: 'POST',
    data
  });
}

// 新建工作
export function addWork(data) {
  return request({
    url: `${api}/users/add_work`,
    method: 'POST',
    data
  });
}
// 获取工作列表
export function workList(data) {
  return request({
    url: `${api}/users/load_work`,
    method: 'POST',
    data
  });
}
// 获取所有工作列表
export function workListAll(data) {
  return request({
    url: `${api}/users/load_work_all`,
    method: 'POST',
    data
  });
}
// 获取某一个工作
export function getOneWork(data) {
  return request({
    url: `${api}/users/get_one_work`,
    method: 'POST',
    data
  });
}
// 修改某一个项目
export function updateOneWork(data) {
  return request({
    url: `${api}/users/update_one_work`,
    method: 'POST',
    data
  });
}
// 删除某一个项目
export function deleteOneWork(data) {
  return request({
    url: `${api}/users/delete_one_work`,
    method: 'POST',
    data
  });
}

// 新建菜单权限
export function addNewAuth(data) {
  return request({
    url: `${api}/users/add_new_auth`,
    method: 'POST',
    data
  });
}

// 分页加载菜单列表

export function authList(data) {
  return request({
    url: `${api}/users/auth_list`,
    method: 'POST',
    data
  });
}

// 查找所有的父集菜单
export function getFaMenu(data) {
  return request({
    url: `${api}/users/get_fa_menu`,
    method: 'POST',
    data
  });
}
// 修改菜单
export function updateOneAuth(data) {
  return request({
    url: `${api}/users/update_one_auth`,
    method: 'POST',
    data
  });
}

// 删除菜单
export function deleteOneAuth(data) {
  return request({
    url: `${api}/users/delete_one_auth`,
    method: 'POST',
    data
  });
}

// 查询菜单树 列表
export function getMenuTreeList(data) {
  return request({
    url: `${api}/users/get_menu_tree_list`,
    method: 'POST',
    data
  });
}
// 新建角色
export function addNewRole(data) {
  return request({
    url: `${api}/users/add_role`,
    method: 'POST',
    data
  });
}

// 查询 角色 列表
export function roleList(data) {
  return request({
    url: `${api}/users/load_role`,
    method: 'POST',
    data
  });
}
// 查询 角色 所有 
export function roleListAll(data) {
  return request({
    url: `${api}/users/load_role_all`,
    method: 'POST',
    data
  });
}
// 修改 某一个 角色 信息
export function updateOneRole(data) {
  return request({
    url: `${api}/users/update_role`,
    method: 'POST',
    data
  });
}

// 删除 某一个 角色
export function deleteOneRole(data) {
  return request({
    url: `${api}/users/delete_role`,
    method: 'POST',
    data
  });
}

// 新建 用户
export function addNewUser(data) {
  return request({
    url: `${api}/users/add_user`,
    method: 'POST',
    data
  });
}

// 用户列表
export function userList(data) {
  return request({
    url: `${api}/users/load_user`,
    method: 'POST',
    data
  });
}
// 修改某一个用户
export function updateOneUser(data) {
  return request({
    url: `${api}/users/update_user`,
    method: 'POST',
    data
  });
}
// 删除某一个用户
export function deleteOneUser(data) {
  return request({
    url: `${api}/users/delete_user`,
    method: 'POST',
    data
  });
}