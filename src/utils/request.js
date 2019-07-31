import axios from 'axios';
import { getCookie } from './index';
import { message } from 'antd';

const service = axios.create({
  timeout: 3000
});

// 请求拦截
service.interceptors.request.use(
  config => {
    config.headers['token'] = getCookie('token');
    return config
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 登录失效
    if (res.code === 403) {
      message.error(res.msg);
      window.location = '/login';
      return false;
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;