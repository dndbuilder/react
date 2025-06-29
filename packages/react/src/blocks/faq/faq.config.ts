import { BlockGroup, BlockType } from "@/types/block";
import { Unit } from "@/types/style";
import { createBlockConfig, createId } from "@/utils";
import {
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypography,
  generateUnitValue,
} from "@/utils/style";
import { lazy } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaqSettingsType } from "./types";

const FaqConfig = createBlockConfig<FaqSettingsType>({
  type: BlockType.FAQ,
  label: "FAQ",
  icon: AiOutlineQuestionCircle,
  component: lazy(() => import("./components/faq.block")),
  group: BlockGroup.ADVANCED,
  settings: {
    items: [
      {
        id: createId(),
        title: { text: { en: "Where can I subscribe to your newsletter?" } },
        description: {
          text: {
            en: "We often send out our newsletter with news and great offers. We will never disclose your data to thhird partes and you can unsubscribe from the newsletter at any time.",
          },
        },
      },
      {
        id: createId(),
        title: {
          text: { en: "Can I order a free copy of magazine to sample?" },
        },
        description: {
          text: {
            en: "We often send out our newsletter with news and great offers. We will never disclose your data to thhird partes and you can unsubscribe from the newsletter at any time.",
          },
        },
      },
      {
        id: createId(),
        title: {
          text: { en: "Where on your website can I open a customer account?" },
        },
        description: {
          text: {
            en: "We often send out our newsletter with news and great offers. We will never disclose your data to thhird partes and you can unsubscribe from the newsletter at any time.",
          },
        },
      },
    ],
    item: {
      border: {
        color: "#ddd",
        width: {
          desktop: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
            unit: Unit.PX,
            linked: true,
          },
          tablet: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
            unit: Unit.PX,
            linked: true,
          },
          mobile: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
            unit: Unit.PX,
            linked: true,
          },
        },
      },
      gap: {
        unit: Unit.REM,
        value: 0.4,
      },
      padding: {
        desktop: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1,
          unit: Unit.REM,
          linked: true,
        },
        tablet: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1,
          unit: Unit.REM,
          linked: true,
        },
        mobile: {
          top: 1,
          right: 1,
          bottom: 1,
          left: 1,
          unit: Unit.REM,
          linked: true,
        },
      },
    },
    title: {
      typography: {
        fontSize: {
          desktop: {
            unit: Unit.PX,
            value: 20,
          },
          tablet: {
            unit: Unit.PX,
            value: 19,
          },
          mobile: {
            unit: Unit.PX,
            value: 17,
          },
        },
      },
    },
    isAccordion: true,
    isOpenFirstItem: true,
  },
  style: ({ settings, breakpoints }) => {
    const {
      top: borderTopLeftRadius,
      right: borderTopRightRadius,
      bottom: borderBottomRightRadius,
      left: borderBottomLeftRadius,
    } = generateSpacingValue(settings.item?.border?.radius);
    return {
      "& .faqs": {
        display: "grid",
        gridGap: settings.item?.gap?.value
          ? `${settings.item.gap.value}${settings.item.gap.unit}`
          : undefined,

        "& .item": {
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomRightRadius,
          borderBottomLeftRadius,
          borderStyle: Boolean(settings.item?.border?.type)
            ? settings.item?.border?.type
            : undefined,
          borderColor: settings.item?.border?.color,
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const {
              top: borderTopWidth,
              right: borderRightWidth,
              bottom: borderBottomWidth,
              left: borderLeftWidth,
            } = generateSpacingValue(settings.item?.border?.width?.[breakpoint]);

            const {
              top: paddingTop,
              right: paddingRight,
              bottom: paddingBottom,
              left: paddingLeft,
            } = generateSpacingValue(settings.item?.padding?.[breakpoint]);
            return {
              borderTopWidth,
              borderRightWidth,
              borderBottomWidth,
              borderLeftWidth,
              paddingTop,
              paddingRight,
              paddingBottom,
              paddingLeft,
            };
          }),

          "& .title": {
            color: settings.title?.color?.default,
            ...generateTypography(breakpoints, settings.title?.typography),

            ...generateResponsiveStyle(breakpoints, (breakpoint) => {
              return {
                marginBottom: generateUnitValue(settings.title?.spacing?.[breakpoint]),
              };
            }),
          },
          "& .description": {
            color: settings.description?.color?.default,

            ...generateTypography(breakpoints, settings.description?.typography),
          },
        },
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/faq-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/faq-style.control")),
    },
  ],
});

export default FaqConfig;
