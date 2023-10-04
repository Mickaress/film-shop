// function for manage query params

import { useRouter } from 'next/navigation';
import { useGetFilter } from './useGetFilter';

export const useSetQueryParams = () => {
  const router = useRouter();
  const filter = useGetFilter();

  const setQueryParams = ({
    title = filter.title,
    genre = '',
    country = '',
    year_start = filter.year_start,
    year_end = filter.year_end,
    page = filter.page,
  } = {}) => {
    const queryParams = new URLSearchParams();

    // title
    queryParams.set('title', title);

    // genres
    let genres = filter.genre;
    if (genre !== '') {
      if (genres.includes(genre)) {
        genres = genres.filter((item) => item !== genre);
      } else {
        genres.push(genre);
      }
    }

    if (genres.length > 0) {
      genres.forEach((genre) => {
        queryParams.append('genre[]', genre);
      });
    }

    // countries
    let countries = filter.country;
    if (country !== '') {
      if (countries.includes(country)) {
        countries = countries.filter((item) => item !== country);
      } else {
        countries.push(country);
      }
    }

    if (countries.length > 0) {
      countries.forEach((country) => {
        queryParams.append('country[]', country);
      });
    }

    // year_start
    if (year_start !== null && year_start !== '') {
      queryParams.set('year_start', year_start);
    }

    // year_end
    if (year_end !== null && year_end !== '') {
      queryParams.set('year_end', year_end);
    }

    // page
    queryParams.set('page', page);

    router.push('?' + queryParams.toString());
  };

  return setQueryParams;
};
