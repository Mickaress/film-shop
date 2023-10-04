import { MovieCountry } from '@/models/Movie';
import { useQuery } from '@tanstack/react-query';
import { getAllCountries } from '..';

export const useGetAllCountriesQuery = () => {
  return useQuery<MovieCountry[]>({
    queryKey: ['genres'],
    queryFn: () => getAllCountries(),
  });
};
