import { MovieCountryType } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getAllCountries } from '..';

export const useGetAllCountriesQuery = () => {
  return useQuery<MovieCountryType[]>({
    queryKey: ['countries'],
    queryFn: () => getAllCountries(),
  });
};
