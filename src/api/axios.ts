/* eslint-disable no-restricted-syntax */
import { notification } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const authRequest = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

const openNotificationWarning = (message: string, description: string) => {
  return notification.warning({
    message: message,
    description: description,
    placement: 'bottomRight',
  });
};

const handleSuccess = (res: AxiosResponse) => {
  // if (res.request) return res.data;
  if (res.request) return res;
};

const handleError = (err: AxiosError) => {
  // const data = err?.response?.data;
  const data = err?.response;

  if (data?.status === 401 || data?.data.statusCode === 401) {
    //message.warning('Please login again!');
    // store.dispatch(actionDisconnectWallet());
    const message = 'Notification error 401';
    const description =
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.';
    openNotificationWarning(message, description);
  }
  if (data?.status === 404 || data?.data.statusCode === 404) {
    const message = 'Notification error 404';
    const description =
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.';
    openNotificationWarning(message, description);
  }

  if (data?.status === 500 || data?.data.statusCode === 500) {
    const message = 'Notification error 500';
    const description =
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.';
    openNotificationWarning(message, description);
  }

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
