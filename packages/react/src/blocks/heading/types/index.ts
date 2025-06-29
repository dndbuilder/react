import { LinkType } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import {
  SizeType,
  SpacingValue,
  TextAlignType,
  TextShadow,
  TextStroke,
  TypographyType,
  WithPseudoClass,
} from "@/types/style";

export type HeadingSettingsType = {
  title?: LocalizedValue<string>;
  link?: LinkType;
  alignment?: ResponsiveValue<TextAlignType>;
  size?: ResponsiveValue<SizeType>;
  htmlTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  textColor?: WithPseudoClass<string>;
  backgroundColor?: WithPseudoClass<string>;
  blendMode?: ResponsiveValue<string>;
  typography?: TypographyType;
  textStroke?: TextStroke;
  textShadow?: TextShadow;
  padding?: ResponsiveValue<SpacingValue>;
  margin?: ResponsiveValue<SpacingValue>;
};
