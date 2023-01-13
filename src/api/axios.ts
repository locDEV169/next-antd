/* eslint-disable no-restricted-syntax */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const authRequest = axios.create({
  baseURL: '/some-url',
});

const handleSuccess = (res: AxiosResponse) => {
  if (res.request) return res.data;
};

const handleError = (err: AxiosError) => {
  const data = err?.response?.data;

  return Promise.reject(data);
};

authRequest.interceptors.response.use(handleSuccess, handleError);

authRequest.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config = {
      ...config,
      data: convertToFormData(config.data),
      withCredentials: true,
    };

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

const convertToFormData = (data: { string: string }) => {
  const bodyFormData = new FormData();
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      bodyFormData.append(key, value);
    }
  }
  return bodyFormData;
};
