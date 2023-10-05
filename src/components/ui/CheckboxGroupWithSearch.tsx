import React, { useState } from 'react';
import Input from './Input';
import Checkbox from './Checkbox';
import Button from './Button';

type Props = {
  list: { id: number; name: string }[] | undefined;
  checkedList: string[];
  handleChange: (id: number) => void;
};

const CheckboxGroupWithSearch: React.FC<Props> = ({
  list,
  checkedList,
  handleChange,
}) => {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredCheckbox = list?.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase()),
  );

  const checkboxToShow = showAll
    ? filteredCheckbox
    : filteredCheckbox?.slice(0, 4);

  return (
    <div>
      <Input
        variant="text"
        placeholder="Поиск..."
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="my-2">
        {checkboxToShow?.map((item) => (
          <Checkbox
            key={item.id}
            name={item.name}
            checked={checkedList.includes(item.id.toString())}
            onChange={() => handleChange(item.id)}
          />
        ))}
      </div>
      {filteredCheckbox && filteredCheckbox?.length > 4 && (
        <Button
          variant="text"
          className="text-[16px]"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Скрыть \u25B2' : 'Показать все \u25BC'}
        </Button>
      )}
    </div>
  );
};

export default CheckboxGroupWithSearch;
