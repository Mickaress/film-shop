'use client';

import { useGetOrderListQuery } from '@/api/orderApi/hooks/useGetOrderListQuery';
import OrderListItem from './OrderListItem';

const OrderList = () => {
  const { data } = useGetOrderListQuery();
  return (
    <div>
      {data?.map((order) => (
        <OrderListItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
