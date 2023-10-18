import { OrderProduct } from '@/models/Order';
import Image from 'next/image';
import React from 'react';

type OrderProductListItemProps = {
  product: OrderProduct;
};

const OrderProductListItem: React.FC<OrderProductListItemProps> = ({
  product,
}) => {
  const image = require(`@/api/static/productsImages/${product.productId}.png`);
  return (
    <div className="flex items-center gap-10 justify-between">
      <Image src={image} alt="" width={100} />
      <h1 className="text-[24px] font-bold">{product.name}</h1>
      <p>Количество: {product.quantity}</p>
    </div>
  );
};

export default OrderProductListItem;
