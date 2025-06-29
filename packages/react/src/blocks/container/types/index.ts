import { ResponsiveValue } from "@/types/responsive";
import {
  BackgroundFieldType,
  BorderFieldType,
  BoxShadow,
  FlexDirection,
  SpacingValue,
  Unit,
  UnitValue,
  WithPseudoClass,
} from "@/types/style";

export type ContainerSettingsType = {
  contentWidth?: ResponsiveValue<"boxed" | "full">;
  width?: ResponsiveValue<UnitValue>;
  maxWidth?: ResponsiveValue<UnitValue>;
  minHeight?: ResponsiveValue<UnitValue>;
  flexDirection?: ResponsiveValue<FlexDirection>;
  justifyContent?: ResponsiveValue<string>;
  alignItems?: ResponsiveValue<string>;
  wrap?: ResponsiveValue<string>;
  gap?: ResponsiveValue<{
    x?: number;
    y?: number;
    linked?: boolean;
    unit?: Unit;
  }>;
  alignContent?: ResponsiveValue<string>;
  overflow?: ResponsiveValue<string | null>;
  htmlTag?: string;
  background?: BackgroundFieldType;
  border?: BorderFieldType;
  boxShadow?: WithPseudoClass<BoxShadow>;
  padding?: ResponsiveValue<SpacingValue>;
  margin?: ResponsiveValue<SpacingValue>;
};
