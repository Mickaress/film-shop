import { FilterType, MoviesListType } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getFilteredFilms } from '..';

export const useGetFilteredMoviesQuery = (filter: FilterType) => {
  return useQuery<MoviesListType>({
    queryKey: ['films', filter],
    queryFn: () => getFilteredFilms(filter),
  });
};
