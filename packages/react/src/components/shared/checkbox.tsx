"use client";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { classNames } from "@/utils";
import { FiCheck } from "react-icons/fi";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={classNames(
      "focus-visible:outline-hidden h-4 w-4 shrink-0 rounded-sm border focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50  data-[state=checked]:bg-slate-700 data-[state=checked]:text-slate-700",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={classNames("flex items-center justify-center text-current")}
    >
      <FiCheck className=" text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
