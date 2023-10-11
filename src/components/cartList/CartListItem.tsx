'use client';

import Image from 'next/image';
import React from 'react';
import Button from '../ui/Button';
import { CartProductType } from '@/models/Cart';
import { Trash } from 'lucide-react';
import { useDeleteCartProductMutation } from '@/api/cartApi/hooks/useDeleteCartProductMutation';

type CartListItemProps = {
  cartProduct: CartProductType;
};

const CartListItem: React.FC<CartListItemProps> = ({ cartProduct }) => {
  const image = require(`@/api/static/productsImages/${cartProduct.product.id}.png`);

  const { mutate: deleteCartProduct } = useDeleteCartProductMutation();

  const handleDelete = () => {
    deleteCartProduct(cartProduct.id);
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      <Image className="max-w-[150px]" src={image} alt="" priority />
      <div className="max-w-[480px]">
        <h1 className="text-[30px] font-bold mb-3">
          {cartProduct.product.name}
        </h1>
        <p className="text-[16px]">{cartProduct.product.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="contained" className="w-[30px] h-[30px] py-0 px-0">
          -
        </Button>
        <p className="font-bold">{cartProduct.quantity}</p>
        <Button variant="contained" className="w-[30px] h-[30px] py-0 px-0">
          +
        </Button>
      </div>
      <p className="text-[30px] font-bold whitespace-nowrap">
        {cartProduct.product.price * cartProduct.quantity} ₽
      </p>
      <Button
        variant="contained"
        className="bg-red border-red py-0 px-0 rounded-full"
        onClick={() => handleDelete()}
      >
        <Trash color="#fff" size={40} className="hover:stroke-red py-2 px-2" />
      </Button>
    </div>
  );
};

export default CartListItem;
