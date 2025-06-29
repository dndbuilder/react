import { LinkType } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import {
  BorderFieldType,
  SpacingValue,
  TypographyType,
  UnitValue,
  WithPseudoClass,
} from "@/types/style";
import { Media } from "@/types/media";

export type ImageSettingsType = {
  media?: Media;
  alignment?: ResponsiveValue<string>;
  link?: LinkType;

  width?: ResponsiveValue<UnitValue>;
  maxWidth?: ResponsiveValue<UnitValue>;
  height?: ResponsiveValue<UnitValue>;
  maxHeight?: ResponsiveValue<UnitValue>;
  margin?: ResponsiveValue<SpacingValue>;
  padding?: ResponsiveValue<SpacingValue>;
  border?: BorderFieldType;
  objectFit?: ResponsiveValue<string>;
  opacity?: WithPseudoClass<number>;
  caption?: {
    text?: LocalizedValue<string>;
    color?: WithPseudoClass<string | null>;
    typography?: TypographyType;
    alignment?: ResponsiveValue<"left" | "center" | "right">;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
  };
  wrapper?: {
    width?: ResponsiveValue<UnitValue>;
    height?: ResponsiveValue<UnitValue>;
    margin?: ResponsiveValue<UnitValue>;
    padding?: ResponsiveValue<UnitValue>;
    border?: BorderFieldType;
  };
};
