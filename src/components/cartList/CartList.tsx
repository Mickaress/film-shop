'use client';

import React, { useState } from 'react';
import Pagination from '../Pagination';
import { useGetCartProductsQuery } from '@/api/cartApi/hooks/useGetCartProductsQuery';
import CartListItem from './CartListItem';

const CartList = () => {
  const { data: cartList, isLoading } = useGetCartProductsQuery();
  const [page, setPage] = useState(1);

  const pages = cartList ? Math.ceil(cartList.length / 3) : 1;
  const pageCartList = cartList?.slice((page - 1) * 3, (page - 1) * 3 + 3);

  const handlePageChange = (page: number) => {
    if (page !== 0 && page <= pages) {
      setPage(page);
    }
  };

  // TODO: добавить компонент загрузки
  if (isLoading) {
    return <>Загрузка</>;
  }

  if (cartList && cartList.length < 1) {
    return <>Корзина пуста</>;
  }

  return (
    <div className="flex flex-col gap-2">
      {pageCartList?.map((cartProduct) => (
        <CartListItem cartProduct={cartProduct} key={cartProduct.id} />
      ))}
      <Pagination
        currentPage={page}
        pages={pages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default CartList;
