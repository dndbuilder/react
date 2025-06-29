import { LinkType } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import { SpacingValue, TextAlignType, TypographyType, WithPseudoClass } from "@/types/style";

export type LinkSettingsType = {
  text?: LocalizedValue<string>;
  link?: LinkType;
  alignment?: ResponsiveValue<TextAlignType>;
  padding?: ResponsiveValue<SpacingValue>;
  margin?: ResponsiveValue<SpacingValue>;
  color?: WithPseudoClass<string>;
  transitionDuration?: number;
  typography?: TypographyType;
};
