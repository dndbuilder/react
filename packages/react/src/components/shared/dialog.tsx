"use client";
import { classNames } from "@/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export interface DialogProps extends DialogPrimitive.DialogProps {}

export const Dialog = ({ children, ...props }: DialogProps) => {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
};

Dialog.displayName = DialogPrimitive.Root.displayName;

const Trigger = forwardRef<
  ElementRef<typeof DialogPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <DialogPrimitive.Trigger ref={ref} {...props}>
      {children}
    </DialogPrimitive.Trigger>
  );
});

Trigger.displayName = DialogPrimitive.Trigger.displayName;

const Content = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <DialogPrimitive.Content
      className={classNames(
        "data-[state=open]:animate-content-show focus:outline-hidden z-1000 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-sm bg-white shadow-[hsl(206_22%_7%/35%)_0px_10px_38px_-10px,hsl(206_22%_7%/20%)_0px_10px_20px_-15px]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  );
});

Content.displayName = DialogPrimitive.Content.displayName;

const Overlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      className={classNames(
        "z-100 data-[state=open]:animate-overlay-show fixed inset-0 bg-slate-900 bg-opacity-10"
      )}
      ref={ref}
      {...props}
    />
  );
});

Overlay.displayName = DialogPrimitive.Overlay.displayName;

Dialog.Trigger = Trigger;
Dialog.Content = Content;
Dialog.Overlay = Overlay;
Dialog.Title = DialogPrimitive.Title;
Dialog.Description = DialogPrimitive.Description;
Dialog.Portal = DialogPrimitive.Portal;
Dialog.Close = DialogPrimitive.Close;
