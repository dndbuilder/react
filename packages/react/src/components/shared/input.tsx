"use client";
import React from "react";

import { classNames } from "@/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={classNames(
          "focus:outline-hidden focus-visible:outline-hidden flex h-[28px] min-h-[28px] w-full rounded-sm border border-slate-300 px-2 text-xs text-slate-700 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-light placeholder:text-slate-300 focus:border-slate-400 focus:ring-0  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
