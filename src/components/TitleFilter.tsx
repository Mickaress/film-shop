'use client';

import Input from './ui/Input';
import { useSetQueryParams } from '@/hooks/useSetQueryParams';

const TitleFilter = () => {
  const setQueryParams = useSetQueryParams();

  const handleChangeTitle = (value: string) => {
    setQueryParams({ title: value });
  };

  return (
    <Input
      variant="text"
      placeholder="Поиск..."
      onChange={(event) => handleChangeTitle(event.target.value)}
    />
  );
};

export default TitleFilter;
