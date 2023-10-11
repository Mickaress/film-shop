import { useQuery } from '@tanstack/react-query';
import { getCartProducts } from '..';
import { CartProductType } from '@/models/Cart';

export const useGetCartProductsQuery = () => {
  return useQuery<CartProductType[]>({
    queryKey: ['cart'],
    queryFn: () => getCartProducts(),
  });
};
