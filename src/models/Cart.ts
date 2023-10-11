import { MovieProductsType } from './Movie';

export type CartProductType = {
  id: number;
  product: MovieProductsType;
  quantity: number;
};
