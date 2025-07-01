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
          "focus:outline-hidden focus-visible:outline-hidden flex h-[28px] min-h-[28px] w-full rounded-sm border border-gray-300 px-2 text-xs text-gray-700 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-light placeholder:text-gray-300 focus:border-gray-400 focus:ring-0  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
