import { IconType } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import {
  BackgroundFieldType,
  BoxShadow,
  ExtendWithPseudoClass,
  SpacingValue,
  TypographyType,
  UnitValue,
  WithPseudoClass,
} from "@/types/style";

export type TabType = {
  id: string;
  label: LocalizedValue<string>;
  children: string[];
  icon?: IconType;
};

export type TabsSettingsType = {
  tabs: TabType[];
  activeTabId?: string | null;
  list?: {
    orientation?: ResponsiveValue<"horizontal" | "vertical">;
    alignment?: ResponsiveValue<"flex-start" | "center" | "flex-end">;
    spacing?: ResponsiveValue<UnitValue>;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
  };
  button?: {
    width?: ResponsiveValue<UnitValue>;
    height?: ResponsiveValue<UnitValue>;
    alignment?: ResponsiveValue<"flex-start" | "center" | "flex-end">;
    spacing?: ResponsiveValue<UnitValue>;
    typography?: TypographyType;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    color?: ExtendWithPseudoClass<string | null, "active">;
    background?: {
      color?: ExtendWithPseudoClass<string | null, "active">;
    };
    border?: {
      type?: ExtendWithPseudoClass<string, "active">;
      width?: ExtendWithPseudoClass<SpacingValue, "active">;
      radius?: ExtendWithPseudoClass<SpacingValue, "active">;
      color?: ExtendWithPseudoClass<string | null, "active">;
    };
    boxShadow?: ExtendWithPseudoClass<BoxShadow, "active">;
  };
  content?: {
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    border?: {
      type?: WithPseudoClass<string>;
      width?: WithPseudoClass<SpacingValue>;
      radius?: WithPseudoClass<SpacingValue>;
      color?: WithPseudoClass<string | null>;
    };
  };
};
