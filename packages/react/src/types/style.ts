import { Media } from "@/types/media";
import { CSSProperties } from "react";
import { ResponsiveValue } from "./responsive";

export enum Unit {
  PX = "px",
  PERCENTAGE = "%",
  EM = "em",
  REM = "rem",
  VW = "vw",
  VH = "vh",
  DEG = "deg",
  GRAD = "grad",
  RAD = "rad",
  TURN = "turn",
}

export enum SpacingUnit {
  PX = "px",
  PERCENT = "%",
  EM = "em",
  REM = "rem",
  VW = "vw",
}

export enum BorderStyle {
  NONE = "none",
  SOLID = "solid",
  DOTTED = "dotted",
  DASHED = "dashed",
  DOUBLE = "double",
  GROOVE = "groove",
  RIDGE = "ridge",
  INSET = "inset",
  OUTSET = "outset",
}

export enum FlexDirection {
  ROW = "row",
  COLUMN = "column",
  ROW_REVERSE = "row-reverse",
  COLUMN_REVERSE = "column-reverse",
}

export type FlexGapType = {
  unit?: Unit;
  linked?: boolean;
  x?: number;
  y?: number;
};

export enum JustifyContent {
  START = "start",
  CENTER = "center",
  END = "end",
  SPACE_BETWEEN = "space-between",
  SPACE_AROUND = "space-around",
  SPACE_EVENTLY = "space-evently",
}

export enum AlignItem {
  START = "start",
  CENTER = "center",
  END = "end",
  STRETCH = "stretch",
}

export enum FlexWrap {
  WRAP = "wrap",
  NOWRAP = "nowrap",
}

export enum ColorType {
  GLOBAL = "Global",
  CUSTOM = "Custom",
}

export enum BackgroundType {
  CLASSIC = "Classic",
  GRADIENT = "Gradient",
  VIDEO = "Video",
}
export interface TextStroke {
  width?: ResponsiveValue<UnitValue>;
  color?: string;
}

export interface TextShadow {
  color?: string;
  blur?: number;
  horizontal?: number;
  vertical?: number;
}

export interface BoxShadow {
  color?: string;
  blur?: number;
  spread?: number;
  horizontal?: number;
  vertical?: number;
  position?: string;
}
export interface TypographyType {
  presetId?: string;
  fontFamily?: ResponsiveValue<string>;
  fontSize?: ResponsiveValue<UnitValue>;
  fontWeight?: ResponsiveValue<number>;
  textTransform?: ResponsiveValue<CSSProperties["textTransform"]>;
  fontStyle?: ResponsiveValue<string>;
  textDecoration?: ResponsiveValue<string>;
  lineHeight?: ResponsiveValue<UnitValue>;
  letterSpacing?: ResponsiveValue<UnitValue>;
  wordSpacing?: ResponsiveValue<UnitValue>;
}
export enum SizeType {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  XXL = "xxl",
  DEFAULT = "default",
}

export enum TextAlignType {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
  JUSTIFY = "justify",
}

export enum DisplayType {
  INLINE = "inline",
  BLOCK = "block",
  INLINE_BLOCK = "inline-block",
  FLEX = "flex",
  INLINE_FLEX = "inline-flex",
  NONE = "none",
}

export type AttributeType = {
  name?: string;
  value?: string;
};

export type WithPseudoClass<T = string> = {
  [K in PseudoClass]?: T;
};

export type ExtendWithPseudoClass<
  T = string,
  NewKeys extends string = string,
> = WithPseudoClass<T> & {
  [K in NewKeys]?: T;
};

export enum PseudoClass {
  DEFAULT = "default",
  HOVER = "hover",
  FOCUS = "focus",
}
export interface UnitValue {
  unit?: Unit;
  value?: number;
}

export interface SpacingValue {
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
  unit?: Unit;
  linked?: boolean;
}

export type BackgroundFieldType = {
  type?: WithPseudoClass<BackgroundType>;
  color?: WithPseudoClass<string>;
  gradient?: {
    color1?: WithPseudoClass<string>;
    color2?: WithPseudoClass<string>;
    location1?: WithPseudoClass<UnitValue>;
    location2?: WithPseudoClass<UnitValue>;
    angle?: WithPseudoClass<UnitValue>;
    type?: WithPseudoClass;
    position?: WithPseudoClass;
  };
  position?: ResponsiveValue<WithPseudoClass>;
  positionX?: ResponsiveValue<WithPseudoClass<UnitValue>>;
  positionY?: ResponsiveValue<WithPseudoClass<UnitValue>>;
  attachment?: WithPseudoClass<string>;
  repeat?: ResponsiveValue<WithPseudoClass>;
  size?: ResponsiveValue<WithPseudoClass>;
  image?: WithPseudoClass<Media>;
  transitionDuration?: number;
};

export type BorderFieldType = {
  type?: WithPseudoClass<string>;
  radius?: WithPseudoClass<SpacingValue>;
  width?: ResponsiveValue<WithPseudoClass<SpacingValue>>;
  color?: WithPseudoClass<string>;
  transitionDuration?: number;
};

export type PositionFieldType = {
  value?: ResponsiveValue<"relative" | "absolute" | "fixed" | "sticky">;
  horizontal?: ResponsiveValue<"left" | "right">;
  horizontalOffset?: ResponsiveValue<UnitValue>;
  vertical?: ResponsiveValue<"top" | "bottom">;
  verticalOffset?: ResponsiveValue<UnitValue>;
};

export type DisplayFieldType = {
  value?: ResponsiveValue<DisplayType>;
  flexDirection?: ResponsiveValue<FlexDirection>;
  justifyContent?: ResponsiveValue<JustifyContent>;
  alignItems?: ResponsiveValue<AlignItem>;
  flexWrap?: ResponsiveValue<FlexWrap>;
  gap?: ResponsiveValue<FlexGapType>;
};
export enum Position {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
  START = "start",
  END = "end",
  CENTER = "center",
}
