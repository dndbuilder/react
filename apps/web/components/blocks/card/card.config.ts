import {
  createBlockConfig,
  generateBoxShadow,
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypography,
  generateUnitValue,
} from "@dndbuilder.com/react/utils";
import { lazy } from "react";
import { FiSquare } from "react-icons/fi";
import { CardSettingsType } from "./types";

const CardConfig = createBlockConfig<CardSettingsType>({
  type: "card", // Custom block type
  label: "Card",
  icon: FiSquare,
  component: lazy(() => import("./components/card.block")),
  isVisible: () => true,
  group: "Custom", // Group under Basic blocks
  settings: {},
  style: ({ settings, breakpoints }) => {
    return {
      ".card": {
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          const {
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom,
            left: paddingLeft,
          } = generateSpacingValue(settings?.padding?.[breakpoint]);
          const {
            top: marginTop,
            right: marginRight,
            bottom: marginBottom,
            left: marginLeft,
          } = generateSpacingValue(settings?.margin?.[breakpoint]);

          return {
            width: generateUnitValue(settings?.width?.[breakpoint]),
            height: generateUnitValue(settings?.height?.[breakpoint]),
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
              };
            }),
          };
        }),

        ...generatePseudoStyle((pseudoClass) => {
          return {
            backgroundColor: settings?.background?.color?.[pseudoClass],
            borderColor: settings?.border?.color?.[pseudoClass],
            boxShadow: generateBoxShadow(settings?.boxShadow?.[pseudoClass]),
          };
        }),

        ".card-image": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: imagePaddingTop,
              right: imagePaddingRight,
              bottom: imagePaddingBottom,
              left: imagePaddingLeft,
            } = generateSpacingValue(settings?.image?.padding?.[breakpoint]);

            const {
              top: imageMarginTop,
              right: imageMarginRight,
              bottom: imageMarginBottom,
              left: imageMarginLeft,
            } = generateSpacingValue(settings?.image?.margin?.[breakpoint]);
            return {
              width: generateUnitValue(settings?.image?.width?.[breakpoint]),
              height: generateUnitValue(settings?.image?.height?.[breakpoint]),
              paddingTop: imagePaddingTop,
              paddingRight: imagePaddingRight,
              paddingBottom: imagePaddingBottom,
              paddingLeft: imagePaddingLeft,
              marginTop: imageMarginTop,
              marginRight: imageMarginRight,
              marginBottom: imageMarginBottom,
              marginLeft: imageMarginLeft,
            };
          }),
        },

        ".card-title": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: titlePaddingTop,
              right: titlePaddingRight,
              bottom: titlePaddingBottom,
              left: titlePaddingLeft,
            } = generateSpacingValue(settings?.title?.padding?.[breakpoint]);

            const {
              top: titleMarginTop,
              right: titleMarginRight,
              bottom: titleMarginBottom,
              left: titleMarginLeft,
            } = generateSpacingValue(settings?.title?.margin?.[breakpoint]);

            return {
              textAlign: settings?.title?.textAlign?.[breakpoint],
              paddingTop: titlePaddingTop,
              paddingRight: titlePaddingRight,
              paddingBottom: titlePaddingBottom,
              paddingLeft: titlePaddingLeft,
              marginTop: titleMarginTop,
              marginRight: titleMarginRight,
              marginBottom: titleMarginBottom,
              marginLeft: titleMarginLeft,
            };
          }),

          ...generatePseudoStyle((pseudoClass) => {
            return {
              color: settings?.title?.color?.[pseudoClass],
            };
          }),

          ...generateTypography(breakpoints, settings.title?.typography),
        },

        ".card-description": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: descriptionPaddingTop,
              right: descriptionPaddingRight,
              bottom: descriptionPaddingBottom,
              left: descriptionPaddingLeft,
            } = generateSpacingValue(settings?.description?.padding?.[breakpoint]);

            const {
              top: descriptionMarginTop,
              right: descriptionMarginRight,
              bottom: descriptionMarginBottom,
              left: descriptionMarginLeft,
            } = generateSpacingValue(settings?.description?.margin?.[breakpoint]);

            return {
              paddingTop: descriptionPaddingTop,
              paddingRight: descriptionPaddingRight,
              paddingBottom: descriptionPaddingBottom,
              paddingLeft: descriptionPaddingLeft,
              marginTop: descriptionMarginTop,
              marginRight: descriptionMarginRight,
              marginBottom: descriptionMarginBottom,
              marginLeft: descriptionMarginLeft,
            };
          }),

          ...generatePseudoStyle((pseudoClass) => {
            return {
              color: settings?.description?.color?.[pseudoClass],
            };
          }),

          ...generateTypography(breakpoints, settings.description?.typography),
        },

        ".card-link": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: linkPaddingTop,
              right: linkPaddingRight,
              bottom: linkPaddingBottom,
              left: linkPaddingLeft,
            } = generateSpacingValue(settings?.link?.padding?.[breakpoint]);

            const {
              top: linkMarginTop,
              right: linkMarginRight,
              bottom: linkMarginBottom,
              left: linkMarginLeft,
            } = generateSpacingValue(settings?.link?.margin?.[breakpoint]);

            return {
              paddingTop: linkPaddingTop,
              paddingRight: linkPaddingRight,
              paddingBottom: linkPaddingBottom,
              paddingLeft: linkPaddingLeft,
              marginTop: linkMarginTop,
              marginRight: linkMarginRight,
              marginBottom: linkMarginBottom,
              marginLeft: linkMarginLeft,
            };
          }),

          ...generatePseudoStyle((pseudoClass) => {
            return {
              color: settings?.link?.color?.[pseudoClass],
              backgroundColor: settings?.link?.background?.color?.[pseudoClass],
            };
          }),

          ...generateTypography(breakpoints, settings.link?.typography),
        },
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/card-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/card-style.control")),
    },
  ],
});

export default CardConfig;
