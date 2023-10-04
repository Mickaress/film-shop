import { FC } from "react";

interface Props {
  name: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: FC<Props> = ({ name, checked, onChange }) => {
  return (
    <div className="flex gap-2">
      <input type="checkbox" defaultChecked={checked} onChange={onChange} />
      <label>{name}</label>
    </div>
  );
};

export default Checkbox;
