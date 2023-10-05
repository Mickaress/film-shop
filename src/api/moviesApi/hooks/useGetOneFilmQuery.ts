import { MovieDetailType } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getOneMovie } from '..';

export const useGetOnedMovieQuery = (id: number) => {
  return useQuery<MovieDetailType>({
    queryKey: ['film', id],
    queryFn: () => getOneMovie(id),
  });
};
