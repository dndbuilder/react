import { LinkType } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import { TextAlignType, TypographyType, UnitValue, WithPseudoClass } from "@/types/style";
import { Media } from "@/types/media";

export type BannerSettingsType = {
  image?: {
    media?: Media;
    fit?: ResponsiveValue<WithPseudoClass<"auto" | "cover" | "contain">>;
  };
  overlayColor?: ResponsiveValue<WithPseudoClass<string>>;
  title?: {
    text?: LocalizedValue<string>;
    alignment?: ResponsiveValue<TextAlignType>;
    color?: ResponsiveValue<WithPseudoClass<string>>;
    typography?: TypographyType;
    spacing?: ResponsiveValue<UnitValue>;
  };
  subTitle?: {
    text?: LocalizedValue<string>;
    alignment?: ResponsiveValue<TextAlignType>;
    color?: ResponsiveValue<WithPseudoClass<string>>;
    typography?: TypographyType;
    spacing?: ResponsiveValue<UnitValue>;
  };
  description?: {
    text?: LocalizedValue<string>;
    alignment?: ResponsiveValue<TextAlignType>;
    color?: ResponsiveValue<WithPseudoClass<string>>;
    typography?: TypographyType;
    spacing?: ResponsiveValue<UnitValue>;
  };
  button?: {
    text?: LocalizedValue<string>;
    alignment?: ResponsiveValue<TextAlignType>;
    color?: ResponsiveValue<WithPseudoClass<string>>;
    backgroundColor?: WithPseudoClass<string>;
    transitionDuration?: number;
    typography?: TypographyType;
    link?: LinkType;
  };
  card?: {
    padding?: ResponsiveValue<UnitValue>;
  };
};
