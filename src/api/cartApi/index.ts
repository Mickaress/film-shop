import axios, { isAxiosError } from 'axios';

export const getCartProducts = async () => {
  try {
    const response = await axios.get('/api/cart');
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};

export const addCartProduct = async (productId: number) => {
  try {
    const response = await axios.post(`/api/cart/${productId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data.error;
    }
    throw 'Непредвиденная ошибка';
  }
};

export const deleteCartProduct = async (id: number) => {
  try {
    const response = await axios.delete(`/api/cart/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data.error;
    }
    throw 'Непредвиденная ошибка';
  }
};
