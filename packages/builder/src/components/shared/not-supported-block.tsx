import { classNames } from '@/utils';
import { FC } from 'react';

type NotSupportedBlockProps = {
  className?: string;
  children?: React.ReactNode;
};

const NotSupportedBlock: FC<NotSupportedBlockProps> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        'px-4 py-2 border border-dashed rounded-sm border-danger-500 text-danger-500 text-center',
        className
      )}
    >
      {children || <p>This block is not supported for this resource.</p>}
    </div>
  );
};

export default NotSupportedBlock;
