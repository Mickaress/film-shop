export type OrderType = {
  id: number;
  amount: number;
  shippingCode: string | null;
};

export type OrderProduct = {
  id: number;
  productId: number;
  name: string;
  quantity: number;
};

export type OrderInfoType = {
  user: {
    email: string;
    fullName: string;
    phone: string;
    address: string;
  };
  products: OrderProduct[];
};
