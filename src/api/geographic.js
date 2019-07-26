import request from '@/utils/request';

export function fetchProvince() {
  return request({
    url: `/api/geographic/province`,
    method: 'GET',
  });
}