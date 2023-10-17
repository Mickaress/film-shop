import { useGetFilteredMoviesQuery } from '@/api/moviesApi/hooks/useGetFilteredMoviesQuery';
import { useGetFilter } from './useGetFilter';

const useMovieFetchingStatus = () => {
  const filter = useGetFilter();
  const { isFetching } = useGetFilteredMoviesQuery(filter);
  return isFetching;
};

export default useMovieFetchingStatus;
