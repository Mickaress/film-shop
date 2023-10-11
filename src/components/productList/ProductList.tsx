'use client';

import { useGetOnedMovieQuery } from '@/api/moviesApi/hooks/useGetOneFilmQuery';
import React, { useState } from 'react';
import ProductListItem from './ProductListItem';
import Pagination from '../Pagination';

type ProductListProps = {
  filmId: number;
};

const ProductList: React.FC<ProductListProps> = ({ filmId }) => {
  const { data: movie, isLoading } = useGetOnedMovieQuery(filmId);
  const [page, setPage] = useState(1);

  const products = movie?.products;
  const pages = products ? Math.ceil(products.length / 3) : 1;

  const handlePageChange = (page: number) => {
    if (page !== 0 && page <= pages) {
      setPage(page);
    }
  };

  if (isLoading) {
    return <>Загрузка</>;
  }

  if (products && products.length < 1) {
    return <>Нет товаров</>;
  }

  return (
    <div className="flex flex-col gap-2">
      {products?.map((product) => (
        <ProductListItem product={product} key={product.id} />
      ))}
      <Pagination
        currentPage={page}
        pages={pages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
