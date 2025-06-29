import { BlockGroup, BlockType } from "@/types/block";
import { Unit } from "@/types/style";
import { createBlockConfig } from "@/utils";
import {
  generateFontSize,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTextShadow,
  generateUnitValue,
} from "@/utils/style";
import deepmerge from "deepmerge";
import { lazy } from "react";

import { RxHeading } from "react-icons/rx";
import { HeadingSettingsType } from "./types";

const HeadingConfig = createBlockConfig<HeadingSettingsType>({
  type: BlockType.HEADING,
  label: "Heading",
  icon: RxHeading,
  component: lazy(() => import("./components/heading.block")),
  group: BlockGroup.BASIC,
  settings: {
    title: {
      en: "Heading",
    },
    htmlTag: "h2",
  },
  style: ({ settings, themeSettings, breakpoints }) => {
    const themeTypo = themeSettings.typography?.presets?.find(
      (preset) => preset.id === settings.typography?.presetId
    );
    const typo = deepmerge(themeTypo?.value ?? {}, settings.typography ?? {});
    const headingMap = {
      h1: "3.5rem",
      h2: "3rem",
      h3: "2.5rem",
      h4: "2rem",
      h5: "1.5rem",
      h6: "1rem",
    };

    const responsiveStyle = generateResponsiveStyle(breakpoints, (breakpoint) => {
      function getFontSize(): string | undefined {
        if (typo?.fontSize?.[breakpoint]?.value) {
          return generateUnitValue(typo?.fontSize?.[breakpoint]);
        } else if (settings.size?.[breakpoint]) {
          return generateFontSize(settings.size?.[breakpoint]).fontSize;
        } else if (typo.fontSize?.tablet?.value) {
          return generateUnitValue(typo.fontSize?.tablet);
        } else if (settings.size?.tablet) {
          return generateFontSize(settings.size?.tablet).fontSize;
        } else if (typo.fontSize?.desktop?.value) {
          return generateUnitValue(typo.fontSize?.desktop);
        } else if (settings.size?.desktop) {
          return generateFontSize(settings.size?.desktop).fontSize;
        }

        return headingMap[settings.htmlTag!];
      }
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
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        fontSize: getFontSize(),
        lineHeight: typo?.lineHeight?.[breakpoint]?.value
          ? generateUnitValue(typo?.lineHeight?.[breakpoint])
          : generateFontSize(settings.size?.[breakpoint]).lineHeight,
        letterSpacing: generateUnitValue(typo?.letterSpacing?.[breakpoint]),
        wordSpacing: generateUnitValue(typo?.wordSpacing?.[breakpoint]),
        fontWeight: typo?.fontWeight?.[breakpoint],
        textTransform: typo?.textTransform?.[breakpoint],
        fontStyle: typo?.fontStyle?.[breakpoint],
        textDecoration: typo?.textDecoration?.[breakpoint],
        //
        textAlign: settings.alignment?.[breakpoint],
        textStroke: `${generateUnitValue({ value: settings.textStroke?.width?.[breakpoint]?.value, unit: Unit.PX })} ${
          settings.textStroke?.color ?? ""
        }`,
        "-webkit-text-stroke": `${generateUnitValue({
          value: settings.textStroke?.width?.[breakpoint]?.value,
          unit: Unit.PX,
        })} ${settings.textStroke?.color ?? ""}`,
      };
    });

    return {
      // flex: 1,
      ["& .heading"]: {
        fontFamily: typo?.fontFamily?.desktop,
        mixBlendMode: settings.blendMode?.desktop,
        color: settings.textColor?.default,
        backgroundColor: settings.backgroundColor?.default,
        textShadow: settings.textShadow && generateTextShadow(settings.textShadow),

        "&:hover": {
          color: settings.textColor?.hover,
        },
        ...responsiveStyle,
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/heading-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/heading-style.control")),
    },
  ],
});

export default HeadingConfig;
