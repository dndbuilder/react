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
import { FiImage } from "react-icons/fi";
import { ImageSettingsType } from "./types";

const ImageConfig = createBlockConfig<ImageSettingsType>({
  type: BlockType.IMAGE,
  label: "Image",
  icon: FiImage,
  group: BlockGroup.BASIC,
  component: lazy(() => import("./components/image.block")),
  settings: {},
  style: ({ settings, breakpoints }) => {
    return {
      "& .block-img": {
        display: "flex",
        flexDirection: "column",
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          const {
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom,
            left: paddingLeft,
          } = generateSpacingValue(settings.wrapper?.padding?.[breakpoint]);

          const {
            top: marginTop,
            right: marginRight,
            bottom: marginBottom,
            left: marginLeft,
          } = generateSpacingValue(settings.wrapper?.margin?.[breakpoint]);

          return {
            width: generateUnitValue(settings.wrapper?.width?.[breakpoint]),
            height: generateUnitValue(settings.wrapper?.height?.[breakpoint]),
            alignItems: settings.alignment?.[breakpoint] ?? "center",
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            ...generatePseudoStyle((pseudoClass) => {
              const {
                top: borderTopWidth,
                right: borderRightWidth,
                bottom: borderBottomWidth,
                left: borderLeftWidth,
              } = generateSpacingValue(
                settings.wrapper?.border?.width?.[breakpoint]?.[pseudoClass]
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
          } = generateSpacingValue(settings.wrapper?.border?.radius?.[pseudoClass]);

          const borderType = settings.wrapper?.border?.type?.[pseudoClass];

          return {
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
            borderStyle: Boolean(borderType) ? borderType : undefined,
            borderColor: settings.wrapper?.border?.color?.[pseudoClass],
          };
        }),

        "& img": {
          ...generatePseudoStyle((pseudoClass) => {
            const {
              top: borderTopLeftRadius,
              right: borderTopRightRadius,
              bottom: borderBottomRightRadius,
              left: borderBottomLeftRadius,
            } = generateSpacingValue(settings.border?.radius?.[pseudoClass]);

            const borderType = settings.border?.type?.[pseudoClass];

            return {
              opacity: settings.opacity?.[pseudoClass],
              borderTopLeftRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderStyle: Boolean(borderType) ? borderType : undefined,
              borderColor: settings.border?.color?.[pseudoClass],
            };
          }),

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
              width: generateUnitValue(settings.width?.[breakpoint]),
              maxWidth: generateUnitValue(settings.maxWidth?.[breakpoint]),
              height: generateUnitValue(settings.height?.[breakpoint]),
              maxHeight: generateUnitValue(settings.maxHeight?.[breakpoint]),
              textAlign: settings.alignment?.[breakpoint],
              objectFit: settings.objectFit?.[breakpoint],
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft,
              marginTop,
              marginRight,
              marginBottom,
              marginLeft,
              ...generatePseudoStyle((pseudoClass) => {
                const {
                  top: borderTopWidth,
                  right: borderRightWidth,
                  bottom: borderBottomWidth,
                  left: borderLeftWidth,
                } = generateSpacingValue(settings.border?.width?.[breakpoint]?.[pseudoClass]);

                return {
                  borderTopWidth,
                  borderRightWidth,
                  borderBottomWidth,
                  borderLeftWidth,
                };
              }),
            };
          }),
        },

        "& .block-img-caption": {
          color: settings.caption?.color?.default,
          ...generateTypography(breakpoints, settings.caption?.typography),
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: paddingTop,
              right: paddingRight,
              bottom: paddingBottom,
              left: paddingLeft,
            } = generateSpacingValue(settings.caption?.padding?.[breakpoint]);

            const {
              top: marginTop,
              right: marginRight,
              bottom: marginBottom,
              left: marginLeft,
            } = generateSpacingValue(settings.caption?.margin?.[breakpoint]);

            return {
              textAlign: settings.caption?.alignment?.[breakpoint],
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft,
              marginTop,
              marginRight,
              marginBottom,
              marginLeft,
            };
          }),
        },
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/image-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/image-style.control")),
    },
  ],
});

export default ImageConfig;
