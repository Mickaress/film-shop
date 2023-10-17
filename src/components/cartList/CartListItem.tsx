'use client';

import Image from 'next/image';
import React from 'react';
import Button from '../ui/Button';
import { CartProductType } from '@/models/Cart';
import { Trash } from 'lucide-react';
import { useDeleteCartProductMutation } from '@/api/cartApi/hooks/useDeleteCartProductMutation';
import { useUpdateCartProductMutation } from '@/api/cartApi/hooks/useUpdateCartProductMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import useCartFetchingStatus from '@/hooks/useCartFetchingStatus';

type CartListItemProps = {
  cartProduct: CartProductType;
};

const CartListItem: React.FC<CartListItemProps> = ({ cartProduct }) => {
  const image = require(`@/api/static/productsImages/${cartProduct.product.id}.png`);

  const { mutate: deleteCartProduct } = useDeleteCartProductMutation();
  const { mutate: updateCartProduct } = useUpdateCartProductMutation();
  const isLoading = useCartFetchingStatus();

  const queryClient = useQueryClient();

  const serverUpdate = useDebouncedCallback(
    (quantity: number) =>
      updateCartProduct({
        cartProductId: cartProduct.id,
        quantity: quantity,
      }),
    300,
  );

  const handleUpdateCartProduct = (quantity: number) => {
    const prevCartProducts = queryClient.getQueryData<CartProductType[]>([
      'cart',
    ]);
    const newCartProducts = prevCartProducts?.map((prevCartProduct) => {
      if (prevCartProduct.id === cartProduct.id) {
        return { ...prevCartProduct, quantity: quantity };
      }
      return { ...prevCartProduct };
    });
    queryClient.setQueryData(['cart'], newCartProducts);
    serverUpdate(quantity);
  };

  const handleDelete = () => {
    const prevCartProducts = queryClient.getQueryData<CartProductType[]>([
      'cart',
    ]);
    const newCartProducts = prevCartProducts?.filter(
      (prevCartProduct) => prevCartProduct.id !== cartProduct.id,
    );
    queryClient.setQueryData(['cart'], newCartProducts);
    deleteCartProduct(cartProduct.id);
  };

  return (
    <div className="flex items-center gap-2 justify-between flex-wrap">
      <Image className="max-w-[150px]" src={image} alt="" priority />
      <div className="max-w-[480px]">
        <h1 className="text-[30px] font-bold mb-3">
          {cartProduct.product.name}
        </h1>
        <p className="text-[16px]">{cartProduct.product.description}</p>
      </div>
      <div className="flex gap-5 items-center max-w-[500px] w-full justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="button"
            className="w-[30px] h-[30px] pb-0 pt-0 pl-0 pr-0"
            onClick={() => handleUpdateCartProduct(cartProduct.quantity - 1)}
            disabled={isLoading || cartProduct.quantity === 1}
          >
            -
          </Button>
          <p className="font-bold">{cartProduct.quantity}</p>
          <Button
            variant="button"
            className="w-[30px] h-[30px] pb-0 pt-0 pl-0 pr-0"
            onClick={() => handleUpdateCartProduct(cartProduct.quantity + 1)}
            disabled={isLoading}
          >
            +
          </Button>
        </div>
        <p className="text-[30px] font-bold whitespace-nowrap">
          {cartProduct.product.price * cartProduct.quantity} ₽
        </p>
        <Button
          variant="button"
          className="pb-0 pt-0 pl-0 pr-0"
          onClick={() => handleDelete()}
          color="red"
          disabled={isLoading}
        >
          <Trash color="#fff" size={40} className="hover:stroke-red p-1" />
        </Button>
      </div>
    </div>
  );
};

export default CartListItem;
