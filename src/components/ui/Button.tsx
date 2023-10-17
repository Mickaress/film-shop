import Link from 'next/link';
import React, { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'text' | 'button';
  href?: string;
  children: React.ReactNode;
  className?: string;
  color?: 'blue' | 'red';
};

const Button: React.FC<Props> = ({
  variant,
  href,
  children,
  className,
  disabled,
  color = 'blue',
  ...props
}) => {
  const classNameMapper = {
    text: 'text-blue hover:underline',
    button: `text-white py-2 px-5 border ${
      color === 'red' ? 'bg-red border-red' : 'bg-blue border-blue'
    } rounded-lg hover:text-blue hover:bg-white`,
  };

  const classNameDisabledMapper = {
    text: 'text-gray',
    button: 'text-white py-2 px-5 bg-gray rounded-lg',
  };

  const classNameCombination = `${
    disabled ? classNameDisabledMapper[variant] : classNameMapper[variant]
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={`${classNameCombination}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${classNameCombination}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
