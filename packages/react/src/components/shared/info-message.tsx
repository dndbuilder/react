"use client";
import { classNames } from "@/utils";
import { FC, HTMLAttributes } from "react";

export interface InfoMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

export const InfoMessage: FC<InfoMessageProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "my-2  text-[12px] font-light italic leading-4 text-slate-700",
        className
      )}
    >
      {children}
    </div>
  );
};
