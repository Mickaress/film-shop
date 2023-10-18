import { useQuery } from '@tanstack/react-query';
import { getOrderList } from '..';

export const useGetOrderListQuery = () => {
  return useQuery<OrderType[]>({
    queryKey: ['orders'],
    queryFn: () => getOrderList(),
  });
};
