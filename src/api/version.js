import request from '@/utils/request';
import url from '@/config/basicApi';
const api = url.api;
// 发布版本 
export function uploadVersion(data) {
  return request({
    url: `${api}/version/upload`,
    method: 'POST',
    data
  })
}
// 加载接口列表
export function apiList(data) {
  return request({
    url: `${api}/version/loadApi`,
    method: 'POST',
    data
  });
}
// 删除某一个接口
export function deleteOneApi(data) {
  return request({
    url: `${api}/version/delete_one_api`,
    method: 'POST',
    data
  });
}

// 新增一个接口
export function addApi(data) {
  return request({
    url: `${api}/version/addApi`,
    method: 'POST',
    data
  });
}

// 修改一个接口
export function updateOneApi(data) {
  return request({
    url: `${api}/version/updateOneApi`,
    method: 'POST',
    data
  });
}
// 获取某一个接口
export function getOneApi(data) {
  return request({
    url: `${api}/version/getOneApi`,
    method: 'POST',
    data
  });
}
// 新建 一个标签
export function addLabel(data) {
  return request({
    url: `${api}/version/addLabel`,
    method: 'POST',
    data
  });
}
// 修改 一个标签
export function updateOneLabel(data) {
  return request({
    url: `${api}/version/updateOneLabel`,
    method: 'POST',
    data
  });
}
// 标签列表
export function labelList(data) {
  return request({
    url: `${api}/version/loadLabel`,
    method: 'POST',
    data
  });
}
// 删除一个标签
export function deleteOneLabel(data) {
  return request({
    url: `${api}/version/deleteOneLabel`,
    method: 'POST',
    data
  });
}
// 获取所有的父级标签
export function fa_list_label(data) {
  return request({
    url: `${api}/version/fa_list_label`,
    method: 'POST',
    data
  });
}