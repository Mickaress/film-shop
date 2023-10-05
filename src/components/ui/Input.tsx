import { FC, InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant: 'text' | 'number';
  error?: string;
};

const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ variant, error, ...props }, ref) => {
    const classNameMapper = {
      text: 'w-full text-lg bg-gray rounded-lg outline-none p-2 text-[20px] leading-none',
      number:
        'w-[110px] h-[23px] text-sm bg-darkgray text-white outline-none text-center rounded-full',
    };
    return (
      <div>
        <input
          {...props}
          ref={ref}
          className={`${classNameMapper[variant]} ${
            error && 'border-red border'
          }`}
        />
        <p className="text-red text-xs">{error}</p>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
