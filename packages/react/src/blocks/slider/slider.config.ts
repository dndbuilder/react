import { BlockGroup, BlockType } from "@/types/block";
import { BackgroundType, SizeType, Unit } from "@/types/style";
import {
  generateBgGradient,
  generateBorderRadius,
  generateBoxShadow,
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypographyFromBreakpoint,
  generateUnitValue,
} from "@/utils/style";
import { lazy } from "react";
import { TfiLayoutSlider } from "react-icons/tfi";
import { createBlockConfig, createId } from "../../utils";
import { generateSize } from "../button/utils";
import { SliderPresets, SliderSettingsType } from "./types";

const SliderConfig = createBlockConfig<SliderSettingsType>({
  type: BlockType.SLIDER,
  label: "Slider",
  icon: TfiLayoutSlider,
  component: lazy(() => import("./components/slider.block")),
  group: BlockGroup.ADVANCED,
  settings: {
    preset: { desktop: SliderPresets.Preset1 },
    showDots: { desktop: true },
    infinite: { desktop: true },
    showArrows: { desktop: true },
    pauseOnHover: { desktop: true },
    autoPlay: { desktop: true },
    autoplaySpeed: { desktop: 3000 },
    horizontalPosition: { desktop: "center" },
    verticalPosition: { desktop: "center" },
    textAlign: { desktop: "center" },
    navigation: {
      arrowSize: {
        desktop: {
          unit: Unit.PX,
          value: 22,
        },
      },
      dotSize: {
        desktop: {
          unit: Unit.PX,
          value: 16,
        },
      },
      dotColor: { desktop: { default: "rgba(0,0,0,0.2)" } },
      dotActiveColor: { desktop: { default: "rgba(0,0,0,0.8)" } },
    },
    button: {
      size: { desktop: SizeType.DEFAULT },
      border: {
        width: {
          unit: Unit.PX,
          value: 2,
        },
        radius: {
          unit: Unit.PX,
          value: 5,
        },
        color: {
          default: "#fff",
          hover: "#fff",
        },
      },
      typography: {
        fontSize: {
          desktop: {
            unit: Unit.PX,
            value: 16,
          },
          tablet: {
            unit: Unit.PX,
            value: 15,
          },
          mobile: {
            unit: Unit.PX,
            value: 10,
          },
        },
      },
      background: {
        gradient: {
          color1: {
            default: "var(--accent-color)",
            hover: "var(--accent-color)",
          },
          location1: {
            default: {
              unit: Unit.PERCENTAGE,
              value: 0,
            },
            hover: {
              unit: Unit.PERCENTAGE,
              value: 0,
            },
          },
          location2: {
            default: {
              unit: Unit.PERCENTAGE,
              value: 100,
            },
            hover: {
              unit: Unit.PERCENTAGE,
              value: 100,
            },
          },
          angle: {
            default: {
              unit: Unit.DEG,
              value: 180,
            },
            hover: {
              unit: Unit.DEG,
              value: 180,
            },
          },
          type: {
            default: "linear",
            hover: "linear",
          },
          position: {
            default: "center center",
          },
        },
        transitionDuration: 200,
      },
      textColor: {
        default: "#fff",
        hover: "#fff",
      },
    },
    title: {
      marginBottom: {
        desktop: {
          unit: Unit.PX,
          value: 20,
        },
      },
      typography: {
        fontSize: {
          desktop: {
            unit: Unit.PX,
            value: 40,
          },
          tablet: {
            unit: Unit.PX,
            value: 30,
          },
          mobile: {
            unit: Unit.PX,
            value: 20,
          },
        },
      },
    },
    description: {
      marginBottom: {
        desktop: {
          unit: Unit.PX,
          value: 30,
        },
      },
      typography: {
        fontSize: {
          desktop: {
            unit: Unit.PX,
            value: 18,
          },
          tablet: {
            unit: Unit.PX,
            value: 15,
          },
          mobile: {
            unit: Unit.PX,
            value: 10,
          },
        },
      },
    },
    height: {
      desktop: {
        unit: Unit.PX,
        value: 400,
      },
      tablet: {
        unit: Unit.PX,
        value: 350,
      },
      mobile: {
        unit: Unit.PX,
        value: 300,
      },
    },
    contentWidth: {
      desktop: {
        unit: Unit.PERCENTAGE,
        value: 100,
      },
    },
    slides: [
      {
        id: createId(),
        title: { en: "Slide 1 Heading" },
        description: {
          en: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        },
        button: { text: { en: "Click Here" } },
        background: {
          color: { default: "#833ca3" },
          size: { desktop: { default: "cover" } },
        },
        contentColor: { default: "#fff" },
        overlayColor: { default: "rgba(0,0,0,0.3)" },
      },
      {
        id: createId(),
        title: { en: "Slide 2 Heading" },
        description: {
          en: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        },
        button: { text: { en: "Click Here" } },
        background: {
          color: { default: "#4054b2" },
          size: { desktop: { default: "cover" } },
        },
        contentColor: { default: "#fff" },
        overlayColor: { default: "rgba(0,0,0,0.3)" },
      },
      {
        id: createId(),
        title: { en: "Slide 3 Heading" },
        description: {
          en: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        },
        button: { text: { en: "Click Here" } },
        background: {
          color: { default: "#1abc9c" },
          size: { desktop: { default: "cover" } },
        },
        contentColor: { default: "#fff" },
        overlayColor: { default: "rgba(0,0,0,0.3)" },
      },
    ],
  },
  style: ({ settings, breakpoints }) => {
    const slideStyles = settings.slides?.reduce(
      (acc, obj) => ({
        ...acc,
        [`& .slide-item-${obj.id}`]: {
          [`& .overlay`]: {
            backgroundColor: obj.overlayColor?.default,
            mixBlendMode: obj.blendMode?.desktop,
          },

          ...generateResponsiveStyle(breakpoints, (breakpoint) => {
            const bgPosition = obj.background?.position?.[breakpoint]?.default;
            return {
              backgroundColor: obj.background?.color?.default,
              backgroundImage: obj.background?.image?.default?.url
                ? `url("${obj.background?.image?.default?.url}")`
                : null,
              backgroundSize: obj.background?.size?.[breakpoint]?.default,
              backgroundPositionX:
                bgPosition === "custom"
                  ? generateUnitValue(obj.background?.positionX?.[breakpoint]?.default)
                  : undefined,
              backgroundPositionY:
                bgPosition === "custom"
                  ? generateUnitValue(obj.background?.positionY?.[breakpoint]?.default)
                  : undefined,
              backgroundPosition: bgPosition === "custom" ? undefined : bgPosition,
              backgroundRepeat: obj.background?.repeat?.[breakpoint]?.default,
              color: obj.contentColor?.default,
              justifyContent:
                obj.horizontalPosition?.[breakpoint] ?? settings.horizontalPosition?.[breakpoint],
              alignItems:
                obj.verticalPosition?.[breakpoint] ?? settings.verticalPosition?.[breakpoint],

              ["& .slide-content"]: {
                textAlign: obj.textAlign?.desktop ?? settings.textAlign?.desktop,
                ["& .title"]: {
                  color: settings.title?.color?.desktop?.default ?? obj.contentColor?.default,
                },
                ["& .description"]: {
                  color: settings.description?.color?.desktop?.default ?? obj.contentColor?.default,
                },
              },
            };
          }),
        },
      }),
      {}
    );
    return {
      width: "100%",
      "& .slider-wrapper": {
        position: "relative",
        "& .slick-list": {
          [`& .slide-item`]: {
            display: "flex !important",
            width: "100%",
            position: "relative",
            [`& .overlay`]: {
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: 1,
            },

            ...generateResponsiveStyle(breakpoints, (breakpoint) => {
              const {
                top: paddingTop,
                right: paddingRight,
                bottom: paddingBottom,
                left: paddingLeft,
              } = generateSpacingValue(settings.sliderPadding?.[breakpoint]);
              return {
                height: generateUnitValue(settings.height?.[breakpoint]),
                paddingTop,
                paddingRight,
                paddingBottom,
                paddingLeft,
              };
            }),

            "& .slide-content": {
              position: "relative",
              zIndex: 2,
              ...generateResponsiveStyle(breakpoints, (breakpoint) => {
                return {
                  maxWidth: generateUnitValue(settings.contentWidth?.[breakpoint]),
                  "& .title": {
                    marginBottom: generateUnitValue(settings.title?.marginBottom?.[breakpoint]),
                    ...generateTypographyFromBreakpoint(breakpoint, settings.title?.typography),
                  },
                  "& .description": {
                    marginBottom: generateUnitValue(
                      settings.description?.marginBottom?.[breakpoint]
                    ),
                    ...generateTypographyFromBreakpoint(
                      breakpoint,
                      settings.description?.typography
                    ),
                  },
                  "& .btn": {
                    ...generatePseudoStyle((pseudoClass) => ({
                      ...generateSize({
                        size: settings.button?.size?.[breakpoint],
                      }),

                      backgroundColor:
                        settings.button?.background.type?.[pseudoClass] ===
                          BackgroundType.CLASSIC && settings.button?.background.color?.[pseudoClass]
                          ? settings.button?.background.color?.[pseudoClass]
                          : "transparent",
                      backgroundImage: generateBgGradient({
                        type: settings.button?.background.type?.[pseudoClass],
                        color1: settings.button?.background.gradient?.color1?.[pseudoClass],
                        color2: settings.button?.background.gradient?.color2?.[pseudoClass],
                        location1: settings.button?.background.gradient?.location1?.[pseudoClass],
                        location2: settings.button?.background.gradient?.location2?.[pseudoClass],
                        angle: settings.button?.background.gradient?.angle?.[pseudoClass],
                        gradientType: settings.button?.background.gradient?.type?.[pseudoClass],
                        position: settings.button?.background.gradient?.position?.[pseudoClass],
                      }),
                      borderWidth: settings.button?.border.width?.value,
                      borderColor: settings.button?.border.color?.[pseudoClass] ?? "#fff",
                      borderStyle: "solid",
                      borderRadius: generateUnitValue(settings.button?.border.radius),
                      ...generateTypographyFromBreakpoint(breakpoint, settings.button?.typography),
                      color: settings.button?.textColor?.[pseudoClass],
                    })),
                    transition: `all 200ms ease-in-out`,
                  },
                };
              }),
            },
          },

          ...slideStyles,
        },
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
            const leftArrow = settings.navigation?.leftArrowPosition?.[breakpoint];
            const rightArrow = settings.navigation?.rightArrowPosition?.[breakpoint];

            return {
              width: generateUnitValue(settings.navigation?.arrowWidth?.[breakpoint]),
              height: generateUnitValue(settings.navigation?.arrowHeight?.[breakpoint]),
              fontSize: generateUnitValue(settings.navigation?.arrowSize?.[breakpoint]) ?? "22px",
              ...generatePseudoStyle((pseudoClass) => ({
                color: settings.navigation?.arrowColor?.[breakpoint]?.[pseudoClass],
                backgroundColor:
                  settings.navigation?.arrowBackgroudColor?.[breakpoint]?.[pseudoClass],
                boxShadow: generateBoxShadow(settings.navigation?.arrowBoxShadow?.[pseudoClass]),
                ...generateBorderRadius(
                  settings.navigation?.arrowRadius?.[breakpoint]?.[pseudoClass]
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
        "& .slick-dots": {
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
            const position = generateSpacingValue(settings.navigation?.dotsPosition?.[breakpoint]);
            return {
              gap: generateUnitValue(settings.navigation?.dotGap?.[breakpoint]) ?? "15px",
              top: position.top,
              right: position.right,
              bottom: position.bottom ?? "10px",
              left: position.left ? position.left : position.right ? undefined : "50%",
              transform: position.left || position.right ? undefined : "translateX(-50%)",
            };
          }),
          "& > li": {
            ...generateResponsiveStyle(breakpoints, (breakpoint) => ({
              margin: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "& .dot": {
                display: "block",
                width: generateUnitValue(settings.navigation?.dotWidth?.[breakpoint]) ?? "10px",
                height: generateUnitValue(settings.navigation?.dotHeight?.[breakpoint]) ?? "10px",
                borderRadius:
                  generateUnitValue(settings.navigation?.dotRadius?.[breakpoint]) ?? "50%",
                backgroundColor: settings.navigation?.dotColor?.[breakpoint]?.default,
                cursor: "pointer",
                transition: "all 200ms ease-in-out",
              },
              "&:hover .dot": {
                backgroundColor: settings.navigation?.dotActiveColor?.[breakpoint]?.default,
              },
              "&.slick-active .dot": {
                backgroundColor: settings.navigation?.dotActiveColor?.[breakpoint]?.default,
                width:
                  generateUnitValue(settings.navigation?.activeDotWidth?.[breakpoint]) ?? "10px",
                height:
                  generateUnitValue(settings.navigation?.activeDotHeight?.[breakpoint]) ?? "10px",
              },
            })),
          },
        },
      },
    };
  },
  controls: [
    {
      label: "Content",
      component: lazy(() => import("./components/controls/slider-content.control")),
    },
    {
      label: "Style",
      component: lazy(() => import("./components/controls/slider-style.control")),
    },
  ],
});

export default SliderConfig;
