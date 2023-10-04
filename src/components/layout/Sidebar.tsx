'use client';

import CheckboxWithSearch from '../CheckboxGroupWithSearch';
import Input from '../ui/Input';
import { useSetQueryParams } from '@/hooks/useSetQueryParams';
import { useGetAllGenresQuery } from '@/api/moviesApi/hooks/useGetAllGenresQuery';
import { useGetAllCountriesQuery } from '@/api/moviesApi/hooks/useGetAllCountriesQuery';

export default function Sidebar() {
  const setQueryParams = useSetQueryParams();
  const { data: genreList } = useGetAllGenresQuery();
  const { data: countryList } = useGetAllCountriesQuery();

  const handleChangeTitle = (value: string) => {
    setQueryParams({ title: value });
  };

  const handleChangeGenre = (id: number) => {
    setQueryParams({ genre: id.toString() });
  };

  const handleChangeCountry = (id: number) => {
    setQueryParams({ country: id.toString() });
  };

  const handleChangeMinYear = (year: string) => {
    setQueryParams({ year_start: year });
  };

  const handleChangeMaxYear = (year: string) => {
    setQueryParams({ year_end: year });
  };

  return (
    <aside className="w-[300px] bg-white rounded-lg p-5">
      <p className="text-base bold font-bold">Название</p>
      <Input
        variant="text"
        onChange={(event) => handleChangeTitle(event.target.value)}
      />
      <p className="text-base bold font-bold mt-5">Жанр</p>
      <CheckboxWithSearch data={genreList} onChange={handleChangeGenre} />
      <p className="text-base bold font-bold mt-5">Страна</p>
      <CheckboxWithSearch data={countryList} onChange={handleChangeCountry} />
      <p className="text-base bold font-bold mt-5">Годы</p>
      <div className="flex justify-between">
        <Input
          variant="number"
          placeholder="0"
          onChange={(event) => handleChangeMinYear(event.target.value)}
        />
        <span>-</span>
        <Input
          variant="number"
          placeholder="0"
          onChange={(event) => handleChangeMaxYear(event.target.value)}
        />
      </div>
    </aside>
  );
}
