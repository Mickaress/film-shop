'use client';

import Input from '../ui/Input';
import { useSetQueryParams } from '@/hooks/useSetQueryParams';

const YearRangeFilter = () => {
  const setQueryParams = useSetQueryParams();

  const handleChangeMinYear = (year: string) => {
    setQueryParams({ year_start: year });
  };

  const handleChangeMaxYear = (year: string) => {
    setQueryParams({ year_end: year });
  };

  return (
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
  );
};

export default YearRangeFilter;
