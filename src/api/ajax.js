import axios from 'axios';

export default function ajax(url, data = {}, method = 'get') {
  if(method == 'get') {
    return axios.get(url, {
      params: data
    });
  } else {
    return axios.post(url, data);
  }
}