import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import {
  TextAlignType,
  TextShadow,
  TypographyType,
  UnitValue,
  WithPseudoClass,
} from "@/types/style";

export type TextSettingsType = {
  text?: LocalizedValue<string>;
  alignment?: ResponsiveValue<TextAlignType>;
  textColor?: WithPseudoClass;
  typography?: TypographyType;
  dropCap?: ResponsiveValue<boolean>;
  columns?: ResponsiveValue;
  columnGap?: ResponsiveValue<UnitValue>;
  textShadow?: ResponsiveValue<WithPseudoClass<TextShadow>>;
};
