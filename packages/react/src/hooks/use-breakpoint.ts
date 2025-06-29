import { BuilderConfiguration } from "@/config/builder.config";
import { Breakpoint } from "@/types/responsive";
import { useEffect, useState } from "react";

export const useBreakpoint = () => {
  // Initialize with default breakpoint
  const [calculatedBreakpoint, setCalculatedBreakpoint] = useState<Breakpoint>(Breakpoint.DESKTOP);

  // Only access window in useEffect to avoid SSR issues
  useEffect(() => {
    if (typeof window === "undefined") return;

    const actualWindow = window.frameWindow ?? window;
    const width =
      actualWindow.innerWidth ||
      actualWindow.document.documentElement.clientWidth ||
      actualWindow.document.body.clientWidth;

    // Set initial breakpoint based on window width
    if (width < BuilderConfiguration.getBreakpoint(Breakpoint.TABLET).minWidth) {
      setCalculatedBreakpoint(Breakpoint.MOBILE);
    } else if (width < BuilderConfiguration.getBreakpoint(Breakpoint.DESKTOP).minWidth) {
      setCalculatedBreakpoint(Breakpoint.TABLET);
    } else {
      setCalculatedBreakpoint(Breakpoint.DESKTOP);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const actualWindow = window.frameWindow ?? window;

    const handleResize = () => {
      const width =
        actualWindow.innerWidth ||
        actualWindow.document.documentElement.clientWidth ||
        actualWindow.document.body.clientWidth;

      if (width < BuilderConfiguration.getBreakpoint(Breakpoint.TABLET).minWidth) {
        setCalculatedBreakpoint(Breakpoint.MOBILE);
      } else if (width < BuilderConfiguration.getBreakpoint(Breakpoint.DESKTOP).minWidth) {
        setCalculatedBreakpoint(Breakpoint.TABLET);
      } else {
        setCalculatedBreakpoint(Breakpoint.DESKTOP);
      }
    };

    actualWindow.addEventListener("resize", handleResize);

    return () => {
      actualWindow.removeEventListener("resize", handleResize);
    };
  }, []);

  return calculatedBreakpoint;
};
