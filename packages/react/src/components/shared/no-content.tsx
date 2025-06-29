"use client";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type NoContentProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const NoContent: FC<NoContentProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={twMerge(
        "no-content flex h-20 items-center justify-center rounded-sm border text-sm text-slate-500",
        className
      )}
    >
      {children ?? "No content found"}
    </div>
  );
};
