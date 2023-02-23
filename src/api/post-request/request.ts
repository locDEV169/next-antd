import { notification } from 'antd';
import { authRequest } from 'api/axios';

export const postRequest = async (url: string, params: any): Promise<any> => {
  const domain = 'http://localhost:5000';

  try {
    const response = await fetch(`${domain}/${url}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
      handleError(response.status);
    }

    return response.json();
  } catch (error: any) {
    console.log(error);
  }
  // const { data } = await authRequest.post(`${domain}/${url}`, params);

  // console.log('postRequest', data);

  // return data;
};

//handle error for post request
const handleError = (status: number) => {
  const data: number = status;

  if (data === 401) {
    const message = 'Notification error 401';
    const description =
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.';
    openNotificationWarning(message, description);
  }
  if (data === 404) {
    const message = 'Notification error 404';
    const description =
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.';
    openNotificationWarning(message, description);
  }

  if (data === 500) {
    const message = 'Notification error 500';
    const description =
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.';
    openNotificationWarning(message, description);
  }

  return Promise.reject(data);
};

const openNotificationWarning = (message: string, description: string) => {
  return notification.warning({
    message: message,
    description: description,
    placement: 'bottomRight',
  });
};
