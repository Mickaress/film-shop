'use client';

import { useGetOrderListQuery } from '@/api/orderApi/hooks/useGetOrderListQuery';
import OrderListItem from './OrderListItem';

const OrderList = () => {
  const { data, isFetching } = useGetOrderListQuery();

  if (isFetching) {
    return <h1 className="text-center text-[60px]">Загрузка</h1>;
  }

  return (
    <div>
      {data && data.length > 0 ? (
        data?.map((order) => <OrderListItem key={order.id} order={order} />)
      ) : (
        <h1 className="text-center text-[60px]">Нет заказов</h1>
      )}
    </div>
  );
};

export default OrderList;
