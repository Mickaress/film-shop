import React, { useState } from 'react';
import Input from './Input';
import Checkbox from './Checkbox';
import Button from './Button';
import LoadingCheckboxGroup from '../loading/LoadingCheckboxGroup';

type Props = {
  list: { id: number; name: string }[] | undefined;
  checkedList: string[];
  handleChange: (id: number) => void;
  isLoading: boolean;
  disabled: boolean;
};

const CheckboxGroupWithSearch: React.FC<Props> = ({
  list,
  checkedList,
  handleChange,
  isLoading,
  disabled,
}) => {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredCheckbox = list?.filter((item) =>
    item.name.toLowerCase().startsWith(search.toLowerCase()),
  );

  const checkboxToShow = showAll
    ? filteredCheckbox
    : filteredCheckbox?.slice(0, 3);

  return (
    <div>
      <Input
        variant="text"
        placeholder="Поиск..."
        onChange={(event) => setSearch(event.target.value)}
      />
      {isLoading ? (
        <LoadingCheckboxGroup length={3} />
      ) : (
        <div className="my-2">
          {checkboxToShow?.map((item) => (
            <Checkbox
              key={item.id}
              name={item.name}
              checked={checkedList.includes(item.id.toString())}
              onChange={() => handleChange(item.id)}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      {filteredCheckbox && filteredCheckbox?.length > 3 && (
        <Button
          variant="text"
          className="text-[16px] text-darkgray"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Скрыть \u25B2' : 'Показать все \u25BC'}
        </Button>
      )}
    </div>
  );
};

export default CheckboxGroupWithSearch;
