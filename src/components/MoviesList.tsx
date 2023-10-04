'use client';
import Pagination from './Pagination';
import { useQuery } from '@tanstack/react-query';
import { useGetFilter } from '@/hooks/useGetFilter';
import { MoviesListType } from '@/models/Movie';
import { getFilteredFilms } from '@/api/moviesApi';
import MoviesListItem from './MoviesListItem';

const MoviesList = () => {
  const filter = useGetFilter();

  const { data, isLoading } = useQuery<MoviesListType>({
    queryKey: ['films', filter],
    queryFn: () => getFilteredFilms(filter),
  });

  const movies = data?.movies;
  const pages = data ? Math.ceil(data.count / 18) : 1;
  const currentPage = parseInt(filter.page);

  if (isLoading) return <>Загрузка</>;

  return (
    <div className="bg-white max-w-5xl w-full rounded-lg p-5 flex flex-col items-center">
      <div className="flex flex-wrap justify-between gap-3">
        {movies?.map((movie) => (
          <MoviesListItem id={movie.id} key={movie.id} title={movie.title} />
        ))}
      </div>
      <Pagination pages={pages} currentPage={currentPage} />
    </div>
  );
};

export default MoviesList;
