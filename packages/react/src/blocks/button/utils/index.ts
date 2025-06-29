import { ThemeSettings } from "@/types";
import { BreakpointConfig } from "@/types/responsive";
import { SizeType, SpacingValue } from "@/types/style";
import {
  generatePseudoStyle,
  generateResponsiveStyle,
  generateTypographyStyles,
} from "@/utils/style";
import { clean } from "deep-cleaner";
import { Styles } from "free-style";
import { cloneDeep } from "lodash";

// Generate Button Size
export function generateSize({
  size,
  padding,
}: {
  size: SizeType | undefined;
  padding?: SpacingValue | undefined;
}) {
  switch (size) {
    case SizeType.SM:
      return {
        paddingTop: padding?.top ? `${padding.top}${padding.unit}` : "0.25rem",
        paddingBottom: padding?.bottom ? `${padding.bottom}${padding.unit}` : "0.25rem",
        paddingLeft: padding?.left ? `${padding.left}${padding.unit}` : "1rem",
        paddingRight: padding?.right ? `${padding.right}${padding.unit}` : "1rem",
      };
    case SizeType.MD:
      return {
        paddingTop: padding?.top ? `${padding.top}${padding.unit}` : "0.5rem",
        paddingBottom: padding?.bottom ? `${padding.bottom}${padding.unit}` : "0.5rem",
        paddingLeft: padding?.left ? `${padding.left}${padding.unit}` : "1.5rem",
        paddingRight: padding?.right ? `${padding.right}${padding.unit}` : "1.5rem",
      };

    case SizeType.LG:
      return {
        paddingTop: padding?.top ? `${padding.top}${padding.unit}` : "0.75rem",
        paddingBottom: padding?.bottom ? `${padding.bottom}${padding.unit}` : "0.75rem",
        paddingLeft: padding?.left ? `${padding.left}${padding.unit}` : "1.5rem",
        paddingRight: padding?.right ? `${padding.right}${padding.unit}` : "1.5rem",
      };

    case SizeType.XL:
      return {
        paddingTop: padding?.top ? `${padding.top}${padding.unit}` : "1rem",
        paddingBottom: padding?.bottom ? `${padding.bottom}${padding.unit}` : "1rem",
        paddingLeft: padding?.left ? `${padding.left}${padding.unit}` : "2rem",
        paddingRight: padding?.right ? `${padding.right}${padding.unit}` : "2rem",
      };

    case SizeType.XXL:
      return {
        paddingTop: padding?.top ? `${padding.top}${padding.unit}` : "1.5rem",
        paddingBottom: padding?.bottom ? `${padding.bottom}${padding.unit}` : "1.5rem",
        paddingLeft: padding?.left ? `${padding.left}${padding.unit}` : "3rem",
        paddingRight: padding?.right ? `${padding.right}${padding.unit}` : "3rem",
      };
    default:
      return {
        paddingTop: padding?.top ? `${padding.top}${padding.unit}` : "0.5rem",
        paddingBottom: padding?.bottom ? `${padding.bottom}${padding.unit}` : "0.5rem",
        paddingLeft: padding?.left ? `${padding.left}${padding.unit}` : "1rem",
        paddingRight: padding?.right ? `${padding.right}${padding.unit}` : "1rem",
      };
  }
}

// Generate Button Preset Style
export function generatePresetStyle(
  preset: {
    id: string;
    name: string;
    value: Omit<ThemeSettings["button"], "presets">;
  },
  breakpoints: BreakpointConfig[]
) {
  const styles: Styles = {
    ...generateTypographyStyles(
      `button-preset-${preset.id}`,
      preset.value.typography ?? {},
      breakpoints
    ),
    ...generatePseudoStyle((pseudoClass) => ({
      color:
        preset.value.color?.[pseudoClass] &&
        `var(--button-preset-${preset.id}-${pseudoClass}-color)`,
      backgroundColor:
        preset.value.background?.color?.[pseudoClass] &&
        `var(--button-preset-${preset.id}-${pseudoClass}-background-color)`,
      borderColor:
        preset.value.borderColor?.[pseudoClass] &&
        `var(--button-preset-${preset.id}-${pseudoClass}-border-color)`,
      borderStyle: preset.value.borderStyle?.[pseudoClass]
        ? `var(--button-preset-${preset.id}-${pseudoClass}-border-style)`
        : undefined,
      borderWidth:
        preset.value.borderWidth?.[pseudoClass] &&
        `var(--button-preset-${preset.id}-${pseudoClass}-border-width)`,
      borderRadius:
        preset.value.borderRadius?.[pseudoClass] &&
        `var(--button-preset-${preset.id}-${pseudoClass}-border-radius)`,
      boxShadow:
        preset.value.boxShadow?.[pseudoClass] &&
        `var(--button-preset-${preset.id}-${pseudoClass}-box-shadow)`,
    })),
    ...generateResponsiveStyle(breakpoints, (breakpoint) => ({
      ...generatePseudoStyle((pseudoClass) => ({
        padding:
          preset.value.padding?.[breakpoint]?.[pseudoClass] &&
          `var(--button-preset${preset.id}-${pseudoClass}-${breakpoint}-padding)`,
      })),
    })),
  };

  return clean(cloneDeep(styles)) as Styles;
}
