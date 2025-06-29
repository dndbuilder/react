import { BlockGroup, BlockType } from "@/types/block";
import { BackgroundType, SizeType, TextAlignType, Unit } from "@/types/style";
import { createBlockConfig } from "@/utils";
import {
  generateBgGradient,
  generateBorderRadius,
  generateBorderWidth,
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTextShadow,
  generateTypography,
} from "@/utils/style";
import { clean } from "deep-cleaner";
import deepMerge from "deepmerge";
import { lazy } from "react";
import { MdSmartButton } from "react-icons/md";
import { ButtonSettingsType } from "./types";
import { generatePresetStyle } from "./utils";

const ButtonConfig = createBlockConfig<ButtonSettingsType>({
  type: BlockType.BUTTON,
  label: "Button",
  icon: MdSmartButton,
  component: lazy(() => import("./components/button.block")),
  group: BlockGroup.BASIC,
  settings: {
    text: {
      en: "Click Here",
    },
    size: {
      desktop: SizeType.DEFAULT,
      tablet: SizeType.DEFAULT,
      mobile: SizeType.DEFAULT,
    },

    background: {
      gradient: {
        color1: {
          default: "var(--accent-color)",
          hover: "var(--accent-color)",
        },
        location1: {
          default: {
            unit: Unit.PERCENTAGE,
            value: 0,
          },
          hover: {
            unit: Unit.PERCENTAGE,
            value: 0,
          },
        },
        location2: {
          default: {
            unit: Unit.PERCENTAGE,
            value: 100,
          },
          hover: {
            unit: Unit.PERCENTAGE,
            value: 100,
          },
        },
        angle: {
          default: {
            unit: Unit.DEG,
            value: 180,
          },
          hover: {
            unit: Unit.DEG,
            value: 180,
          },
        },
        type: {
          default: "linear",
          hover: "linear",
        },
        position: {
          default: "center center",
          hover: "center center",
        },
      },
      transitionDuration: 200,
    },
  },
  style: ({ settings, themeSettings, breakpoints }) => {
    const styles = {
      ...generateResponsiveStyle(breakpoints, (breakpoint) => {
        const align = settings.alignment?.[breakpoint];
        const {
          top: paddingTop,
          right: paddingRight,
          bottom: paddingBottom,
          left: paddingLeft,
        } = generateSpacingValue(settings.padding?.[breakpoint]);

        return {
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          ...generateBorderRadius(settings.border?.radius?.[breakpoint]?.default),
          ...generateBorderWidth(settings.border?.width?.[breakpoint]?.default),
          width: align === TextAlignType.JUSTIFY ? "100%" : null,
        };
      }),
      ...generateTypography(breakpoints, settings.typography),
      borderStyle: Boolean(settings.border?.style?.desktop?.default)
        ? settings.border?.style?.desktop?.default
        : undefined,
      borderColor: settings.border?.color?.desktop?.default,
      color: settings.textColor?.default,
      display: "inline-block",
      textShadow: generateTextShadow(settings.textShadow?.desktop?.default),
      backgroundImage: generateBgGradient({
        type: settings.background?.type?.default,
        color1: settings.background?.gradient?.color1?.default,
        color2: settings.background?.gradient?.color2?.default,
        location1: settings.background?.gradient?.location1?.default,
        location2: settings.background?.gradient?.location2?.default,
        angle: settings.background?.gradient?.angle?.default,
        gradientType: settings.background?.gradient?.type?.default,
        position: settings.background?.gradient?.position?.default,
      }),

      ...generatePseudoStyle((pseudoClass) => ({
        color: settings.textColor?.[pseudoClass],
        backgroundColor:
          settings.background?.type?.[pseudoClass] === BackgroundType.CLASSIC
            ? settings.background?.color?.[pseudoClass]
            : null,
        backgroundImage: generateBgGradient({
          type: settings.background?.type?.[pseudoClass],
          color1: settings.background?.gradient?.color1?.[pseudoClass],
          color2: settings.background?.gradient?.color2?.[pseudoClass],
          location1: settings.background?.gradient?.location1?.[pseudoClass],
          location2: settings.background?.gradient?.location2?.[pseudoClass],
          angle: settings.background?.gradient?.angle?.[pseudoClass],
          gradientType: settings.background?.gradient?.type?.[pseudoClass],
          position: settings.background?.gradient?.position?.[pseudoClass],
        }),
      })),
    };

    const preset = themeSettings?.button?.presets?.find(
      (preset) => preset.id === settings.presetId
    );

    if (preset) {
      const presetStyles = generatePresetStyle(preset, breakpoints);

      const mergedStyles = deepMerge(clean(presetStyles), clean(styles));

      return {
        ["& .btn"]: mergedStyles,
      };
    }

    return {
      display: "inline-block",
      "& .button-wrapper": {
        width: "100%",
        display: "flex",
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          const align = settings.alignment?.[breakpoint];
          return {
            justifyContent:
              align === "left"
                ? "flex-start"
                : align === "right"
                  ? "flex-end"
                  : align === "center"
                    ? "center"
                    : null,
          };
        }),

        "& .btn": styles,
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/button-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/button-style.control")),
    },
  ],
});

export default ButtonConfig;
