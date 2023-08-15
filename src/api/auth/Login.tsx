import axios from 'axios';
import { getToken } from './Token';
// const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const url = '/proxy';

export const config = {
  baseURL: url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
export const api = axios.create(config);
api.interceptors.request.use((config) => {
  const accessToken = getToken();

  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    console.log('실패ss');
  }
  console.log(config);

  return config;
});
export const sendData = async (
  endpoint: string,
  method: string = 'post',
  data: object = {},
  params: object = {},
  sendToken: boolean = false
) => {
  try {
    const res = await api({
      url: `/${endpoint}`,
      method,
      data: JSON.stringify(data),
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
