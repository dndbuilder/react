import { BlockGroup, BlockType } from "@/types/block";
import { Unit } from "@/types/style";
import { createBlockConfig, createId } from "@/utils";
import {
  generateBorderRadius,
  generateBoxShadow,
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypography,
  generateUnitValue,
} from "@/utils/style";
import { lazy } from "react";
import { LuQuote } from "react-icons/lu";
import { TestimonialPresets, TestimonialSettingsType } from "./types";

const TestimonialConfig = createBlockConfig<TestimonialSettingsType>({
  type: BlockType.TESTIMONIAL,
  label: "Testimonial",
  icon: LuQuote,
  component: lazy(() => import("./components/testimonial.block")),
  group: BlockGroup.ADVANCED,
  settings: {
    preset: { desktop: TestimonialPresets.Preset1 },
    layout: { desktop: "grid" },
    columns: {
      desktop: 3,
      tablet: 2,
      mobile: 1,
    },
    rows: { desktop: 1, tablet: 1, mobile: 1 },
    rowGap: {
      desktop: {
        unit: Unit.REM,
        value: 3.5,
      },
    },
    columnGap: {
      desktop: {
        unit: Unit.REM,
        value: 5,
      },
    },
    testimonials: [
      {
        id: createId(),
        content: {
          en: `Qui dolor enim consectetur do et sint in ea non dolore. Enim minim id minim eu cillum sunt dolore liquip. Amet elit officia.`,
        },
        name: { en: "Ana Lou" },
        position: { en: "Designer" },
        rating: 3.5,
        showRating: true,
      },
      {
        id: createId(),
        content: {
          en: `Qui dolor enim consectetur do et sint in ea non dolore. Enim minim id minim eu cillum sunt dolore liquip. Amet elit officia.`,
        },
        name: { en: "John Smith" },
        position: { en: "CEO, Fresh Start" },
        rating: 4,
        showRating: true,
      },
      {
        id: createId(),
        content: {
          en: `Qui dolor enim consectetur do et sint in ea non dolore. Enim minim id minim eu cillum sunt dolore liquip. Amet elit officia.`,
        },
        name: { en: "Sarah Johnson" },
        position: { en: "Marketing Director" },
        rating: 0,
        showRating: true,
      },
    ],
    card: {
      padding: {
        desktop: {
          unit: Unit.REM,
          linked: true,
          left: 1,
          right: 1,
          top: 1,
          bottom: 1,
        },
        tablet: {
          unit: Unit.REM,
          linked: true,
          left: 1,
          right: 1,
          top: 1,
          bottom: 1,
        },
        mobile: {
          unit: Unit.REM,
          linked: true,
          left: 1,
          right: 1,
          top: 1,
          bottom: 1,
        },
      },
    },
    slider: {
      showArrows: { desktop: true },
      autoPlay: { desktop: true },
      infinite: { desktop: true },
      autoplaySpeed: { desktop: 3000 },
    },
  },
  style: ({ settings, breakpoints }) => {
    return {
      ["& .testimonial"]: {
        display: "grid",
        placeItems: "center",
        gridTemplateRows: "auto",
        ...generateResponsiveStyle(breakpoints, (breakpoint) => ({
          gridTemplateColumns: `repeat(${
            settings.columns?.[breakpoint] ??
            settings.columns?.tablet ??
            settings.columns?.desktop ??
            1
          }, minmax(0, 1fr))`,
          rowGap:
            settings.rowGap?.[breakpoint]?.value &&
            `${settings.rowGap?.[breakpoint]?.value}${settings.rowGap?.[breakpoint]?.unit}`,
          columnGap:
            settings.columnGap?.[breakpoint]?.value &&
            `${settings.columnGap?.[breakpoint]?.value}${settings.columnGap?.[breakpoint]?.unit}`,
        })),
      },

      "& .testimonial-card": {
        backgroundColor: settings.card?.backgroundColor?.desktop?.default,
        textAlign: settings.card?.alignment?.desktop,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:
          settings.card?.alignment?.desktop === "center"
            ? "center"
            : settings.card?.alignment?.desktop === "right"
              ? "flex-end"
              : "flex-start",
        ...generatePseudoStyle((pseudoClass) => {
          const {
            top: borderTopLeftRadius,
            right: borderTopRightRadius,
            bottom: borderBottomRightRadius,
            left: borderBottomLeftRadius,
          } = generateSpacingValue(settings.card?.border?.radius?.[pseudoClass]);

          const borderType = settings.card?.border?.type?.[pseudoClass];
          return {
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
            borderStyle: Boolean(borderType) ? borderType : undefined,
            borderColor: settings.card?.border?.color?.[pseudoClass],
            boxShadow: generateBoxShadow(settings.card?.boxShadow?.[pseudoClass]),
          };
        }),
        ...generateResponsiveStyle(breakpoints, (breakpoint) => {
          const {
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom,
            left: paddingLeft,
          } = generateSpacingValue(settings.card?.padding?.[breakpoint]);
          return {
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            ...generatePseudoStyle((pseudoClass) => {
              const {
                top: borderTopWidth,
                right: borderRightWidth,
                bottom: borderBottomWidth,
                left: borderLeftWidth,
              } = generateSpacingValue(settings.card?.border?.width?.[breakpoint]?.[pseudoClass]);

              return {
                borderTopWidth,
                borderRightWidth,
                borderBottomWidth,
                borderLeftWidth,
              };
            }),
          };
        }),
        "& .review-msg": {
          color: settings.review?.color?.default,
          ...generateTypography(breakpoints, settings.review?.typography),
        },
        "& .image-wrapper": {
          ...generateResponsiveStyle(breakpoints, (breakpoint) => ({
            width: generateUnitValue(settings.image?.size?.[breakpoint]),
            height: generateUnitValue(settings.image?.size?.[breakpoint]),
          })),
        },
      },

      ["& .slick-slider"]: {
        "& .arrow": {
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transform: "translateY(-50%)",
          zIndex: 2,
          transition: "all 200ms ease-in-out",
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const leftArrow = settings.slider?.navigation?.leftArrowPosition?.[breakpoint];
            const rightArrow = settings.slider?.navigation?.rightArrowPosition?.[breakpoint];

            return {
              width: generateUnitValue(settings.slider?.navigation?.arrowWidth?.[breakpoint]),
              height: generateUnitValue(settings.slider?.navigation?.arrowHeight?.[breakpoint]),
              fontSize:
                generateUnitValue(settings.slider?.navigation?.arrowSize?.[breakpoint]) ?? "22px",
              ...generatePseudoStyle((pseudoClass) => ({
                color: settings.slider?.navigation?.arrowColor?.[breakpoint]?.[pseudoClass],
                backgroundColor:
                  settings.slider?.navigation?.arrowBackgroudColor?.[breakpoint]?.[pseudoClass],
                boxShadow: generateBoxShadow(
                  settings.slider?.navigation?.arrowBoxShadow?.[pseudoClass]
                ),
                ...generateBorderRadius(
                  settings.slider?.navigation?.arrowRadius?.[breakpoint]?.[pseudoClass]
                ),
              })),
              ["&.arrow-left"]: {
                top: leftArrow?.top ?? "50%",
                right: leftArrow?.right,
                bottom: leftArrow?.bottom,
                left: leftArrow?.left ?? 0,
              },
              ["&.arrow-right"]: {
                top: rightArrow?.top ?? "50%",
                right: rightArrow?.right ?? 0,
                bottom: rightArrow?.bottom,
                left: rightArrow?.left,
              },
            };
          }),
        },

        ["& .slick-dots"]: {
          position: "absolute",
          display: "flex !important",
          justifyContent: "center",
          alignItems: "center",
          listStyle: "none",
          padding: 0,
          margin: 0,
          zIndex: 2,
          height: "fit-content",
          width: "fit-content",
          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const position = generateSpacingValue(
              settings.slider?.navigation?.dotsPosition?.[breakpoint]
            );
            return {
              gap: generateUnitValue(settings.slider?.navigation?.dotGap?.[breakpoint]) ?? "15px",
              top: position.top,
              right: position.right,
              bottom: position.bottom,
              left: position.left ? position.left : position.right ? undefined : "50%",
              transform: position.left || position.right ? undefined : "translateX(-50%)",
              ["& li"]: {
                cursor: "unset",
                "& .dot": {
                  margin: "0 5px",
                  cursor: "pointer",
                  borderRadius:
                    generateUnitValue(settings.slider?.navigation?.dotRadius?.[breakpoint]) ??
                    "50%",
                  backgroundColor:
                    settings.slider?.navigation?.dotColor?.[breakpoint]?.default ??
                    "rgba(0,0,0,0.2)",
                  display: "block",
                  width:
                    generateUnitValue(settings.slider?.navigation?.dotWidth?.[breakpoint]) ??
                    "10px",
                  height:
                    generateUnitValue(settings.slider?.navigation?.dotHeight?.[breakpoint]) ??
                    "10px",
                },
                "&:hover": {
                  "& .dot": {
                    backgroundColor:
                      settings.slider?.navigation?.dotActiveColor?.[breakpoint]?.default,
                  },
                },
                ["&.slick-active"]: {
                  "& .dot": {
                    backgroundColor:
                      settings.slider?.navigation?.dotActiveColor?.[breakpoint]?.default ??
                      "rgba(0,0,0,0.8)",
                    width:
                      generateUnitValue(
                        settings.slider?.navigation?.activeDotWidth?.[breakpoint]
                      ) ?? "10px",
                    height:
                      generateUnitValue(
                        settings.slider?.navigation?.activeDotHeight?.[breakpoint]
                      ) ?? "10px",
                  },
                },
              },
            };
          }),
        },

        ...generateResponsiveStyle(breakpoints, (breakpoint) => ({
          "& .slick-slide > div": {
            height: generateUnitValue(settings.slider?.height?.[breakpoint]),
            margin: `0  ${
              settings.columnGap?.[breakpoint]?.value
                ? `${Number(settings.columnGap?.[breakpoint]?.value) / 2}${settings.columnGap?.[breakpoint]?.unit}`
                : 0
            } `,
          },
          "& .slick-list": {
            margin: `0  ${
              settings.columnGap?.[breakpoint]?.value
                ? `-${Number(settings.columnGap?.[breakpoint]?.value) / 2}${settings.columnGap?.[breakpoint]?.unit}`
                : 0
            } `,
          },
        })),
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/testimonial-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/testimonial-style.control")),
    },
  ],
});

export default TestimonialConfig;
