import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import {
  BackgroundFieldType,
  BorderFieldType,
  BoxShadow,
  SpacingValue,
  TypographyType,
  UnitValue,
  WithPseudoClass,
} from "@/types/style";

export type ProgressBarSettingsType = {
  title?: {
    show?: ResponsiveValue<boolean>;
    content?: LocalizedValue<string>;
    typography?: TypographyType;
    color?: WithPseudoClass<string>;
    background?: {
      color?: WithPseudoClass<string>;
    };
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
  };

  progressBar?: {
    background?: {
      color?: WithPseudoClass<string>;
    };
    height?: ResponsiveValue<UnitValue>;
    maxWidth?: ResponsiveValue<UnitValue>;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    border?: BorderFieldType;
  };

  progressFill?: {
    background?: {
      color?: WithPseudoClass<string>;
    };
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    border?: BorderFieldType;
  };

  percentage?: {
    show?: ResponsiveValue<boolean>;
    value?: number;
    color?: WithPseudoClass<string>;
    typography?: TypographyType;
    background?: {
      color?: WithPseudoClass<string>;
    };
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    alignment?: ResponsiveValue<"flex-start" | "center" | "flex-end">;
  };
};
