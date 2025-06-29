import { BlockGroup, BlockType } from "@/types/block";
import { createBlockConfig } from "@/utils";
import {
  generateBoxShadow,
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypography,
  generateUnitValue,
} from "@/utils/style";
import { lazy } from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { DrawerSettingsType } from "./types";

const DrawerConfig = createBlockConfig<DrawerSettingsType>({
  type: BlockType.DRAWER,
  label: "Drawer",
  icon: GoSidebarCollapse,
  component: lazy(() => import("./components/drawer.block")),
  previewComponent: lazy(() => import("./components/drawer.preview")),
  group: BlockGroup.BASIC,
  settings: {
    trigger: {
      icon: {
        iconSet: "ant-design",
        iconName: "menu-outlined",
        show: { desktop: true },
      },
      text: {
        content: { en: "Drawer" },
        show: { desktop: true },
      },
    },
    content: {
      direction: { desktop: "left" },
    },
  },
  style: ({ settings, breakpoints }) => {
    return {
      "& .drawer-trigger": {
        ...generateTypography(breakpoints, settings?.trigger?.typography),

        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          const {
            top: marginTop,
            right: marginRight,
            bottom: marginBottom,
            left: marginLeft,
          } = generateSpacingValue(settings?.trigger?.margin?.[breakpoint]);

          const {
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom,
            left: paddingLeft,
          } = generateSpacingValue(settings?.trigger?.padding?.[breakpoint]);

          return {
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            width: generateUnitValue(settings?.trigger?.width?.[breakpoint]),
            height: generateUnitValue(settings?.trigger?.height?.[breakpoint]),
            justifyContent: settings?.trigger?.align?.[breakpoint],
            gap: generateUnitValue(settings?.trigger?.spacing?.[breakpoint]),
            ...generatePseudoStyle((pseudoClass) => {
              const {
                top: borderTopWidth,
                right: borderRightWidth,
                bottom: borderBottomWidth,
                left: borderLeftWidth,
              } = generateSpacingValue(
                settings?.trigger?.border?.width?.[breakpoint]?.[pseudoClass]
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
          } = generateSpacingValue(settings?.trigger?.border?.radius?.[pseudo]);

          const borderType = settings.trigger?.border?.type?.[pseudo];
          return {
            color: settings?.trigger?.color?.[pseudo],
            backgroundColor: settings?.trigger?.background?.color?.[pseudo],
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
            borderStyle: Boolean(borderType) ? borderType : undefined,
            borderColor: settings?.trigger?.border?.color?.[pseudo],
          };
        }),

        [".drawer-trigger-text"]: {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            return {
              display: settings?.trigger?.text?.show?.[breakpoint] ? "inline-block" : "none",
              order: settings?.trigger?.text?.order?.[breakpoint],
            };
          }),
        },
        [".drawer-trigger-icon"]: {
          color: settings?.trigger?.icon?.color?.default,
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            return {
              display: settings?.trigger?.icon?.show?.[breakpoint] ? "inline-block" : "none",
              order: settings?.trigger?.icon?.order?.[breakpoint],
              fontSize: generateUnitValue(settings?.trigger?.icon?.size?.[breakpoint]?.default),
            };
          }),
        },
      },

      ["& .drawer-trigger:hover .drawer-trigger-icon"]: {
        color: settings?.trigger?.icon?.color?.hover,
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          return {
            fontSize: generateUnitValue(settings?.trigger?.icon?.size?.[breakpoint]?.hover),
          };
        }),
      },

      ["& .drawer-trigger:focus .drawer-trigger-icon"]: {
        color: settings?.trigger?.icon?.color?.focus,
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          return {
            fontSize: generateUnitValue(settings?.trigger?.icon?.size?.[breakpoint]?.hover),
          };
        }),
      },

      "& .drawer-content": {
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          const {
            top: marginTop,
            right: marginRight,
            bottom: marginBottom,
            left: marginLeft,
          } = generateSpacingValue(settings?.content?.margin?.[breakpoint]);

          const {
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom,
            left: paddingLeft,
          } = generateSpacingValue(settings?.content?.padding?.[breakpoint]);

          return {
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            width: generateUnitValue(settings?.content?.width?.[breakpoint]),
            height: generateUnitValue(settings?.content?.height?.[breakpoint]),
            ...generatePseudoStyle((pseudoClass) => {
              const {
                top: borderTopWidth,
                right: borderRightWidth,
                bottom: borderBottomWidth,
                left: borderLeftWidth,
              } = generateSpacingValue(
                settings?.content?.border?.width?.[breakpoint]?.[pseudoClass]
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
          } = generateSpacingValue(settings?.content?.border?.radius?.[pseudo]);

          const borderType = settings.content?.border?.type?.[pseudo];
          return {
            backgroundColor: settings?.content?.background?.color?.[pseudo],
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
            borderStyle: Boolean(borderType) ? borderType : undefined,
            borderColor: settings?.content?.border?.color?.[pseudo],
            boxShadow: generateBoxShadow(settings?.content?.boxShadow?.[pseudo]),
          };
        }),
      },
      "& .drawer-backdrop": {
        ...generatePseudoStyle((pseudo) => {
          return {
            backgroundColor: settings?.content?.backdrop?.color?.[pseudo],
          };
        }),
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/drawer-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/drawer-style.control")),
    },
  ],
});

export default DrawerConfig;
