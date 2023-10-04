import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <section
      className={`max-w-[1400px] w-full mx-auto px-4 h-full ${className}`}
    >
      {children}
    </section>
  );
};

export default Container;
