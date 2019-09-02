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
