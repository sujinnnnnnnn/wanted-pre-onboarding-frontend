import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from './Token';
// const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const url = 'https://www.pre-onboarding-selection-task.shop';

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
  console.log(accessToken);

  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
  }
  return config;
});

export const sendData = async (
  endpoint: string,
  method: string = 'post',
  data: object = {}
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
