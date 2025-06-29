import { BlockGroup, BlockType } from "@/types/block";
import { createBlockConfig } from "@/utils";
import { generateResponsiveStyle, generateTypography } from "@/utils/style";
import { lazy } from "react";
import { RxText } from "react-icons/rx";
import { TextSettingsType } from "./types";
import { generateDropCap } from "./utils";

const TextConfig = createBlockConfig<TextSettingsType>({
  type: BlockType.TEXT,
  label: "Text",
  icon: RxText,
  component: lazy(() => import("./components/text.block")),
  group: BlockGroup.BASIC,
  settings: {
    text: {
      en: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    },
  },
  style({ settings, breakpoints }) {
    return {
      width: "100%",
      ["& .text"]: {
        ...generateDropCap(settings.dropCap?.desktop),
        color: settings.textColor?.default,
        ...generateTypography(breakpoints, settings.typography),
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          return {
            textAlign: settings.alignment?.[breakpoint],
            textShadow:
              settings.textShadow?.desktop?.default &&
              `${settings.textShadow.desktop?.default?.horizontal}px ${settings.textShadow.desktop?.default?.vertical}px ${settings.textShadow.desktop?.default?.blur}px ${settings.textShadow.desktop?.default?.color}`,
          };
        }),
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/controls/text-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/controls/text-style.control")),
    },
  ],
});

export default TextConfig;
