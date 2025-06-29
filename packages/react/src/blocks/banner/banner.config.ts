import { BlockGroup, BlockType } from "@/types/block";
import { TextAlignType, Unit } from "@/types/style";
import { createBlockConfig } from "@/utils";
import {
  generatePseudoStyle,
  generateResponsiveStyle,
  generateTypography,
  generateUnitValue,
} from "@/utils/style";
import { lazy } from "react";
import { PiRectangleDashed } from "react-icons/pi";
import BannerContentControl from "./components/banner-content.control";
import BannerStyleControl from "./components/banner-style.control";
import { BannerSettingsType } from "./types";

const BannerConfig = createBlockConfig<BannerSettingsType>({
  type: BlockType.BANNER,
  label: "Banner",
  icon: PiRectangleDashed,
  component: lazy(() => import("./components/banner.block")),
  group: BlockGroup.ADVANCED,
  settings: {
    title: {
      text: { en: "80% Off" },
      typography: {
        fontSize: {
          desktop: { unit: Unit.PX, value: 20 },
        },
      },
    },
    subTitle: {
      text: { en: "For selected brands" },
    },
    description: {
      text: {
        en: "Also credit card user will get 15% cash back on purchase over $300.",
      },
    },
    button: {
      text: { en: "Click Here" },
    },
    image: {
      fit: {
        desktop: { default: "cover" },
      },
    },
    overlayColor: {
      desktop: { default: "rgba(0, 0, 0, 0.2)" },
    },
  },
  style: ({ breakpoints, settings }) => {
    return {
      width: "100%",
      "& .banner": {
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          return {
            backgroundSize: settings.image?.fit?.[breakpoint],
          };
        }),
        backgroundImage: settings.image?.media?.url
          ? `url(${settings.image?.media?.url})`
          : undefined,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",

        "& .overlay": {
          display: settings.image?.media?.url ? "block" : "none",
          backgroundColor: settings.overlayColor?.desktop?.default,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
        },

        "& .content": {
          position: "relative",
          zIndex: 2,
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            return {
              padding: generateUnitValue(settings.card?.padding?.[breakpoint]),
            };
          }),
        },
        "& .title": {
          color: settings.title?.color?.desktop?.default,
          ...generateTypography(breakpoints, settings.title?.typography),
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            return {
              textAlign: settings.title?.alignment?.[breakpoint],
              marginBottom: generateUnitValue(settings.title?.spacing?.[breakpoint]),
            };
          }),
          // Typography end
        },
        "& .sub-title": {
          color: settings.subTitle?.color?.desktop?.default,
          ...generateTypography(breakpoints, settings.subTitle?.typography),
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            return {
              textAlign: settings.subTitle?.alignment?.[breakpoint],
              marginBottom: generateUnitValue(settings.subTitle?.spacing?.[breakpoint]),
            };
          }),
          // Typography end
        },
        "& .description": {
          color: settings.description?.color?.desktop?.default,
          ...generateTypography(breakpoints, settings.description?.typography),
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            return {
              textAlign: settings.description?.alignment?.[breakpoint],
              marginBottom: generateUnitValue(settings.description?.spacing?.[breakpoint]),
            };
          }),
          // Typography end
        },
        // Button
        "& .button-wrapper": {
          width: "100%",
          display: "flex",
          alignItems: "center",
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const align = settings.button?.alignment?.[breakpoint];
            return {
              justifyContent:
                align === "left"
                  ? "flex-start"
                  : align === "right"
                    ? "flex-end"
                    : align === "center"
                      ? "center"
                      : undefined,
            };
          }),
          "& .btn": {
            padding: "10px 20px",
            borderRadius: "5px",
            textAlign: "center",
            transitionDuration: settings.button?.transitionDuration
              ? `${settings.button?.transitionDuration}ms`
              : undefined,
            ...generateTypography(breakpoints, settings.button?.typography),
            ...generateResponsiveStyle(breakpoints, (breakpoint) => {
              const align = settings.button?.alignment?.[breakpoint];
              return {
                ...generatePseudoStyle((pseudoClass) => ({
                  color: settings.button?.color?.[breakpoint]?.[pseudoClass],
                  backgroundColor: `${settings.button?.backgroundColor?.[pseudoClass]} !important`,
                })),
                width: align === TextAlignType.JUSTIFY ? "100%" : undefined,
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
      component: lazy(() => import("./components/banner-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/banner-style.control")),
    },
  ],
});

export default BannerConfig;
