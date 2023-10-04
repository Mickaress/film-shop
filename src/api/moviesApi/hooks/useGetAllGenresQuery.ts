import { MovieGenre } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getAllGenres } from '..';

export const useGetAllGenresQuery = () => {
  return useQuery<MovieGenre[]>({
    queryKey: ['genres'],
    queryFn: () => getAllGenres(),
  });
};
