import {
  BorderFieldType,
  BoxShadow,
  LinkType,
  LocalizedValue,
  Media,
  ResponsiveValue,
  SpacingValue,
  TypographyType,
  UnitValue,
  WithPseudoClass,
} from "@dndbuilder.com/react";

export type CardSettingsType = {
  width?: ResponsiveValue<UnitValue>;
  height?: ResponsiveValue<UnitValue>;
  padding?: ResponsiveValue<SpacingValue>;
  margin?: ResponsiveValue<SpacingValue>;
  background?: {
    color?: WithPseudoClass<string>;
  };
  border?: BorderFieldType;
  boxShadow?: WithPseudoClass<BoxShadow>;

  image?: Media & {
    height?: ResponsiveValue<UnitValue>;
    width?: ResponsiveValue<UnitValue>;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
  };

  title?: {
    text?: LocalizedValue<string>;
    color?: WithPseudoClass<string>;
    typography?: TypographyType;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
    textAlign?: ResponsiveValue<string>;
  };
  description?: {
    content?: LocalizedValue<string>;
    color?: WithPseudoClass<string>;
    typography?: TypographyType;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
  };
  link?: LinkType & {
    text?: LocalizedValue<string>;
    color?: WithPseudoClass<string>;
    background?: {
      color?: WithPseudoClass<string>;
    };
    typography?: TypographyType;
    padding?: ResponsiveValue<SpacingValue>;
    margin?: ResponsiveValue<SpacingValue>;
  };
};
