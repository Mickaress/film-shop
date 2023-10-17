'use client';

import useMovieFetchingStatus from '@/hooks/useMovieFetchingStatus';
import Input from '../ui/Input';
import { useSetQueryParams } from '@/hooks/useSetQueryParams';
import { useDebouncedCallback } from 'use-debounce';

const TitleFilter = () => {
  const isFetching = useMovieFetchingStatus();
  const setQueryParams = useSetQueryParams();

  const handleChangeTitle = useDebouncedCallback((value: string) => {
    setQueryParams({ title: value });
  }, 500);

  return (
    <Input
      variant="text"
      placeholder="Поиск..."
      onChange={(event) => handleChangeTitle(event.target.value)}
      disabled={isFetching}
    />
  );
};

export default TitleFilter;
