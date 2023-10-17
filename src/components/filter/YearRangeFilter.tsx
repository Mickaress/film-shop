'use client';

import useMovieFetchingStatus from '@/hooks/useMovieFetchingStatus';
import Input from '../ui/Input';
import { useSetQueryParams } from '@/hooks/useSetQueryParams';
import { useDebouncedCallback } from 'use-debounce';

const YearRangeFilter = () => {
  const setQueryParams = useSetQueryParams();

  const isFetching = useMovieFetchingStatus();

  const handleChangeMinYear = useDebouncedCallback((year: string) => {
    setQueryParams({ year_start: year });
  }, 500);

  const handleChangeMaxYear = useDebouncedCallback((year: string) => {
    setQueryParams({ year_end: year });
  }, 500);

  return (
    <div className="flex justify-between">
      <Input
        variant="number"
        placeholder="0"
        onChange={(event) => handleChangeMinYear(event.target.value)}
        disabled={isFetching}
      />
      <span>-</span>
      <Input
        variant="number"
        placeholder="0"
        onChange={(event) => handleChangeMaxYear(event.target.value)}
        disabled={isFetching}
      />
    </div>
  );
};

export default YearRangeFilter;
