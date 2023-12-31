import React from 'react';

type Props = {
  children: React.ReactNode;
};

const layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg mt-5">{children}</div>
    </div>
  );
};

export default layout;
