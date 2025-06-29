import { BlockGroup, BlockType } from "@/types/block";
import { BackgroundType, FlexDirection, Unit } from "@/types/style";
import { createBlockConfig } from "@/utils";
import {
  generateBgImageWithGradient,
  generateBoxShadow,
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateUnitValue,
} from "@/utils/style";
import { lazy } from "react";
import { LuContainer } from "react-icons/lu";
import { ContainerSettingsType } from "./types";

const ContainerConfig = createBlockConfig<ContainerSettingsType>({
  type: BlockType.CONTAINER,
  label: "Container",
  icon: LuContainer,
  // previewImage: containerPreview.src,
  component: lazy(() => import("./components/container.block")),
  previewComponent: lazy(() => import("./components/container.preview")),
  group: BlockGroup.BASIC,
  settings: {
    contentWidth: { desktop: "boxed", tablet: "boxed", mobile: "boxed" },
    flexDirection: {
      desktop: FlexDirection.COLUMN,
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
  advancedSettings: {
    padding: {
      desktop: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8,
        linked: true,
        unit: Unit.PX,
      },
    },
  },
  style: ({ settings, breakpoints }) => {
    return {
      width: "100%",
      overflow: settings.overflow?.desktop,
      ...generateResponsiveStyle(breakpoints, (breakpoint) => {
        return {
          width: generateUnitValue(settings.width?.[breakpoint]),
        };
      }),
      ["& > .content"]: {
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          const {
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom,
            left: paddingLeft,
          } = generateSpacingValue(settings.padding?.[breakpoint]);

          const {
            top: marginTop,
            right: marginRight,
            bottom: marginBottom,
            left: marginLeft,
          } = generateSpacingValue(settings.margin?.[breakpoint]);

          return {
            height: "100%",
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            flexDirection: settings.flexDirection?.[breakpoint],
            maxWidth: generateUnitValue(settings.maxWidth?.[breakpoint]),
            minHeight: generateUnitValue(settings.minHeight?.[breakpoint]),
            justifyContent: settings.justifyContent?.[breakpoint],
            alignItems: settings.alignItems?.[breakpoint],
            flexWrap: settings.wrap?.[breakpoint],
            rowGap:
              settings.gap?.[breakpoint]?.y !== undefined
                ? `${settings.gap?.[breakpoint]?.y}${settings.gap?.[breakpoint]?.unit}`
                : undefined,
            columnGap:
              settings.gap?.[breakpoint]?.x !== undefined
                ? `${settings.gap?.[breakpoint]?.x}${settings.gap?.[breakpoint]?.unit}`
                : undefined,
            backgroundImage: generateBgImageWithGradient({
              type: settings.background?.type?.default,
              image: settings.background?.image?.default?.url,
              angle: settings.background?.gradient?.angle?.default,
              color1: settings.background?.gradient?.color1?.default,
              color2: settings.background?.gradient?.color2?.default,
              location1: settings.background?.gradient?.location1?.default,
              location2: settings.background?.gradient?.location2?.default,
              position: settings.background?.gradient?.position?.default,
              gradientType: settings.background?.gradient?.type?.default,
            }),
            backgroundPosition: settings.background?.position?.[breakpoint]?.default,
            backgroundRepeat: settings.background?.repeat?.[breakpoint]?.default,
            backgroundSize: settings.background?.size?.[breakpoint]?.default,
            backgroundColor:
              settings.background?.type?.default === BackgroundType.CLASSIC
                ? settings.background.color?.default
                : null,
            backgroundAttachment: settings.background?.attachment?.default,
            alignContent: settings.alignContent?.[breakpoint],
            ...generatePseudoStyle((pseudoClass) => {
              const {
                top: borderTopLeftRadius,
                right: borderTopRightRadius,
                bottom: borderBottomRightRadius,
                left: borderBottomLeftRadius,
              } = generateSpacingValue(settings.border?.radius?.[pseudoClass]);

              const {
                top: borderTopWidth,
                right: borderRightWidth,
                bottom: borderBottomWidth,
                left: borderLeftWidth,
              } = generateSpacingValue(settings.border?.width?.[breakpoint]?.[pseudoClass]);

              const borderType = settings.border?.type?.[pseudoClass];
              return {
                borderTopLeftRadius,
                borderTopRightRadius,
                borderBottomRightRadius,
                borderBottomLeftRadius,

                borderTopWidth,
                borderRightWidth,
                borderBottomWidth,
                borderLeftWidth,
                borderStyle: Boolean(borderType) ? borderType : undefined,
                borderColor: settings.border?.color?.[pseudoClass],
                backgroundColor:
                  settings.background?.type?.[pseudoClass] === BackgroundType.CLASSIC
                    ? settings.background.color?.[pseudoClass]
                    : null,
                backgroundImage: generateBgImageWithGradient({
                  type: settings.background?.type?.[pseudoClass],
                  image: settings.background?.image?.[pseudoClass]?.url,
                  angle: settings.background?.gradient?.angle?.[pseudoClass],
                  color1: settings.background?.gradient?.color1?.[pseudoClass],
                  color2: settings.background?.gradient?.color2?.[pseudoClass],
                  location1: settings.background?.gradient?.location1?.[pseudoClass],
                  location2: settings.background?.gradient?.location2?.[pseudoClass],
                  position: settings.background?.gradient?.position?.[pseudoClass],
                  gradientType: settings.background?.gradient?.type?.[pseudoClass],
                }),
                backgroundPosition: settings.background?.position?.[breakpoint]?.[pseudoClass],
                backgroundAttachment: settings.background?.attachment?.[pseudoClass],
                backgroundRepeat: settings.background?.repeat?.[breakpoint]?.[pseudoClass],
                backgroundSize: settings.background?.size?.[breakpoint]?.[pseudoClass],
              };
            }),
          };
        }),
        ...generatePseudoStyle((pseudoClass) => {
          return {
            boxShadow: generateBoxShadow(settings.boxShadow?.[pseudoClass]),
          };
        }),
      },
    };
  },
  controls: [
    {
      label: "Layout",
      component: lazy(() => import("./components/controls/container-layout.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/controls/container-style.control")),
    },
  ],
});

export default ContainerConfig;
