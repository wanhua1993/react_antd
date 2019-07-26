import axios from 'axios';

const service = axios.create({
  timeout: 3000
});

// 请求拦截
service.interceptors.request.use(
  config => {
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
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;