import { FC, InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant: 'text' | 'number';
  error?: string;
};

const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ variant, error, ...props }, ref) => {
    const classNameMapper = {
      text: 'w-full text-lg bg-gray rounded-lg outline-none p-2',
      number:
        'w-[120px] h-[23px] text-lg bg-dark_gray text-white outline-none text-center rounded-full',
    };
    return (
      <div className="w-full">
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
