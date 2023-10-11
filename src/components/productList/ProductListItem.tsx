'use client';

import { MovieProductsType } from '@/models/Movie';
import Image from 'next/image';
import React from 'react';
import Button from '../ui/Button';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

type ProductListItemProps = {
  product: MovieProductsType;
};

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { data: session } = useSession();
  const image = require(`@/api/static/productsImages/${product.id}.png`);

  const handleAddToCart = () => {
    if (!session) {
      toast.error('Вы не авторизованы');
    }
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
        variant="contained"
        className="whitespace-nowrap text-[16px]"
        onClick={() => handleAddToCart()}
      >
        В корзину
      </Button>
    </div>
  );
};

export default ProductListItem;
