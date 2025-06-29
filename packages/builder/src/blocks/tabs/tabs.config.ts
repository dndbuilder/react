import { BlockGroup, BlockType } from "@/types/block";
import { createBlockConfig, createId } from "@/utils";
import {
  generateBoxShadow,
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypography,
  generateUnitValue,
} from "@/utils/style";
import { lazy } from "react";
import { TfiLayoutTabWindow } from "react-icons/tfi";
import TabsToolbar from "./components/tabs-toolbar";
import { TabsSettingsType } from "./types";

const TabsConfig = createBlockConfig<TabsSettingsType>({
  type: BlockType.TABS,
  label: "Tabs",
  group: BlockGroup.BASIC,
  component: lazy(() => import("./components/tabs.block")),
  previewComponent: lazy(() => import("./components/tabs.preview")),
  settings: {
    tabs: [
      {
        id: createId(),
        label: {
          en: "Tab 1",
        },
        children: [],
      },
      {
        id: createId(),
        label: {
          en: "Tab 2",
        },
        children: [],
      },
    ],
    list: {
      orientation: {
        desktop: "horizontal",
        tablet: "horizontal",
        mobile: "horizontal",
      },
      alignment: {
        desktop: "flex-start",
        tablet: "flex-start",
        mobile: "flex-start",
      },
    },
  },
  icon: TfiLayoutTabWindow,
  style: ({ settings, breakpoints }) => {
    return {
      ["& .tabs"]: {
        display: "flex",
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          const orientation = settings.list?.orientation?.[breakpoint] ?? "horizontal";

          return {
            flexDirection: orientation === "horizontal" ? "column" : "row",
          };
        }),

        [".tab-list"]: {
          display: "flex",
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const orientation = settings.list?.orientation?.[breakpoint] ?? "horizontal";

            const {
              top: marginTop,
              bottom: marginBottom,
              left: marginLeft,
              right: marginRight,
            } = generateSpacingValue(settings.list?.margin?.[breakpoint]);

            const {
              top: paddingTop,
              bottom: paddingBottom,
              left: paddingLeft,
              right: paddingRight,
            } = generateSpacingValue(settings.list?.padding?.[breakpoint]);

            return {
              width: orientation === "horizontal" ? "100%" : "auto",
              flexDirection: orientation === "horizontal" ? "row" : "column",
              justifyContent: settings.list?.alignment?.[breakpoint] ?? "flex-start",
              gap: generateUnitValue(settings.list?.spacing?.[breakpoint]),
              marginTop,
              marginBottom,
              marginLeft,
              marginRight,
              paddingTop,
              paddingBottom,
              paddingLeft,
              paddingRight,
            };
          }),
        },

        [".tab-button"]: {
          display: "flex",
          alignItems: "center",
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: marginTop,
              bottom: marginBottom,
              left: marginLeft,
              right: marginRight,
            } = generateSpacingValue(settings.button?.margin?.[breakpoint]);

            const {
              top: paddingTop,
              bottom: paddingBottom,
              left: paddingLeft,
              right: paddingRight,
            } = generateSpacingValue(settings.button?.padding?.[breakpoint]);

            return {
              width: generateUnitValue(settings.button?.width?.[breakpoint]),
              height: generateUnitValue(settings.button?.height?.[breakpoint]),
              justifyContent: settings.button?.alignment?.[breakpoint] ?? "flex-start",
              gap: generateUnitValue(settings.button?.spacing?.[breakpoint]),
              marginTop,
              marginBottom,
              marginLeft,
              marginRight,
              paddingTop,
              paddingBottom,
              paddingLeft,
              paddingRight,
            };
          }),
          ...generateTypography(breakpoints, settings.button?.typography),
          ...generatePseudoStyle((pseudoClass) => {
            const borderType = settings.button?.border?.type?.[pseudoClass];

            const {
              top: borderTopLeftRadius,
              right: borderTopRightRadius,
              bottom: borderBottomRightRadius,
              left: borderBottomLeftRadius,
            } = generateSpacingValue(settings.button?.border?.radius?.[pseudoClass]);

            const {
              top: borderTopWidth,
              right: borderRightWidth,
              bottom: borderBottomWidth,
              left: borderLeftWidth,
            } = generateSpacingValue(settings.button?.border?.width?.[pseudoClass]);

            return {
              color: settings.button?.color?.[pseudoClass],
              backgroundColor: settings.button?.background?.color?.[pseudoClass],
              borderTopWidth,
              borderRightWidth,
              borderBottomWidth,
              borderLeftWidth,
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderStyle: borderType,
              borderColor: settings.button?.border?.color?.[pseudoClass],
              boxShadow: generateBoxShadow(settings.button?.boxShadow?.[pseudoClass]),
            };
          }),
        },

        ['.tab-button[data-state="active"]']: {
          color: settings.button?.color?.active,
          backgroundColor: settings.button?.background?.color?.active,
          borderTopWidth: generateSpacingValue(settings.button?.border?.width?.active).top,
          borderRightWidth: generateSpacingValue(settings.button?.border?.width?.active).right,
          borderBottomWidth: generateSpacingValue(settings.button?.border?.width?.active).bottom,
          borderLeftWidth: generateSpacingValue(settings.button?.border?.width?.active).left,
          borderTopLeftRadius: generateSpacingValue(settings.button?.border?.radius?.active).top,
          borderTopRightRadius: generateSpacingValue(settings.button?.border?.radius?.active).right,
          borderBottomRightRadius: generateSpacingValue(settings.button?.border?.radius?.active)
            .bottom,
          borderBottomLeftRadius: generateSpacingValue(settings.button?.border?.radius?.active)
            .left,
          borderStyle: settings.button?.border?.type?.active,
          borderColor: settings.button?.border?.color?.active,
          boxShadow: generateBoxShadow(settings.button?.boxShadow?.active),
        },

        [".tab-content"]: {
          width: "100%",

          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: marginTop,
              bottom: marginBottom,
              left: marginLeft,
              right: marginRight,
            } = generateSpacingValue(settings.content?.margin?.[breakpoint]);

            const {
              top: paddingTop,
              bottom: paddingBottom,
              left: paddingLeft,
              right: paddingRight,
            } = generateSpacingValue(settings.content?.padding?.[breakpoint]);

            return {
              marginTop,
              marginBottom,
              marginLeft,
              marginRight,
              paddingTop,
              paddingBottom,
              paddingLeft,
              paddingRight,
              borderTopWidth: generateSpacingValue(settings?.content?.border?.width?.default).top,
              borderRightWidth: generateSpacingValue(settings?.content?.border?.width?.default)
                .right,
              borderBottomWidth: generateSpacingValue(settings?.content?.border?.width?.default)
                .bottom,
              borderLeftWidth: generateSpacingValue(settings?.content?.border?.width?.default).left,
              borderTopLeftRadius: generateSpacingValue(settings?.content?.border?.radius?.default)
                .top,
              borderTopRightRadius: generateSpacingValue(settings?.content?.border?.radius?.default)
                .right,
              borderBottomRightRadius: generateSpacingValue(
                settings?.content?.border?.radius?.default
              ).bottom,
              borderBottomLeftRadius: generateSpacingValue(
                settings?.content?.border?.radius?.default
              ).left,
              borderStyle: settings.content?.border?.type?.default,
              borderColor: settings.content?.border?.color?.default,
            };
          }),
        },
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/tabs-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/tabs-style.control")),
    },
  ],
  toolbar: TabsToolbar,
});

export default TabsConfig;
