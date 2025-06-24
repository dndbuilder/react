"use client";
import { classNames } from "@/utils";
import { LabelHTMLAttributes, forwardRef } from "react";

export interface ControlLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, ControlLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={classNames(
          "block text-xs text-slate-800 text-left",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";
