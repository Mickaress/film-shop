import axios, { isAxiosError } from 'axios';
import { SignUpType } from '@/utils/zodSchemas';

export const signUp = async (data: SignUpType) => {
  try {
    return await axios.post('api/auth/register', data);
  } catch (error) {
    if (isAxiosError(error)) {
      const err = error;
      throw err.response?.data.error;
    }
    throw 'Непредвиденная ошибка';
  }
};
