import React from 'react';
import Button from '../ui/Button';
import OrderInfo from './OrderInfo';
import { OrderType } from '@/models/Order';

type OrderListItemProps = {
  order: OrderType;
};

const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[40px]">Заказ №{order.id}</h1>
        <p className="text-[24px]">Сумма: {order.amount} ₽</p>
        <OrderInfo id={order.id} />
        {order.shippingCode ? (
          <Button variant="button">Отправлен</Button>
        ) : (
          <p className="bg bg-orange py-2 px-5 rounded-lg">В обработке</p>
        )}
      </div>
      <div className="w-full h-[1px] bg-darkgray my-5"></div>
    </>
  );
};

export default OrderListItem;
