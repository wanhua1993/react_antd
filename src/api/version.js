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
