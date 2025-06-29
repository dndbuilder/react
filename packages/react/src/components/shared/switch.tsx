"use client";
import React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { classNames } from "@/utils";

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={classNames(
      "focus-visible:outline-hidden relative inline-flex h-4 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50  data-[state=checked]:bg-slate-600 data-[state=unchecked]:bg-slate-300",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={classNames(
        "pointer-events-none absolute left-0 inline-block size-5 transform rounded-full border border-slate-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-[-3px]"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;
