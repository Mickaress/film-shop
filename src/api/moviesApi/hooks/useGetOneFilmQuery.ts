import { MovieDetailType } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getOneMovie } from '..';

export const useGetOnedMovieQuery = (movieId: number) => {
  return useQuery<MovieDetailType>({
    queryKey: ['film', movieId],
    queryFn: () => getOneMovie(movieId),
  });
};
