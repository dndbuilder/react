import React from 'react';

import { classNames } from '@/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={classNames(
        'flex min-h-[80px] w-full rounded-sm border border-dark-200 bg-white px-3 py-2 text-sm placeholder:text-dark-300 focus:border-dark-500 focus-visible:outline-hidden focus-visible:ring-0  focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
