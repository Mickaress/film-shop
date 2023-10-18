'use client';

import React, { useState } from 'react';
import Modal from '../modal/Modal';
import Button from '../ui/Button';
import { useGetOrderInfoQuery } from '@/api/orderApi/hooks/useGetOrderInfoQuery';
import Image from 'next/image';
import OrderProductList from './OrderProductList';

type Props = {
  id: number;
};

const OrderInfo: React.FC<Props> = ({ id }) => {
  const [isShow, setIsShow] = useState(false);
  const { data } = useGetOrderInfoQuery(id);

  return (
    <>
      <Button variant="button" onClick={() => setIsShow(true)}>
        Подробности
      </Button>
      {isShow && (
        <Modal close={() => setIsShow(false)}>
          <div className="flex gap-3">
            <div className="font-bold flex flex-col gap-2">
              <p>ФИО:</p>
              <p>Почта:</p>
              <p>Телефон:</p>
              <p>Адрес:</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>{data?.user.fullName}</p>
              <p>{data?.user.email}</p>
              <p>{data?.user.phone}</p>
              <p>{data?.user.address}</p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-darkgray my-5"></div>
          {data && <OrderProductList products={data?.products} />}
        </Modal>
      )}
    </>
  );
};

export default OrderInfo;
