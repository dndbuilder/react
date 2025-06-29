"use client";
import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { HiChevronDown } from "react-icons/hi";
import { BsCheck2 } from "react-icons/bs";
import { classNames } from "@/utils";

export type SelectProps = SelectPrimitive.SelectProps;

export const Select = ({ children, ...props }: SelectProps) => {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
};

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.SelectGroup>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.SelectGroup>
>(({ children, ...props }, ref) => {
  return (
    <SelectPrimitive.Group ref={ref} {...props}>
      {children}
    </SelectPrimitive.Group>
  );
});

SelectGroup.displayName = SelectPrimitive.SelectGroup.displayName;

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.SelectValue>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.SelectValue>
>(({ children, className, ...props }, ref) => {
  return (
    <SelectPrimitive.Value className={classNames("", className)} ref={ref} {...props}>
      {children}
    </SelectPrimitive.Value>
  );
});

SelectValue.displayName = SelectPrimitive.SelectValue.displayName;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  chevronDown?: boolean;
}
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, chevronDown = true, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={classNames(
      "focus:outline-hidden flex h-[30px]  w-full items-center justify-between whitespace-nowrap rounded-sm border border-slate-300  bg-transparent p-2 text-xs text-slate-800 placeholder:text-slate-300 focus:border-slate-500 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}

    {chevronDown && (
      <SelectPrimitive.Icon asChild>
        <HiChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    )}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, sideOffset = -40, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={classNames(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2  data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 min-w-32 overflow-hidden rounded-sm border bg-white shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      sideOffset={sideOffset}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={classNames(
          // 'p-1',
          position === "popper" &&
            "h-(--radix-select-trigger-height) min-w-(--radix-select-trigger-width) w-full"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={classNames("py-1.5 pe-2 ps-8 text-sm font-semibold", className)}
    {...props}
  >
    {children}
  </SelectPrimitive.Label>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  showCheck?: boolean;
}
const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ className, children, showCheck = true, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={classNames(
        "rounded-xs outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 relative flex w-full cursor-default select-none items-center py-1.5 pe-2 ps-8 text-xs text-slate-800 focus:bg-slate-100 focus:text-slate-900",
        className
      )}
      {...props}
    >
      {showCheck && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <BsCheck2 className="h-4 w-4" />
          </SelectPrimitive.ItemIndicator>
        </span>
      )}

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={classNames("-mx-1 my-1 h-px bg-slate-300", className)}
    {...props}
  >
    {children}
  </SelectPrimitive.Separator>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

Select.Group = SelectGroup;
Select.Value = SelectValue;
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Label = SelectLabel;
Select.Item = SelectItem;
Select.Separator = SelectSeparator;

Select.displayName = SelectPrimitive.Select.displayName;
