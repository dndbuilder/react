import React, { ComponentType } from "react";

export enum Breakpoint {
  MOBILE = "mobile",
  // MOBILE_LANDSCAPE = 'mobile-landscape',
  TABLET = "tablet",
  // TABLET_LANDSCAPE = 'tablet-landscape',
  // LAPTOP = 'laptop',
  DESKTOP = "desktop",
  // WIDESCREEN = 'widescreen',
}

export type ResponsiveValue<T = string> = {
  [key in Breakpoint]?: T;
};

export type BreakpointConfig = {
  key: Breakpoint;
  label: string;
  icon: ComponentType;
  previewWidth: number;
  maxWidth: number;
  minWidth: number;
};
