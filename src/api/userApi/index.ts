import axios, { isAxiosError } from 'axios';
import { ProfileInfoType, SignUpType } from '@/utils/zodSchemas';

export const signUp = async (data: SignUpType) => {
  try {
    return await axios.post('api/auth/register', data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data.error;
    }
    throw 'Непредвиденная ошибка';
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get('api/user');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data.error;
    }
    throw 'Непредвиденная ошибка';
  }
};

export const updateUserInfo = async (data: ProfileInfoType) => {
  try {
    const response = await axios.patch('/api/user', data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data.error;
    }
    throw 'Непредвиденная ошибка';
  }
};
