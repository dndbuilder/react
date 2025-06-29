"use client";

import { classNames } from "@/utils";
import { Root as SlotRoot } from "@radix-ui/react-slot";
import React, { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";

// Drawer Context
interface DrawerContextProps {
  open: () => void;
  close: () => void;
  isOpen: boolean;
  isClosing: boolean;
  showBackdrop: boolean;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}
const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

// Drawer Compound Component
interface DrawerProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Drawer({ children, open: controlledOpen, onOpenChange }: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const open = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setUncontrolledOpen(true);
    }
    setIsClosing(false);
    setTimeout(() => {
      dialogRef.current?.showModal();
      setShowBackdrop(true);
    }, 10);
  }, [isControlled, onOpenChange]);

  const close = useCallback(() => {
    setIsClosing(true);
    setShowBackdrop(false);
    setTimeout(() => {
      dialogRef.current?.close();
      setIsClosing(false);
      if (isControlled) {
        onOpenChange?.(false);
      } else {
        setUncontrolledOpen(false);
      }
    }, 300);
  }, [isControlled, onOpenChange]);

  return (
    <DrawerContext.Provider
      value={{
        open,
        close,
        isOpen,
        isClosing,
        showBackdrop,
        dialogRef,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export type DrawerTriggerProps = {
  children: ReactNode;
  asChild?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

Drawer.Trigger = function DrawerTrigger({
  children,
  asChild,
  className,
  ...props
}: DrawerTriggerProps) {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("Drawer.Trigger must be used within Drawer");

  const Comp = asChild ? SlotRoot : "button";

  return (
    <Comp
      className={classNames("drawer-trigger", className)}
      onClick={ctx.open}
      {...(Comp === "button" ? { type: "button" } : {})}
      {...props}
    >
      {children}
    </Comp>
  );
};

export type DrawerContentProps = {
  children: ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
} & React.HTMLAttributes<HTMLDivElement>;

const drawerDirectionVariants = cva("", {
  variants: {
    direction: {
      left: "inset-y-0 left-0 w-80 h-full",
      right: "inset-y-0 right-0 w-80 h-full",
      top: "inset-x-0 top-0 w-full h-80",
      bottom: "inset-x-0 bottom-0 w-full h-80",
    },
    isClosing: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      direction: "left",
      isClosing: true,
      class: "animate-slide-out-left",
    },
    {
      direction: "left",
      isClosing: false,
      class: "animate-slide-in-left",
    },
    {
      direction: "right",
      isClosing: true,
      class: "animate-slide-out-right",
    },
    {
      direction: "right",
      isClosing: false,
      class: "animate-slide-in-right",
    },
    {
      direction: "top",
      isClosing: true,
      class: "animate-slide-out-top",
    },
    {
      direction: "top",
      isClosing: false,
      class: "animate-slide-in-top",
    },
    {
      direction: "bottom",
      isClosing: true,
      class: "animate-slide-out-bottom",
    },
    {
      direction: "bottom",
      isClosing: false,
      class: "animate-slide-in-bottom",
    },
  ],
  defaultVariants: {
    direction: "left",
    isClosing: false,
  },
});

Drawer.Content = function DrawerContent({
  children,
  direction = "left",
  className,
  ...props
}: DrawerContentProps) {
  const ctx = useContext(DrawerContext) as DrawerContextProps;
  if (!ctx) throw new Error("Drawer.Content must be used within Drawer");

  // Use cva for direction/animation classes
  const directionClass = drawerDirectionVariants({
    direction,
    isClosing: ctx.isClosing,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      ctx.close();
    }
  };

  return (
    <dialog
      ref={ctx.dialogRef}
      onKeyDown={handleKeyDown}
      className={"fixed inset-0 z-50 h-full w-full bg-transparent"}
    >
      <div
        className={classNames(
          "drawer-content fixed z-50 flex flex-col bg-white shadow-lg transition-transform duration-300 ease-out",
          directionClass,
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </dialog>
  );
};

export type DrawerBackdropPropsType = React.HTMLAttributes<HTMLDivElement>;

// Drawer.Backdrop for use inside Drawer.Content
function DrawerBackdrop(props: DrawerBackdropPropsType) {
  const ctx = useContext(DrawerContext);
  if (!ctx || !ctx.showBackdrop) return null;

  return createPortal(
    <div
      className={`drawer-backdrop fixed inset-0 backdrop-blur-sm transition-all duration-300 ease-out ${
        ctx.showBackdrop ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0"
      }`}
      onClick={ctx.close}
      {...props}
    />,
    ctx.dialogRef.current || window.frameDocument?.body || document.body
  );
}
// Attach subcomponent
Drawer.Backdrop = DrawerBackdrop;

export type DrawerCloseButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

function DrawerCloseButton({ children, className, ...rest }: DrawerCloseButtonProps) {
  const ctx = useContext(DrawerContext);
  if (!ctx) return null;
  return (
    <button
      className={classNames("drawer-close-button", className)}
      onClick={ctx.close}
      aria-label="Close drawer"
      {...rest}
    >
      {children}
    </button>
  );
}

// Attach subcomponents
Drawer.CloseButton = DrawerCloseButton;

export { Drawer };
