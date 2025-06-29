import {
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypography,
} from "@/utils/style";
import { lazy } from "react";
import { CiLink } from "react-icons/ci";
import { BlockGroup, BlockType } from "../../types/block";
import { createBlockConfig } from "../../utils";
import { LinkSettingsType } from "./types";

const LinkConfig = createBlockConfig<LinkSettingsType>({
  type: BlockType.LINK,
  label: "Link",
  icon: CiLink,
  component: lazy(() => import("./components/link.block")),
  group: BlockGroup.BASIC,
  settings: {
    text: { en: "Click Here" },
  },

  style: ({ settings, breakpoints }) => {
    return {
      "& .link-block": {
        "& > a": {
          display: "block",
          ...generateTypography(breakpoints, settings.typography),
          transition: settings.transitionDuration
            ? `color ${settings.transitionDuration}ms ease-in-out`
            : undefined,
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
              textAlign: settings.alignment?.[breakpoint],
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
          ...generatePseudoStyle((pseudoClass) => {
            return {
              color: settings.color?.[pseudoClass],
            };
          }),
        },
      },
    };
  },

  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/link-content-control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/link-style-control")),
    },
  ],
});

export default LinkConfig;
