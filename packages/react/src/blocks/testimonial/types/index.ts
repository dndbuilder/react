import { SliderNavigationType, SliderPresets as SliderPresets } from "@/blocks/slider/types";
import { BlockMeta } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";

import {
  BorderFieldType,
  BoxShadow,
  SpacingValue,
  TypographyType,
  UnitValue,
  WithPseudoClass,
} from "@/types/style";
import { Media } from "@/types/media";

export type TestimonialItemType = {
  id: string;
  content: LocalizedValue<string>;
  image?: Media;
  name: LocalizedValue<string>;
  position?: LocalizedValue<string>;
  rating?: number;
  showRating?: boolean;
};

export type TestimonialSettingsType = {
  preset?: ResponsiveValue<TestimonialPresets>;
  layout?: ResponsiveValue<"grid" | "slider">;
  columns?: ResponsiveValue<number>;
  rows?: ResponsiveValue<number>;
  columnGap?: ResponsiveValue<UnitValue>;
  rowGap?: ResponsiveValue<UnitValue>;
  testimonials: TestimonialItemType[];
  card?: {
    alignment?: ResponsiveValue<"left" | "center" | "right">;
    backgroundColor?: ResponsiveValue<WithPseudoClass<string>>;
    padding?: ResponsiveValue<SpacingValue>;
    border?: BorderFieldType;
    boxShadow?: WithPseudoClass<BoxShadow>;
  };
  slider?: {
    height?: ResponsiveValue<UnitValue>;
    showDots?: ResponsiveValue<boolean>;
    showArrows?: ResponsiveValue<boolean>;
    autoPlay?: ResponsiveValue<boolean>;
    infinite?: ResponsiveValue<boolean>;
    pauseOnHover?: ResponsiveValue<boolean>;
    autoplaySpeed?: ResponsiveValue<number>;
    preset?: ResponsiveValue<SliderPresets>;
    navigation?: SliderNavigationType;
  };
  review?: {
    color?: WithPseudoClass<string>;
    typography?: TypographyType;
  };
  image?: {
    size?: ResponsiveValue<UnitValue>;
    gap?: ResponsiveValue<UnitValue>;
  };
};

export enum TestimonialPresets {
  Preset1 = "preset-1",
  Preset2 = "preset-2",
}

export type PresetPropsType = {
  data: TestimonialItemType;
  settings: TestimonialSettingsType;
  meta?: BlockMeta;
};
