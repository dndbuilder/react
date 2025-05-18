import React from 'react';

import { classNames } from '@/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={classNames(
        'flex h-[28px] min-h-[28px] w-full rounded-sm border border-dark-300 px-2 text-xs text-dark-700 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-light placeholder:text-dark-300 focus:border-dark-400 focus:outline-hidden focus:ring-0 focus-visible:outline-hidden  disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export default Input;
