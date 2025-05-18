import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { classNames } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-sm text-xs transition-colors focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-dokan-500 text-white hover:bg-dokan-600 focus:bg-dokan-600",
        outline:
          "border border-input hover:border-dark-400 focus:border-dark-600",
        secondary:
          "bg-dark-600 text-dark-100 hover:bg-dark-700 focus:bg-dark-700",
        link: "text-dokan-500 underline-offset-4 hover:underline",
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

export default Button;
