'use client';

import { useGetFilter } from '@/hooks/useGetFilter';
import { useGetAllCountriesQuery } from '@/api/moviesApi/hooks/useGetAllCountriesQuery';
import { useSetQueryParams } from '@/hooks/useSetQueryParams';
import CheckboxGroupWithSearch from './ui/CheckboxGroupWithSearch';

const CountryFilter = () => {
  const { data: countryList, isLoading } = useGetAllCountriesQuery();

  const filter = useGetFilter();
  const checkedList = filter.country;

  const setQueryParams = useSetQueryParams();
  const handleChangeCountry = (id: number) => {
    setQueryParams({ country: id.toString() });
  };

  return (
    <CheckboxGroupWithSearch
      list={countryList}
      checkedList={checkedList}
      handleChange={handleChangeCountry}
      isLoading={isLoading}
    />
  );
};

export default CountryFilter;
