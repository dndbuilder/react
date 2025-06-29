"use client";
import { classNames } from "@/utils";
import { FC } from "react";

export type NotSupportedBlockProps = {
  className?: string;
  children?: React.ReactNode;
};

export const NotSupportedBlock: FC<NotSupportedBlockProps> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        "border-danger-500 text-danger-500 rounded-sm border border-dashed px-4 py-2 text-center",
        className
      )}
    >
      {children || <p>This block is not supported for this resource.</p>}
    </div>
  );
};
