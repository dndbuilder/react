"use client";
import { classNames } from "@/utils";
import { LabelHTMLAttributes, forwardRef } from "react";

export interface ControlLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, ControlLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={classNames("block text-left text-xs text-slate-800", className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";
