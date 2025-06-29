import { LinkType } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import {
  TextAlignType,
  SizeType,
  TypographyType,
  TextShadow,
  WithPseudoClass,
  BackgroundType,
  UnitValue,
  SpacingValue,
} from "@/types/style";

export type ButtonSettingsType = {
  text?: LocalizedValue<string>;
  presetId?: string;
  link?: LinkType;
  alignment?: ResponsiveValue<TextAlignType>;
  size?: ResponsiveValue<SizeType>;
  icon?: string;
  iconSpacing?: ResponsiveValue<number>;
  buttonId?: string;
  typography?: TypographyType;
  textShadow?: ResponsiveValue<WithPseudoClass<TextShadow>>;
  textColor?: WithPseudoClass;
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

  border?: {
    width?: ResponsiveValue<WithPseudoClass<SpacingValue>>;
    style?: ResponsiveValue<WithPseudoClass<string>>;
    color?: ResponsiveValue<WithPseudoClass<string>>;
    radius?: ResponsiveValue<WithPseudoClass<SpacingValue>>;
  };
  padding?: ResponsiveValue<SpacingValue>;
};
