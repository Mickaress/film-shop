import { useQuery } from '@tanstack/react-query';
import { getOrderInfo } from '..';
import { OrderInfoType } from '@/models/Order';

export const useGetOrderInfoQuery = (orderId: number) => {
  return useQuery<OrderInfoType>({
    queryKey: ['order', orderId],
    queryFn: () => getOrderInfo(orderId),
  });
};
