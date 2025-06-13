import { BlockGroup, BlockType } from "@/types/block";
import { createBlockConfig } from "@/utils";
import { IoIosArrowDropdown } from "react-icons/io";
import {
  generateBoxShadow,
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypography,
  generateUnitValue,
} from "@/utils/style";
import DropdownContentControl from "./components/dropdown-content.control";
import DropdownStyleControl from "./components/dropdown-style.control";
import { DropdownSettingsType } from "./types";
import { lazy } from "react";

const DropdownConfig = createBlockConfig<DropdownSettingsType>({
  type: BlockType.DROPDOWN,
  label: "Dropdown",
  group: BlockGroup.BASIC,
  icon: IoIosArrowDropdown,
  component: lazy(() => import("./components/dropdown.block")),
  settings: {
    button: {
      text: {
        show: {
          desktop: true,
          tablet: true,
          mobile: true,
        },
        content: {
          en: "Dropdown",
        },
      },
      icon: {
        show: {
          desktop: true,
          tablet: true,
          mobile: true,
        },
        iconSet: "fe",
        iconName: "arrow-down",
      },
      image: {
        show: {
          desktop: true,
          tablet: true,
          mobile: true,
        },
      },
    },
  },
  style: ({ settings, breakpoints }) => {
    return {
      ["& .dropdown"]: {
        ["& .dropdown-button"]: {
          ...generateTypography(breakpoints, settings?.button?.typography),

          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: marginTop,
              right: marginRight,
              bottom: marginBottom,
              left: marginLeft,
            } = generateSpacingValue(settings?.button?.margin?.[breakpoint]);

            const {
              top: paddingTop,
              right: paddingRight,
              bottom: paddingBottom,
              left: paddingLeft,
            } = generateSpacingValue(settings?.button?.padding?.[breakpoint]);

            return {
              marginTop,
              marginRight,
              marginBottom,
              marginLeft,
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft,
              width: generateUnitValue(settings?.button?.width?.[breakpoint]),
              height: generateUnitValue(settings?.button?.height?.[breakpoint]),
              justifyContent: settings?.button?.align?.[breakpoint],
              gap: generateUnitValue(settings?.button?.spacing?.[breakpoint]),
              ...generatePseudoStyle((pseudoClass) => {
                const {
                  top: borderTopWidth,
                  right: borderRightWidth,
                  bottom: borderBottomWidth,
                  left: borderLeftWidth,
                } = generateSpacingValue(
                  settings?.button?.border?.width?.[breakpoint]?.[pseudoClass]
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
            } = generateSpacingValue(
              settings?.button?.border?.radius?.[pseudo]
            );

            const borderType = settings.button?.border?.type?.[pseudo];
            return {
              color: settings?.button?.color?.[pseudo],
              backgroundColor: settings?.button?.background?.color?.[pseudo],
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderStyle: Boolean(borderType) ? borderType : undefined,
              borderColor: settings?.button?.border?.color?.[pseudo],
            };
          }),

          [".dropdown-button-text"]: {
            ...generateResponsiveStyle(breakpoints, (breakpoint) => {
              return {
                display: settings?.button?.text?.show?.[breakpoint]
                  ? "inline-block"
                  : "none",
                order: settings?.button?.text?.order?.[breakpoint],
              };
            }),
          },
          [".dropdown-button-icon"]: {
            color: settings?.button?.icon?.color?.default,
            ...generateResponsiveStyle(breakpoints, (breakpoint) => {
              return {
                display: settings?.button?.icon?.show?.[breakpoint]
                  ? "inline-block"
                  : "none",
                order: settings?.button?.icon?.order?.[breakpoint],
                fontSize: generateUnitValue(
                  settings?.button?.icon?.size?.[breakpoint]?.default
                ),
              };
            }),
          },
          [".dropdown-button-image"]: {
            ...generateResponsiveStyle(breakpoints, (breakpoint) => {
              return {
                width: generateUnitValue(
                  settings?.button?.image?.width?.[breakpoint]
                ),
                maxWidth: generateUnitValue(
                  settings?.button?.image?.maxWidth?.[breakpoint]
                ),
                height: generateUnitValue(
                  settings?.button?.image?.height?.[breakpoint]
                ),
                display: settings?.button?.image?.show?.[breakpoint]
                  ? "inline-block"
                  : "none",
                order: settings?.button?.image?.order?.[breakpoint],
              };
            }),
          },
        },

        ["& .dropdown-button:hover .dropdown-button-icon"]: {
          color: settings?.button?.icon?.color?.hover,
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            return {
              fontSize: generateUnitValue(
                settings?.button?.icon?.size?.[breakpoint]?.hover
              ),
            };
          }),
        },

        ["& .dropdown-button:focus .dropdown-button-icon"]: {
          color: settings?.button?.icon?.color?.focus,
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            return {
              fontSize: generateUnitValue(
                settings?.button?.icon?.size?.[breakpoint]?.hover
              ),
            };
          }),
        },

        ["& .dropdown-content"]: {
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
              height: generateUnitValue(
                settings?.content?.height?.[breakpoint]
              ),
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
            } = generateSpacingValue(
              settings?.content?.border?.radius?.[pseudo]
            );

            const borderType = settings.content?.border?.type?.[pseudo];
            return {
              backgroundColor: settings?.content?.background?.color?.[pseudo],
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderStyle: Boolean(borderType) ? borderType : undefined,
              borderColor: settings?.content?.border?.color?.[pseudo],
              boxShadow: generateBoxShadow(
                settings?.content?.boxShadow?.[pseudo]
              ),
            };
          }),
        },
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/dropdown-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/dropdown-style.control")),
    },
  ],
});

export default DropdownConfig;
