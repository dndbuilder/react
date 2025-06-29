import { ResponsiveValue } from "@/types/responsive";
import {
  BackgroundType,
  BorderStyle,
  BoxShadow,
  SpacingValue,
  TypographyType,
  Unit,
  UnitValue,
  WithPseudoClass,
} from "@/types/style";

export type Theme = {
  id: string;
  name: string;
  settings: ThemeSettings;
};

export type ThemeConfig = {
  settings: ThemeSettings;
};

export type ThemeSettings = {
  layout?: {
    container?: {
      width?: ResponsiveValue<UnitValue>;
      maxWidth?: ResponsiveValue<UnitValue>;
      padding?: ResponsiveValue<SpacingValue>;
      gap?: ResponsiveValue<{
        x?: number;
        y?: number;
        linked?: boolean;
        unit?: Unit;
      }>;
    };
  };
  color: {
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    presets?: { id: string; name: string; value: string }[];
  };
  typography: {
    body?: TypographyType;
    h1?: TypographyType;
    h2?: TypographyType;
    h3?: TypographyType;
    h4?: TypographyType;
    h5?: TypographyType;
    h6?: TypographyType;
    presets?: {
      id: string;
      name: string;
      value: Omit<TypographyType, "presets">;
    }[];
  };
  button: {
    typography?: TypographyType;
    color?: WithPseudoClass<string>;
    background?: {
      type?: WithPseudoClass<BackgroundType>;
      color?: WithPseudoClass;
      gradient?: {
        color1?: WithPseudoClass;
        color2?: WithPseudoClass;
        location1?: WithPseudoClass<UnitValue>;
        location2?: WithPseudoClass<UnitValue>;
        angle?: WithPseudoClass<UnitValue>;
        type?: WithPseudoClass;
        position?: WithPseudoClass;
      };
      transitionDuration?: number;
    };
    borderColor?: WithPseudoClass<string>;
    borderStyle?: WithPseudoClass<string>;
    borderWidth?: WithPseudoClass<SpacingValue>;
    borderRadius?: WithPseudoClass<SpacingValue>;
    boxShadow?: WithPseudoClass<BoxShadow>;
    padding?: ResponsiveValue<WithPseudoClass<SpacingValue>>;
    presets?: {
      id: string;
      name: string;
      value: Omit<ThemeSettings["button"], "presets">;
    }[];
  };
  link: {
    color?: WithPseudoClass<string>;
    typography?: TypographyType;
  };
  form: {
    label?: {
      color?: string;
      typography?: TypographyType;
    };
    input?: {
      typography?: TypographyType;
      color?: WithPseudoClass<string>;
      backgroundColor?: WithPseudoClass<string>;
      borderColor?: WithPseudoClass<string>;
      borderStyle?: WithPseudoClass<BorderStyle>;
      borderWidth?: WithPseudoClass<SpacingValue>;
      borderRadius?: WithPseudoClass<SpacingValue>;
      boxShadow?: WithPseudoClass<BoxShadow>;
      padding?: ResponsiveValue<WithPseudoClass<SpacingValue>>;
    };
  };
  customCss?: string;
};
