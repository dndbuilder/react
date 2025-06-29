import { BlockGroup, BlockType } from "@/types/block";
import { createBlockConfig } from "@/utils";
import {
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypography,
  generateUnitValue,
} from "@/utils/style";
import { lazy } from "react";
import ProgressBarIcon from "./components/progress-bar-icon";
import ProgressBarStyleControl from "./components/progress-bar-style.control";
import { ProgressBarSettingsType } from "./types";

const ProgressBarConfig = createBlockConfig<ProgressBarSettingsType>({
  type: BlockType.PROGRESS_BAR,
  label: "Progress Bar",
  icon: ProgressBarIcon,
  component: lazy(() => import("./components/progress-bar.block")),
  group: BlockGroup.ADVANCED,
  settings: {
    title: {
      content: {
        en: "Progress Bar",
      },
      show: {
        desktop: true,
      },
    },
    percentage: {
      show: {
        desktop: true,
      },
      value: 50,
    },
  },
  style: ({ settings, breakpoints }) => {
    return {
      ".progress-bar-wrapper": {
        ".progress-bar-title": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: marginTop,
              right: marginRight,
              bottom: marginBottom,
              left: marginLeft,
            } = generateSpacingValue(settings?.title?.margin?.[breakpoint]);

            const {
              top: paddingTop,
              right: paddingRight,
              bottom: paddingBottom,
              left: paddingLeft,
            } = generateSpacingValue(settings?.title?.padding?.[breakpoint]);

            return {
              display: settings?.title?.show?.[breakpoint] ? "inline-block" : "none",
              marginTop,
              marginRight,
              marginBottom,
              marginLeft,
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft,
            };
          }),

          ...generateTypography(breakpoints, settings?.title?.typography),

          ...generatePseudoStyle((pseudoClass) => ({
            color: settings?.title?.color?.[pseudoClass],
            backgroundColor: settings?.title?.background?.color?.[pseudoClass],
          })),
        },

        ".progress-bar": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: marginTop,
              right: marginRight,
              bottom: marginBottom,
              left: marginLeft,
            } = generateSpacingValue(settings?.progressBar?.margin?.[breakpoint]);

            const {
              top: paddingTop,
              right: paddingRight,
              bottom: paddingBottom,
              left: paddingLeft,
            } = generateSpacingValue(settings?.progressBar?.padding?.[breakpoint]);

            return {
              marginTop,
              marginRight,
              marginBottom,
              marginLeft,
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft,
              height: generateUnitValue(settings?.progressBar?.height?.[breakpoint]),
              maxWidth: generateUnitValue(settings?.progressBar?.maxWidth?.[breakpoint]),
              ...generatePseudoStyle((pseudoClass) => {
                const {
                  top: borderTopWidth,
                  right: borderRightWidth,
                  bottom: borderBottomWidth,
                  left: borderLeftWidth,
                } = generateSpacingValue(
                  settings?.progressBar?.border?.width?.[breakpoint]?.[pseudoClass]
                );

                return {
                  borderTopWidth,
                  borderRightWidth,
                  borderBottomWidth,
                  borderLeftWidth,
                };
              }),
            };
          }),

          ...generatePseudoStyle((pseudoClass) => {
            const {
              top: borderTopLeftRadius,
              right: borderTopRightRadius,
              bottom: borderBottomRightRadius,
              left: borderBottomLeftRadius,
            } = generateSpacingValue(settings?.progressBar?.border?.radius?.[pseudoClass]);
            const borderType = settings.progressBar?.border?.type?.[pseudoClass];

            return {
              backgroundColor: settings?.progressBar?.background?.color?.[pseudoClass],
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderStyle: Boolean(borderType) ? borderType : undefined,
              borderColor: settings?.progressBar?.border?.color?.[pseudoClass],
            };
          }),
        },

        ".progress-bar-fill": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: marginTop,
              right: marginRight,
              bottom: marginBottom,
              left: marginLeft,
            } = generateSpacingValue(settings?.progressFill?.margin?.[breakpoint]);

            const {
              top: paddingTop,
              right: paddingRight,
              bottom: paddingBottom,
              left: paddingLeft,
            } = generateSpacingValue(settings?.progressFill?.padding?.[breakpoint]);
            return {
              marginTop,
              marginRight,
              marginBottom,
              marginLeft,
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft,
              ...generatePseudoStyle((pseudoClass) => {
                const {
                  top: borderTopWidth,
                  right: borderRightWidth,
                  bottom: borderBottomWidth,
                  left: borderLeftWidth,
                } = generateSpacingValue(
                  settings?.progressFill?.border?.width?.[breakpoint]?.[pseudoClass]
                );

                return {
                  borderTopWidth,
                  borderRightWidth,
                  borderBottomWidth,
                  borderLeftWidth,
                };
              }),
            };
          }),

          ...generatePseudoStyle((pseudo) => {
            const {
              top: borderTopLeftRadius,
              right: borderTopRightRadius,
              bottom: borderBottomRightRadius,
              left: borderBottomLeftRadius,
            } = generateSpacingValue(settings?.progressFill?.border?.radius?.[pseudo]);

            const borderType = settings.progressFill?.border?.type?.[pseudo];

            return {
              backgroundColor: settings?.progressFill?.background?.color?.[pseudo],
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderStyle: Boolean(borderType) ? borderType : undefined,
              borderColor: settings?.progressFill?.border?.color?.[pseudo],
            };
          }),
        },

        ".progress-bar-percentage": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: marginTop,
              right: marginRight,
              bottom: marginBottom,
              left: marginLeft,
            } = generateSpacingValue(settings?.percentage?.margin?.[breakpoint]);

            const {
              top: paddingTop,
              right: paddingRight,
              bottom: paddingBottom,
              left: paddingLeft,
            } = generateSpacingValue(settings?.percentage?.padding?.[breakpoint]);

            return {
              marginTop,
              marginRight,
              marginBottom,
              marginLeft,
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft,
              display: settings?.percentage?.show?.[breakpoint] ? "flex" : "none",
              justifyContent: settings?.percentage?.alignment?.[breakpoint] || "center",
            };
          }),
          ...generateTypography(breakpoints, settings?.percentage?.typography),
          ...generatePseudoStyle((pseudoClass) => ({
            color: settings?.percentage?.color?.[pseudoClass],
            backgroundColor: settings?.percentage?.background?.color?.[pseudoClass],
          })),
        },
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/progress-bar-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/progress-bar-style.control")),
    },
  ],
});

export default ProgressBarConfig;
