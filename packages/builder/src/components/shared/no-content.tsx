import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type NoContentProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const NoContent: FC<NoContentProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={twMerge(
        'no-content flex h-20 items-center justify-center rounded-sm border text-sm text-dark-500',
        className
      )}
    >
      {children ?? 'No content found'}
    </div>
  );
};

export default NoContent;
