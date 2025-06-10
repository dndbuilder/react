import { IconType } from "@/types";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import { BoxShadow, WithPseudoClass } from "@/types/style";

export type DrawerSettingsType = {
  direction?: ResponsiveValue<"left" | "right" | "top" | "bottom">;
  trigger?: ResponsiveValue<"icon" | "text">;
  icon?: IconType & {
    size?: ResponsiveValue<number>;
    color?: WithPseudoClass<string>;
  };
  text?: {
    value: LocalizedValue<string>;
  };
  backgroundColor?: string;
  textColor?: string;
  overlayColor?: string;
  boxShadow?: BoxShadow;
};
