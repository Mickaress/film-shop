import ProductList from '@/components/productList/ProductList';
import React from 'react';
import { FC } from 'react';

type Props = {
  params: {
    id: string;
  };
};

const page: FC<Props> = ({ params: { id } }) => {
  const filmId = parseInt(id);

  return <ProductList filmId={filmId} />;
};

export default page;
