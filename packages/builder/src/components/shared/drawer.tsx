"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties, FC, ReactNode } from "react";
// import '@/assets/styles/drawer.css';

export type DrawerProps = {
  open?: boolean;
  onClose?: () => void;
  direction: "left" | "right" | "top" | "bottom";
  lockBackgroundScroll?: boolean;
  children?: ReactNode;
  duration?: number;
  overlayColor?: String;
  enableOverlay?: boolean;
  style?: CSSProperties;
  zIndex?: number;
  size?: number | string;
  className?: string;
  customIdSuffix?: string;
  overlayClassName?: string;
};

const getDirectionStyle = (
  dir: string,
  size?: number | string
): {} | CSSProperties => {
  switch (dir) {
    case "left":
      return {
        top: 0,
        left: 0,
        transform: "translate3d(-100%, 0, 0)",
        width: size,
        height: "100svh",
      };
    case "right":
      return {
        top: 0,
        right: 0,
        transform: "translate3d(100%, 0, 0)",
        width: size,
        height: "100svh",
      };
    case "bottom":
      return {
        left: 0,
        right: 0,
        bottom: 0,
        transform: "translate3d(0, 100%, 0)",
        width: "100%",
        height: size,
      };
    case "top":
      return {
        left: 0,
        right: 0,
        top: 0,
        transform: "translate3d(0, -100%, 0)",
        width: "100%",
        height: size,
      };

    default:
      return {};
  }
};

export const Drawer: FC<DrawerProps> = (props) => {
  const {
    open,
    onClose,
    children,
    style,
    enableOverlay = true,
    overlayColor = "#000",
    zIndex = 100,
    duration = 500,
    direction,
    size = 280,
    className,
    customIdSuffix,
    lockBackgroundScroll = true,
    overlayClassName = "",
  } = props;

  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const updatePageScroll = () => {
      try {
        bodyRef.current = window.document.querySelector("body");

        if (bodyRef.current && lockBackgroundScroll) {
          if (open) {
            bodyRef.current.style.overflow = "hidden";
          } else {
            bodyRef.current.style.overflow = "";
          }
        }
      } catch (error) {
        console.error("Error updating page scroll:", error);
      }
    };

    updatePageScroll();
  }, [open, lockBackgroundScroll]);

  const idSuffix = useMemo(() => {
    return customIdSuffix || (Math.random() + 1).toString(36).substring(7);
  }, [customIdSuffix]);

  const overlayStyles: CSSProperties = {
    backgroundColor: `${overlayColor}`,
    zIndex: zIndex,
  };

  const drawerStyles: CSSProperties = {
    zIndex: zIndex,
    transitionDuration: `${duration}ms`,
    ...getDirectionStyle(direction, size),
    ...style,
  };

  return (
    <div id={"drawer" + idSuffix} className="drawer">
      <input
        type="checkbox"
        id={"drawer-checkbox" + idSuffix}
        className="drawer-checkbox"
        onChange={onClose}
        checked={open}
      />
      {enableOverlay && (
        <label
          htmlFor={"drawer-checkbox" + idSuffix}
          id={"drawer-overlay" + idSuffix}
          className={"drawer-overlay " + overlayClassName}
          style={overlayStyles}
        />
      )}
      <div
        id={"drawer-container" + idSuffix}
        style={drawerStyles}
        className={"drawer-container " + className}
      >
        {children}
      </div>
    </div>
  );
};
