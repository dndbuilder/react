import { classNames } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return <span className={classNames("animate-pulse block rounded-md bg-gray-200", className)} {...props} />;
}

export { Skeleton };
