import { IconType } from "@/types/block";
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

export type DrawerSettingsType = {
  trigger?: {
    icon?: IconType & {
      show?: ResponsiveValue<boolean>;
      size?: ResponsiveValue<WithPseudoClass<UnitValue>>;
      color?: WithPseudoClass<string>;
      order?: ResponsiveValue<number>;
    };
    text?: {
      show?: ResponsiveValue<boolean>;
      content?: LocalizedValue<string>;
      order?: ResponsiveValue<number>;
    };
    color?: WithPseudoClass<string>;
    background?: {
      color?: WithPseudoClass<string>;
    };
    height?: ResponsiveValue<UnitValue>;
    width?: ResponsiveValue<UnitValue>;
    spacing?: ResponsiveValue<UnitValue>;
    align?: ResponsiveValue<"flex-start" | "center" | "flex-end" | "space-between">;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    typography?: TypographyType;

    border?: BorderFieldType;
  };
  content?: {
    direction?: ResponsiveValue<"left" | "right" | "top" | "bottom">;
    width?: ResponsiveValue<UnitValue>;
    height?: ResponsiveValue<UnitValue>;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    border?: BorderFieldType;
    boxShadow?: WithPseudoClass<BoxShadow>;
    background?: {
      color?: WithPseudoClass<string | null>;
    };
    backdrop?: {
      color?: WithPseudoClass<string>;
    };
  };
};
