'use client';

import { useGetFilter } from '@/hooks/useGetFilter';
import { useGetAllGenresQuery } from '@/api/moviesApi/hooks/useGetAllGenresQuery';
import { useSetQueryParams } from '@/hooks/useSetQueryParams';
import CheckboxGroupWithSearch from './ui/CheckboxGroupWithSearch';

const GenreCheckboxGroup = () => {
  const { data: genreList } = useGetAllGenresQuery();

  const filter = useGetFilter();
  const checkedGenreList = filter.genre;

  const setQueryParams = useSetQueryParams();
  const handleChangeGenre = (id: number) => {
    setQueryParams({ genre: id.toString() });
  };

  return (
    <CheckboxGroupWithSearch
      list={genreList}
      checkedList={checkedGenreList}
      handleChange={handleChangeGenre}
    />
  );
};

export default GenreCheckboxGroup;
