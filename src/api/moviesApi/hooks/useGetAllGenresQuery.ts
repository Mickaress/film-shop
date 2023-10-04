import { MovieGenreType } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getAllGenres } from '..';

export const useGetAllGenresQuery = () => {
  return useQuery<MovieGenreType[]>({
    queryKey: ['genres'],
    queryFn: () => getAllGenres(),
  });
};
