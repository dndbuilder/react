import { IconType, LinkType } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { SpacingValue, UnitValue, WithPseudoClass } from "@/types/style";

export type IconSettingsType = {
  icon?: IconType;
  view?: ResponsiveValue<"default" | "stacked" | "framed">;
  size?: ResponsiveValue<UnitValue>;
  color?: WithPseudoClass;
  secondaryColor?: WithPseudoClass;
  link?: LinkType;
  alignment?: ResponsiveValue<"left" | "center" | "right">;
  padding?: ResponsiveValue<SpacingValue>;
  shape?: ResponsiveValue<"circle" | "square">;
  rotate?: ResponsiveValue<UnitValue>;
  border?: {
    width?: ResponsiveValue<SpacingValue>;
    radius?: ResponsiveValue<SpacingValue>;
  };
};
