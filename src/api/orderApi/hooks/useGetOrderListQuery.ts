import { useQuery } from '@tanstack/react-query';
import { getOrderList } from '..';
import { OrderType } from '@/models/Order';

export const useGetOrderListQuery = () => {
  return useQuery<OrderType[]>({
    queryKey: ['orders'],
    queryFn: () => getOrderList(),
  });
};
