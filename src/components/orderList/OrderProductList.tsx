import { OrderProduct } from '@/models/Order';
import React from 'react';
import OrderProductListItem from './OrderProductListItem';

type Props = {
  products: OrderProduct[];
};

const OrderProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="flex flex-col gap-5">
      {products.map((product) => (
        <OrderProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default OrderProductList;
