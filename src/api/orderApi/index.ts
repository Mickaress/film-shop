import axios, { isAxiosError } from 'axios';

export const getOrderList = async () => {
  try {
    const response = await axios.get('/api/order');
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};

export const getOrderInfo = async (orderId: number) => {
  try {
    const response = await axios.get(`/api/order/${orderId}`);
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};

export const createOrder = async () => {
  try {
    const response = await axios.post('/api/order');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
    throw 'Непредвиденная ошибка';
  }
};

export const addShippingCode = async (
  orderId: number,
  shippingCode: string,
) => {
  try {
    const response = await axios.patch(`/api/order/${orderId}`, {
      shippingCode: shippingCode,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
    throw 'Непредвиденная ошибка';
  }
};
