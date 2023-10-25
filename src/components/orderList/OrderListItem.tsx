'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';
import OrderInfo from './OrderInfo';
import { OrderType } from '@/models/Order';
import { useSession } from 'next-auth/react';
import Input from '../ui/Input';
import { useAddShippingCodeMutation } from '@/api/orderApi/hooks/useAddShippingCodeMutation';

type OrderListItemProps = {
  order: OrderType;
};

const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  const { data: session } = useSession();
  const [shippingCode, setShippingCode] = useState('');
  const isAdmin = session?.user.role === 'admin';
  const { mutate } = useAddShippingCodeMutation();

  const addShippingCode = () => {
    mutate({ orderId: order.id, shippingCode: shippingCode });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[40px]">Заказ №{order.id}</h1>
        <p className="text-[24px]">Сумма: {order.amount} ₽</p>
        <OrderInfo id={order.id} />
        {isAdmin ? (
          <>
            <Input
              variant="text"
              placeholder="Введите код"
              onChange={(event) => setShippingCode(event.target.value)}
            />
            <Button variant="button" onClick={() => addShippingCode()}>
              Отправить
            </Button>
          </>
        ) : (
          <div
            className={`bg ${
              order.shippingCode ? 'bg-blue' : 'bg-orange'
            } py-2 px-5 rounded-lg text-white`}
          >
            {order.shippingCode ? `Код: ${order.shippingCode}` : 'В обработке'}
          </div>
        )}
      </div>
      <div className="w-full h-[1px] bg-darkgray my-5"></div>
    </>
  );
};

export default OrderListItem;
