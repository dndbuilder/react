import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import { SpacingValue, TypographyType, UnitValue, WithPseudoClass } from "@/types/style";

export type FaqItem = {
  id: string;
  title?: {
    text?: LocalizedValue<string>;
    color?: WithPseudoClass<string>;
    typography?: TypographyType;
    spacing?: ResponsiveValue<UnitValue>;
  };
  description?: {
    text?: LocalizedValue<string>;
    color?: WithPseudoClass<string>;
    typography?: TypographyType;
  };
};

export type FaqSettingsType = {
  items?: FaqItem[];
  isAccordion?: boolean;
  isOpenFirstItem?: boolean;
  item?: {
    gap?: UnitValue;
    border?: {
      type?: string;
      radius?: SpacingValue;
      width?: ResponsiveValue<SpacingValue>;
      color?: string;
      transitionDuration?: number;
    };
    padding?: ResponsiveValue<SpacingValue>;
  };
  title?: {
    color?: WithPseudoClass<string>;
    typography?: TypographyType;
    spacing?: ResponsiveValue<UnitValue>;
  };
  description?: {
    color?: WithPseudoClass<string>;
    typography?: TypographyType;
  };
};
