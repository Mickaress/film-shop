'use client';

import React from 'react';
import Button from './ui/Button';
import { useCreateOrderMutation } from '@/api/orderApi/hooks/useCreateOrderMutation';
import { useGetCartProductsQuery } from '@/api/cartApi/hooks/useGetCartProductsQuery';

const OrderButton = () => {
  const { mutate: createOrder } = useCreateOrderMutation();
  const { data, isFetching } = useGetCartProductsQuery();
  return (
    <div className="text-center">
      <Button
        variant="button"
        onClick={() => createOrder()}
        disabled={isFetching || data?.length === 0}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export default OrderButton;
