import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { classNames } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex text-sm items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white enabled:hover:bg-gray-800",
        destructive: "bg-red-500 text-white enabled:hover:bg-red-500/90",
        outline:
          "border border-gray-300 border-gray-200 bg-white enabled:hover:bg-gray-100 enabled:hover:text-gray-900",
        secondary: "bg-gray-100 text-gray-900 enabled:hover:bg-gray-100/80",
        ghost: "enabled:hover:bg-gray-100 enabled:hover:text-gray-900",
        link: "text-gray-900 underline-offset-4 enabled:hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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

export { Button, buttonVariants };
