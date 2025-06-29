"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import React from "react";
import { classNames } from "@/utils";

export const HoverCard = ({ children, ...props }: HoverCardPrimitive.HoverCardProps) => {
  return <HoverCardPrimitive.Root {...props}>{children}</HoverCardPrimitive.Root>;
};

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <HoverCardPrimitive.Trigger ref={ref} {...props}>
      {children}
    </HoverCardPrimitive.Trigger>
  );
});

HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ children, className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={classNames(
        "outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 rounded-sm bg-white shadow-[0px_2px_20px_rgb(0,0,0,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </HoverCardPrimitive.Content>
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

HoverCard.Trigger = HoverCardTrigger;
HoverCard.Content = HoverCardContent;
HoverCard.Arrow = HoverCardPrimitive.Arrow;
HoverCard.Portal = HoverCardPrimitive.HoverCardPortal;

HoverCard.displayName = HoverCardPrimitive.Root.displayName;
