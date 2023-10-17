import { MovieProductType } from './Movie';

export type CartProductType = {
  id: number;
  product: MovieProductType;
  quantity: number;
};
