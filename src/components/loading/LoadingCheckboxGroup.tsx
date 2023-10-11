import React from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {
  length: number;
};

const LoadingCheckboxGroup: React.FC<Props> = ({ length }) => {
  const loadingCheckboxGroup = [];

  for (let i = 0; i < length; i++) {
    loadingCheckboxGroup.push(
      <div className="flex gap-2 mb-[1px]" key={i}>
        <input type="checkbox" disabled />
        <label className="w-full">
          <Skeleton height={20} />
        </label>
      </div>,
    );
  }

  return <div className="my-2">{loadingCheckboxGroup}</div>;
};

export default LoadingCheckboxGroup;
