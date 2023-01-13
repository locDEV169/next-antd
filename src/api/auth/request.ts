import { authRequest } from 'api/axios';
import { ILoginParams } from './types';

export const loginRequest = async (params: ILoginParams): Promise<any> => {
  const { data } = await authRequest.post('/auth/login', params);
  return data;
};
