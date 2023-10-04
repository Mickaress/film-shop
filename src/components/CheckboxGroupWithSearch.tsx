'use client';
import { FC, useState } from 'react';
import Input from './ui/Input';
import Checkbox from './ui/Checkbox';
import { useGetFilter } from '@/hooks/useGetFilter';
import { MovieGenre, MovieCountry } from '@/models/Movie';

interface Props {
  data?: MovieGenre[] | MovieCountry[];
  onChange: (id: number) => void;
}

const CheckboxGroupWithSearch: FC<Props> = ({ data, onChange }) => {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredCheckbox = data?.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase()),
  );

  const checkboxToShow = showAll
    ? filteredCheckbox
    : filteredCheckbox?.slice(0, 4);

  const filter = useGetFilter();
  const checkedList = filter.genre;

  return (
    <div>
      <Input
        variant="text"
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="my-2">
        {checkboxToShow?.map((item) => (
          <Checkbox
            key={item.id}
            name={item.name}
            checked={checkedList.includes(item.id.toString())}
            onChange={() => onChange(item.id)}
          />
        ))}
      </div>
      {filteredCheckbox && filteredCheckbox?.length > 4 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Скрыть \u25B2' : 'Показать все \u25BC'}
        </button>
      )}
    </div>
  );
};

export default CheckboxGroupWithSearch;
