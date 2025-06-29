"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { classNames } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded text-xs transition-colors focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 font-medium",
  {
    variants: {
      variant: {
        default: "bg-slate-800 text-white hover:bg-slate-900 focus:bg-slate-900",
        outline: "border border-input hover:border-slate-400 focus:border-slate-600 text-slate-800",
        secondary: "bg-slate-100 text-slate-800 hover:bg-slate-300 focus:bg-slate-300",
        link: "text-slate-800 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-4 py-2",
        sm: "h-9 rounded-sm px-3",
        xs: "h-7 rounded-sm px-3",
        lg: "h-11 rounded-sm px-8 text-[14px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={classNames(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
