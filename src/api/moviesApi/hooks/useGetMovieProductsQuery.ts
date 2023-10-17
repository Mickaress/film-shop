import { MovieProductType } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getMovieProducts } from '..';

export const useGetMovieProductsQuery = (movieId: number) => {
  return useQuery<MovieProductType[]>({
    queryKey: ['products', movieId],
    queryFn: () => getMovieProducts(movieId),
  });
};
