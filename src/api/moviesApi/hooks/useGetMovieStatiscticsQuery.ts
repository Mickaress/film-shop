import { MovieStaticticsType } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getMovieStatictics } from '..';

export const useGetMovieStatiscticsQuery = (
  movieId: number,
  startDate: string,
  endDate: string,
) => {
  return useQuery<MovieStaticticsType[]>({
    queryKey: ['statisctics', movieId, startDate, endDate],
    queryFn: () => getMovieStatictics(movieId, startDate, endDate),
  });
};
