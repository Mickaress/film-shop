'use client';

import React, { useState } from 'react';
import ProductListItem from './ProductListItem';
import Pagination from '../Pagination';
import { useGetMovieProductsQuery } from '@/api/moviesApi/hooks/useGetMovieProductsQuery';

type ProductListProps = {
  filmId: number;
};

const ProductList: React.FC<ProductListProps> = ({ filmId }) => {
  const { data: products, isLoading } = useGetMovieProductsQuery(filmId);
  const [page, setPage] = useState(1);

  const pages = products ? Math.ceil(products.length / 3) : 1;
  const pageProducts = products?.slice((page - 1) * 3, (page - 1) * 3 + 3);

  const handlePageChange = (page: number) => {
    if (page !== 0 && page <= pages) {
      setPage(page);
    }
  };

  // TODO: добавить компонент загрузки
  if (isLoading) {
    return <>Загрузка</>;
  }

  if (products && products.length < 1) {
    return <>Нет товаров</>;
  }

  return (
    <div className="flex flex-col gap-2">
      {pageProducts?.map((product) => (
        <ProductListItem key={product.id} product={product} movieId={filmId} />
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
