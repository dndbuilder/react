import { LinkType } from "@/types/block";
import { BlockMeta } from "@/types/block";
import { ResponsiveValue } from "@/types/responsive";
import { LocalizedValue } from "@/types";
import {
  BackgroundFieldType,
  BoxShadow,
  SizeType,
  SpacingValue,
  TypographyType,
  UnitValue,
  WithPseudoClass,
} from "@/types/style";

export enum SliderPresets {
  Preset1 = "preset-1",
  Preset2 = "preset-2",
  Preset3 = "preset-3",
  Preset4 = "preset-4",
}

export type SlideitemType = {
  id: string;
  title?: LocalizedValue<string>;
  description?: LocalizedValue<string>;
  button?: {
    text?: LocalizedValue<string>;
    link?: LinkType;
  };
  background?: BackgroundFieldType;
  horizontalPosition?: ResponsiveValue<"start" | "center" | "end">;
  verticalPosition?: ResponsiveValue<"start" | "center" | "end">;
  textAlign?: ResponsiveValue<"left" | "center" | "right">;
  contentColor?: WithPseudoClass<string>;
  showBgOverlay?: ResponsiveValue<boolean>;
  overlayColor?: WithPseudoClass<string>;
  blendMode?: ResponsiveValue<string>;
};

export type SliderNavigationType = {
  arrowSize?: ResponsiveValue<UnitValue>;
  arrowColor?: ResponsiveValue<WithPseudoClass<string>>;
  arrowBackgroudColor?: ResponsiveValue<WithPseudoClass<string>>;
  arrowRadius?: ResponsiveValue<WithPseudoClass<SpacingValue>>;
  arrowBoxShadow?: WithPseudoClass<BoxShadow>;
  arrowPlacement?: ResponsiveValue<"inside" | "outside">;
  arrowWidth?: ResponsiveValue<UnitValue>;
  arrowHeight?: ResponsiveValue<UnitValue>;
  leftArrowPosition?: ResponsiveValue<SpacingValue>;
  rightArrowPosition?: ResponsiveValue<SpacingValue>;

  dotSize?: ResponsiveValue<UnitValue>; // Not used (use width and height instead)

  dotWidth?: ResponsiveValue<UnitValue>;
  dotHeight?: ResponsiveValue<UnitValue>;
  activeDotWidth?: ResponsiveValue<UnitValue>;
  activeDotHeight?: ResponsiveValue<UnitValue>;
  dotRadius?: ResponsiveValue<UnitValue>;
  dotGap?: ResponsiveValue<UnitValue>;
  dotColor?: ResponsiveValue<WithPseudoClass<string>>;
  dotActiveColor?: ResponsiveValue<WithPseudoClass<string>>;
  dotPlacement?: ResponsiveValue<"inside" | "outside">;
  dotsPosition?: ResponsiveValue<SpacingValue>;
};

export type SliderSettingsType = {
  preset?: ResponsiveValue<SliderPresets>;
  showDots?: ResponsiveValue<boolean>;
  showArrows?: ResponsiveValue<boolean>;
  autoPlay?: ResponsiveValue<boolean>;
  infinite?: ResponsiveValue<boolean>;
  pauseOnHover?: ResponsiveValue<boolean>;
  autoplaySpeed?: ResponsiveValue<number>;
  slides?: Array<SlideitemType>;
  height?: ResponsiveValue<UnitValue>;
  contentWidth?: ResponsiveValue<UnitValue>;
  sliderPadding?: ResponsiveValue<SpacingValue>;
  horizontalPosition?: ResponsiveValue<"start" | "center" | "end">;
  verticalPosition?: ResponsiveValue<"start" | "center" | "end">;
  textAlign?: ResponsiveValue<"left" | "center" | "right">;
  title?: {
    marginBottom?: ResponsiveValue<UnitValue>;
    color?: ResponsiveValue<WithPseudoClass<string>>;
    typography?: TypographyType;
  };
  button?: {
    size?: ResponsiveValue<SizeType>;
    border: {
      width?: UnitValue;
      radius?: UnitValue;
      color?: WithPseudoClass;
    };

    typography?: TypographyType;
    textColor?: WithPseudoClass;

    background: BackgroundFieldType;
  };
  description?: {
    marginBottom?: ResponsiveValue<UnitValue>;
    color?: ResponsiveValue<WithPseudoClass<string>>;
    typography?: TypographyType;
  };
  navigation?: SliderNavigationType;
};

export type SliderSettingsProps = {
  settings: SliderSettingsType;
  meta?: BlockMeta;
};
