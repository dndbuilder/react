import { BlockGroup, BlockConfig } from "./block";
import { BreakpointConfig } from "./responsive";

export * from "./block";
export * from "./responsive";
export * from "./style";
export * from "./theme";
export * from "./media";

export type AnyObject = Record<string, unknown>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export enum Direction {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export type SelectOption = {
  label: string;
  value: string;
};

export enum SettingsType {
  BLOCK = "block",
  ADVANCED = "advanced",
  THEME = "theme",
}

// Define the BuilderConfig type
export type BuilderConfig = {
  blocks?: Partial<BlockConfig>[];
  groups?: BlockGroup[];
  breakpoints?: Partial<BreakpointConfig>[];
};

export enum ThemeSettingsType {
  GLOBAL = "global",
  LAYOUT = "layout",
  COLOR = "color",
  TYPOGRAPHY = "typography",
  BUTTON = "button",
  LINK = "link",
  CUSTOM_CSS = "custom-css",
}

export type LocalizedValue<T = string> = {
  [key: string]: T;
};

export enum BuilderRightPanelType {
  SETTINGS = "settings",
  LAYER = "layer",
}
