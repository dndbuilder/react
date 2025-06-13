import { BlockGroup, BlockType } from "@/types/block";
import { Unit } from "@/types/style";
import { createBlockConfig } from "@/utils";
import {
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateUnitValue,
} from "@/utils/style";
import { lazy } from "react";
import { TbIcons } from "react-icons/tb";
import { IconSettingsType } from "./types";

const IconConfig = createBlockConfig<IconSettingsType>({
  type: BlockType.ICON,
  label: "Icon",
  icon: TbIcons,
  component: lazy(() => import("./components/icon.block")),
  group: BlockGroup.BASIC,
  settings: {
    icon: {
      iconSet: "fe",
      iconName: "star",
    },
    size: {
      desktop: {
        unit: Unit.PX,
        value: 50,
      },
    },
    view: { desktop: "default" },
    shape: { desktop: "circle" },
    color: {
      default: "var(--accent-color)",
    },
    padding: {
      desktop: {
        top: 25,
        right: 25,
        bottom: 25,
        left: 25,
        unit: Unit.PX,
        linked: true,
      },
    },
    alignment: {
      desktop: "center",
    },
    border: {
      width: {
        desktop: {
          top: 2,
          right: 2,
          bottom: 2,
          left: 2,
          unit: Unit.PX,
          linked: true,
        },
      },
    },
  },
  style({ breakpoints, settings }) {
    return {
      "& .icon-wrapper": {
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
        "& .icon": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: paddingTop,
              right: paddingRight,
              bottom: paddingBottom,
              left: paddingLeft,
            } = generateSpacingValue(settings.padding?.[breakpoint]);

            const {
              top: borderTopLeftRadius,
              right: borderTopRightRadius,
              bottom: borderBottomRightRadius,
              left: borderBottomLeftRadius,
            } = generateSpacingValue(settings.border?.radius?.[breakpoint]);

            const {
              top: borderTopWidth,
              right: borderRightWidth,
              bottom: borderBottomWidth,
              left: borderLeftWidth,
            } = generateSpacingValue(settings.border?.width?.[breakpoint]);
            const view = settings.view?.desktop;
            return {
              paddingTop: view !== "default" && paddingTop,
              paddingRight: view !== "default" && paddingRight,
              paddingBottom: view !== "default" && paddingBottom,
              paddingLeft: view !== "default" && paddingLeft,
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderColor: view === "framed" && settings.color?.default,
              borderTopWidth: view === "framed" && borderTopWidth,
              borderRightWidth: view === "framed" && borderRightWidth,
              borderBottomWidth: view === "framed" && borderBottomWidth,
              borderLeftWidth: view === "framed" && borderLeftWidth,
              fontSize: generateUnitValue(settings.size?.[breakpoint]),

              ...generatePseudoStyle((pseudoClass) => {
                const isStacked = view === "stacked";
                const isFramed = view === "framed";
                const backgroundColor = isStacked
                  ? settings.color?.[pseudoClass]
                  : isFramed
                    ? settings.secondaryColor?.[pseudoClass]
                    : undefined;
                return {
                  backgroundColor,
                };
              }),
            };
          }),

          "& > *": {
            ...generateResponsiveStyle(breakpoints, (breakpoint) => {
              return {
                transform: `rotate(${generateUnitValue(settings.rotate?.[breakpoint])})`,
              };
            }),
            ...generatePseudoStyle((pseudoClass) => {
              const isStacked = settings.view?.desktop === "stacked";
              const color = isStacked
                ? (settings.secondaryColor?.[pseudoClass] ?? "#fff")
                : settings.color?.[pseudoClass];
              return {
                color,
              };
            }),
          },
        },
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/icon-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/icon-style.control")),
    },
  ],
});

export default IconConfig;
