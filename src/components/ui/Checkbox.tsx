import { FC, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

const Checkbox: FC<Props> = ({ name, ...props }) => {
  return (
    <div className="flex gap-2">
      <input type="checkbox" className="cursor-pointer" {...props} />
      <label>{name}</label>
    </div>
  );
};

export default Checkbox;
