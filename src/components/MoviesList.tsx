'use client';
import Pagination from './Pagination';
import { useGetFilter } from '@/hooks/useGetFilter';
import MoviesListItem from './MoviesListItem';
import { ClipLoader } from 'react-spinners';
import { useGetFilteredMoviesQuery } from '@/api/moviesApi/hooks/useGetFilteredMoviesQuery';

const MoviesList = () => {
  const filter = useGetFilter();

  const { data, isLoading } = useGetFilteredMoviesQuery(filter);

  const movies = data?.movies;
  const pages = data ? Math.ceil(data.count / 18) : 1;
  const currentPage = parseInt(filter.page);

  if (isLoading)
    return (
      <div className="bg-white rounded-lg p-5 w-full flex justify-center">
        <ClipLoader size={48} />
      </div>
    );

  return (
    <div className="bg-white rounded-lg p-5 w-full flex flex-col items-center">
      <div className="flex flex-wrap gap-3 justify-center">
        {movies?.length !== 0 ? (
          movies?.map((movie) => (
            <MoviesListItem id={movie.id} key={movie.id} title={movie.title} />
          ))
        ) : (
          <p className="text-[48px]">Фильмы не найдены</p>
        )}
      </div>
      <Pagination pages={pages} currentPage={currentPage} />
    </div>
  );
};

export default MoviesList;
