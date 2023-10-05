import { MovieProductsType } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getMovieProducts } from '..';

export const useGetMovieProductsQuery = (id: number) => {
  return useQuery<MovieProductsType[]>({
    queryKey: ['products', id],
    queryFn: () => getMovieProducts(id),
  });
};
