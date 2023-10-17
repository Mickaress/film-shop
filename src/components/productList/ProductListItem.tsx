'use client';

import Image from 'next/image';
import React from 'react';
import Button from '../ui/Button';
import { useAddCartProductMutation } from '@/api/cartApi/hooks/useAddCartProductMutation';
import { useQueryClient } from '@tanstack/react-query';
import { MovieProductType } from '@/models/Movie';

type ProductListItemProps = {
  product: MovieProductType;
  movieId: number;
};

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  movieId,
}) => {
  const { mutate: addCartProduct, isLoading } = useAddCartProductMutation();
  const queryClient = useQueryClient();
  const image = require(`@/api/static/productsImages/${product.id}.png`);

  const handleAddToCart = () => {
    const prevMovieProducts = queryClient.getQueryData<MovieProductType[]>([
      'products',
      movieId,
    ]);
    const newMovieProducts = prevMovieProducts?.map((prevMovieProduct) => {
      if (prevMovieProduct.id === product.id) {
        return { ...prevMovieProduct, isInCart: true };
      }
      return { ...prevMovieProduct };
    });
    console.log(newMovieProducts);
    queryClient.setQueryData(['products', movieId], newMovieProducts);
    addCartProduct(product.id);
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      <Image className="max-w-[150px]" src={image} alt="" priority />
      <div className="max-w-[480px]">
        <h1 className="text-[30px] font-bold mb-3">{product.name}</h1>
        <p className="text-[16px]">{product.description}</p>
      </div>
      <p className="text-[30px] font-bold whitespace-nowrap">
        {product.price} ₽
      </p>
      <Button
        variant="button"
        className="whitespace-nowrap text-[16px]"
        onClick={() => handleAddToCart()}
        disabled={product.isInCart || isLoading}
      >
        {product.isInCart ? 'В корзине' : 'В корзину'}
      </Button>
    </div>
  );
};

export default ProductListItem;
