import Link from 'next/link';
import React from 'react';

type Props = {
  variant: 'text' | 'contained';
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  variant,
  href,
  children,
  className,
  onClick,
}) => {
  const classNameMapper = {
    text: 'hover:text-blue hover:underline',
    contained:
      'text-white py-2 px-5 bg-blue border border-blue hover:text-blue hover: bg-white',
  };

  if (href) {
    return (
      <Link href={href} className={`${classNameMapper[variant]} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${classNameMapper[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
