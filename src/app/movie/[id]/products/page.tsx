import MovieInfo from '@/components/MovieInfo';
import ProductList from '@/components/ProductList';
import React from 'react';
import { FC } from 'react';

interface Props {
  params: {
    id: string;
  };
}

const page: FC<Props> = ({ params: { id } }) => {
  const filmId = parseInt(id);

  return <ProductList filmId={filmId} />;
};

export default page;
