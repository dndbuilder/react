import { IconType } from "@/types";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import {
  BorderFieldType,
  BoxShadow,
  SpacingValue,
  TypographyType,
  UnitValue,
  WithPseudoClass,
} from "@/types/style";
import { Media } from "@/types/media";

export type DropdownSettingsType = {
  button?: {
    text?: {
      show?: ResponsiveValue<boolean>;
      content?: LocalizedValue<string>;
      order?: ResponsiveValue<number>;
    };
    icon?: IconType & {
      show?: ResponsiveValue<boolean>;
      order?: ResponsiveValue<number>;
      color?: WithPseudoClass<string | null>;
      size?: ResponsiveValue<WithPseudoClass<UnitValue>>;
    };
    image?: {
      show?: ResponsiveValue<boolean>;
      media?: Media;
      order?: ResponsiveValue<number>;
      width?: ResponsiveValue<UnitValue>;
      maxWidth?: ResponsiveValue<UnitValue>;
      height?: ResponsiveValue<UnitValue>;
    };
    height?: ResponsiveValue<UnitValue>;
    width?: ResponsiveValue<UnitValue>;
    spacing?: ResponsiveValue<UnitValue>;
    align?: ResponsiveValue<"flex-start" | "center" | "flex-end">;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    color?: WithPseudoClass<string | null>;
    background?: {
      color?: WithPseudoClass<string | null>;
    };
    border?: BorderFieldType;
    typography?: TypographyType;
  };
  content?: {
    avoidCollisions?: ResponsiveValue<boolean>;
    side?: ResponsiveValue<"top" | "right" | "bottom" | "left">;
    sideOffset?: ResponsiveValue<number>;
    align?: ResponsiveValue<"start" | "center" | "end">;
    alignOffset?: ResponsiveValue<number>;
    width?: ResponsiveValue<UnitValue>;
    height?: ResponsiveValue<UnitValue>;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    border?: BorderFieldType;
    boxShadow?: WithPseudoClass<BoxShadow>;
    background?: {
      color?: WithPseudoClass<string | null>;
    };
  };
};
