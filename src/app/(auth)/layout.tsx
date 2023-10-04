import React from 'react';

type Props = {
  children: React.ReactNode;
};

const layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white p-3 rounded-lg">{children}</div>
    </div>
  );
};

export default layout;
