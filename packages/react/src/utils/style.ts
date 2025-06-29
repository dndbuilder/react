import { Block, BlockAdvancedSettings, BlockConfig } from "@/types/block";
import { Breakpoint, BreakpointConfig } from "@/types/responsive";
import {
  BackgroundType,
  BoxShadow,
  DisplayFieldType,
  DisplayType,
  PseudoClass,
  SizeType,
  SpacingValue,
  TextShadow,
  TypographyType,
  UnitValue,
} from "@/types/style";
import { ThemeSettings } from "@/types/theme";
import { createStyle } from "@/utils";
import { clean } from "deep-cleaner";
import deepmerge from "deepmerge";
import { Styles } from "free-style";
import { cloneDeep, identity, isEmpty, pickBy } from "lodash";
import { isUnitValue } from "./guard";

export const generateBlockStyle = (blockId: string, style: Styles) => {
  const css = createStyle();

  const generatedClass = css.register(style);

  const finalStyle = css.get().replaceAll(generatedClass, blockId);

  return finalStyle;
};

export const generateContentStyles = ({
  content,
  themeSettings,
  breakpoints,
  config,
}: {
  content: Record<string, Block>;
  themeSettings: ThemeSettings;
  breakpoints: BreakpointConfig[];
  config: Record<string, BlockConfig>;
}) => {
  if (Object.keys(content).length === 0) return "";

  return Object.keys(content)
    .filter((block) => block !== "root")
    .reduce((acc, blockId) => {
      const block = content[blockId];

      if (!block) return acc;

      const blockConfig = config[block.type];

      if (!blockConfig) return acc;

      const styles: Styles = {};

      // Block styles
      if (blockConfig.style) {
        Object.assign(
          styles,
          blockConfig.style({
            blockId: block.id,
            settings: block.settings,
            themeSettings,
            breakpoints: breakpoints,
          })
        );
      }

      // Advanced styles
      if (!isEmpty(block.advancedSettings)) {
        const advancedStyles = generateAdvancedStyle({
          settings: block.advancedSettings,
          breakpoints,
        });

        const mergedStyle = deepmerge(styles, advancedStyles);

        Object.assign(styles, mergedStyle);
      }

      acc += generateBlockStyle(block.id, styles);

      // Custom CSS
      if (!blockConfig.disableAdvancedSettings && block.advancedSettings?.customCss) {
        acc += block.advancedSettings.customCss.replaceAll("selector", `.${block.id}`);
      }

      return acc;
    }, "");
};

export function generateResponsiveStyle(
  breakpoints: BreakpointConfig[],
  callback: (breakpoint: Breakpoint) => Styles
): Styles {
  const styles: Styles = {};

  breakpoints.forEach((breakpoint) => {
    const style = callback(breakpoint.key);

    if (breakpoint.key === Breakpoint.DESKTOP) {
      Object.assign(styles, style);
    } else {
      const mediaQuery = `@media (max-width: ${breakpoint.maxWidth}px)`;
      styles[mediaQuery] = style;
    }
  });

  return clean(cloneDeep(styles));
  // return styles;
}

export function generatePseudoStyle(
  callback: (pseudoClass: PseudoClass) => Styles,
  pseudoClassesOptions?: PseudoClass[]
) {
  const styles: Styles = {};

  const pseudoClasses = pseudoClassesOptions ?? Object.values(PseudoClass);

  pseudoClasses.forEach((pseudoClass) => {
    const style = pickBy(callback(pseudoClass), identity);

    if (!Object.keys(style).length) {
      return;
    }

    if (pseudoClass === PseudoClass.DEFAULT) {
      Object.assign(styles, style);
      return;
    }

    styles[`&:${pseudoClass}`] = style;
    return;
  });

  return styles;
}

export function generateAdvancedStyle({
  settings,
  breakpoints,
}: {
  settings: BlockAdvancedSettings;
  breakpoints: BreakpointConfig[];
}): Styles {
  const styles = generatePseudoStyle((pseudoClass) => {
    const {
      top: borderTopLeftRadius,
      right: borderTopRightRadius,
      bottom: borderBottomRightRadius,
      left: borderBottomLeftRadius,
    } = generateSpacingValue(settings.border?.radius?.[pseudoClass]);

    const borderType = settings.border?.type?.[pseudoClass];
    return {
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
      borderStyle: Boolean(borderType) ? borderType : undefined,
      borderColor: settings.border?.color?.[pseudoClass],
      backgroundAttachment: settings.background?.attachment?.[pseudoClass],
      backgroundColor:
        settings.background?.type?.[pseudoClass] === BackgroundType.CLASSIC
          ? settings.background.color?.[pseudoClass]
          : undefined,
      backgroundImage: generateBgImageWithGradient({
        type: settings.background?.type?.[pseudoClass],
        image: settings.background?.image?.[pseudoClass]?.url,
        angle: settings.background?.gradient?.angle?.[pseudoClass],
        color1: settings.background?.gradient?.color1?.[pseudoClass],
        color2: settings.background?.gradient?.color2?.[pseudoClass],
        location1: settings.background?.gradient?.location1?.[pseudoClass],
        location2: settings.background?.gradient?.location2?.[pseudoClass],
        position: settings.background?.gradient?.position?.[pseudoClass],
        gradientType: settings.background?.gradient?.type?.[pseudoClass],
      }),
      // boxShadow: generateBoxShadow(settings.boxShadow?.[pseudoClass]),
      boxShadow: generateBoxShadow(settings.boxShadow?.[pseudoClass]),
      ...generateDisplayStyle(breakpoints, settings.display),
    };
  });

  const responsiveStyles = generateResponsiveStyle(breakpoints, (breakpoint) => {
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
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      zIndex: settings.zIndex?.[breakpoint],
      flexOrder: settings.orderCustom?.[breakpoint] ?? settings.order?.[breakpoint],
      alignSelf: settings.alignSelf?.[breakpoint],
      flexSize: settings.size?.[breakpoint],
      flexGrow: settings.grow?.[breakpoint],
      flexShrink: settings.shrink?.[breakpoint],
      position: settings.position?.value?.[breakpoint],
      [`${settings.position?.horizontal?.[breakpoint]}`]: generateUnitValue(
        settings.position?.horizontalOffset?.[breakpoint]
      ),
      [`${settings.position?.vertical?.[breakpoint]}`]: generateUnitValue(
        settings.position?.verticalOffset?.[breakpoint]
      ),

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
          backgroundPosition: settings.background?.position?.[breakpoint]?.[pseudoClass],
          backgroundRepeat: settings.background?.repeat?.[breakpoint]?.[pseudoClass],
          backgroundSize: settings.background?.size?.[breakpoint]?.[pseudoClass],
        };
      }),
    };
  });

  return clean(
    cloneDeep({
      borderTransitionDuration: settings.border?.transitionDuration
        ? `${settings.border?.transitionDuration}ms`
        : undefined,
      ...styles,
      ...responsiveStyles,
    })
  );
}

export const generateDisplayStyle = (
  breakpoints: BreakpointConfig[],
  styles?: DisplayFieldType
) => {
  return {
    ...generateResponsiveStyle(breakpoints, (breakpoint) => {
      const value = styles?.value?.[breakpoint];

      if (!value) return {};

      if ([DisplayType.FLEX, DisplayType.INLINE_FLEX].includes(value)) {
        return {
          display: styles.value?.[breakpoint],
          flexDirection: styles?.flexDirection?.[breakpoint],
          justifyContent: styles?.justifyContent?.[breakpoint],
          alignItems: styles?.alignItems?.[breakpoint],
          flexWrap: styles?.flexWrap?.[breakpoint],
          rowGap:
            styles?.gap?.[breakpoint]?.y !== undefined
              ? `${styles?.gap?.[breakpoint]?.y}${styles?.gap?.[breakpoint]?.unit}`
              : undefined,
          columnGap:
            styles?.gap?.[breakpoint]?.x !== undefined
              ? `${styles?.gap?.[breakpoint]?.x}${styles?.gap?.[breakpoint]?.unit}`
              : undefined,
        };
      }

      return {
        display: value,
      };
    }),
  };
};

export const generateFontsUrl = (styles: string) => {
  const parseFonts = (styles: string) => {
    const matches = styles.match(/(?:font-family:\s*([^;}]+)[;}])/g);

    if (!matches) return [];

    return (
      matches
        ?.map((font) => {
          // return font.replace('font-family:', '').replace(';', '').trim();
          // replace font-family: ; and } with empty string
          return font.replace(/font-family:|;|}/g, "").trim();
        })
        //   Remove css variables
        .filter((font) => {
          return !font.startsWith("var");
        })
        //   Split individual fonts
        .flatMap((font) => {
          return font.split(",");
        })
    );
  };

  const fonts = parseFonts(styles);
  const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const uniqueFonts = [...new Set(fonts)];

  const fontFamilyParams = uniqueFonts
    .map((font) => {
      const fontFamily = `${font}:ital,wght`;
      const normalWeights = fontWeights
        .map((weight) => {
          return `0,${weight}`;
        })
        .join(";");

      const italicWeights = fontWeights
        .map((weight) => {
          return `1,${weight}`;
        })
        .join(";");

      return `${fontFamily}@${normalWeights};${italicWeights}`;
    })
    .join("&family=");

  return `https://fonts.googleapis.com/css2?family=${fontFamilyParams}&display=swap`;
};

export function generateFontSize(size?: SizeType) {
  switch (size) {
    case SizeType.SM:
      return {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
      };

    case SizeType.MD:
      return {
        fontSize: "1.2rem",
        lineHeight: "1.5rem",
      };

    case SizeType.LG:
      return {
        fontSize: "1.875rem",
        lineHeight: "2.25rem",
      };

    case SizeType.XL:
      return {
        fontSize: "2.25rem",
        lineHeight: "2.5rem",
      };

    case SizeType.XXL:
      return {
        fontSize: "3rem",
        lineHeight: "1",
      };

    default:
      return {
        fontSize: "1.5rem",
        lineHeight: "2rem",
      };
  }
}

export function generateSpacingValue(value?: SpacingValue) {
  if (!value) return {};

  const { top, bottom, right, left, unit } = value;

  if (!unit) return {};

  return {
    top: generateUnitValue({ value: top, unit }),
    right: generateUnitValue({ value: right, unit }),
    bottom: generateUnitValue({ value: bottom, unit }),
    left: generateUnitValue({ value: left, unit }),
  };
}

export function generateBgImageWithGradient({
  type: bgType,
  image: backgroundImage,
  angle: bgGradientAngle,
  color1: bgGradientColor1,
  color2: bgGradientColor2,
  location1: bgGradientLocation1,
  location2: bgGradientLocation2,
  position: bgGradientPosition,
  gradientType: bgGradientType,
}: {
  type?: BackgroundType;
  image?: string;
  angle?: UnitValue;
  color1?: string;
  color2?: string;
  location1?: UnitValue;
  location2?: UnitValue;
  position?: string;
  gradientType?: string;
}) {
  if (bgType === BackgroundType.CLASSIC && backgroundImage) {
    return `url('${backgroundImage}')`;
  }
  if (bgType === BackgroundType.GRADIENT) {
    const angle = `${bgGradientAngle?.value}${bgGradientAngle?.unit}`;
    const color1 = bgGradientColor1
      ? `${bgGradientColor1} ${bgGradientLocation1?.value}${bgGradientLocation1?.unit}`
      : "";
    const color2 = bgGradientColor2
      ? `, ${bgGradientColor2} ${bgGradientLocation2?.value}${bgGradientLocation2?.unit}`
      : "";
    const position = `${bgGradientPosition}`;

    if (bgGradientType === "linear") {
      return `linear-gradient(${angle}, ${color1}${color2})`;
    } else {
      return `radial-gradient(at ${position}, ${color1}${color2})`;
    }
  }

  return undefined;
}

export function generateBgGradient({
  type: bgType,
  angle: bgGradientAngle,
  color1: bgGradientColor1,
  color2: bgGradientColor2,
  location1: bgGradientLocation1,
  location2: bgGradientLocation2,
  position: bgGradientPosition,
  gradientType: bgGradientType,
}: {
  type?: BackgroundType;
  angle?: UnitValue;
  color1?: string;
  color2?: string;
  location1?: UnitValue;
  location2?: UnitValue;
  position?: string;
  gradientType?: string;
}) {
  if (bgType === BackgroundType.GRADIENT) {
    const angle = `${bgGradientAngle?.value}${bgGradientAngle?.unit}`;
    const color1 = bgGradientColor1
      ? `${bgGradientColor1} ${bgGradientLocation1?.value}${bgGradientLocation1?.unit}`
      : "";
    const color2 = bgGradientColor2
      ? `, ${bgGradientColor2} ${bgGradientLocation2?.value}${bgGradientLocation2?.unit}`
      : "";
    const position = `${bgGradientPosition}`;

    if (bgGradientType === "linear") {
      return `linear-gradient(${angle}, ${color1}${color2})`;
    } else {
      return `radial-gradient(at ${position}, ${color1}${color2})`;
    }
  }

  return "none";
}

export function generateUnitValue(value?: UnitValue) {
  if (value && value.value !== undefined && isUnitValue(value)) {
    return `${value.value}${value.unit}`;
  }
  return undefined;
}

export function generateBorderWidth(value?: SpacingValue) {
  if (!value) return undefined;

  return {
    borderTopWidth: generateUnitValue({ value: value.top, unit: value.unit }),
    borderRightWidth: generateUnitValue({
      value: value.right,
      unit: value.unit,
    }),
    borderBottomWidth: generateUnitValue({
      value: value.bottom,
      unit: value.unit,
    }),
    borderLeftWidth: generateUnitValue({ value: value.left, unit: value.unit }),
  };
}

export function generateBorderRadius(value?: SpacingValue) {
  if (!value) return undefined;
  return {
    borderTopLeftRadius: generateUnitValue({
      value: value.top,
      unit: value.unit,
    }),
    borderTopRightRadius: generateUnitValue({
      value: value.right,
      unit: value.unit,
    }),
    borderBottomRightRadius: generateUnitValue({
      value: value.bottom,
      unit: value.unit,
    }),
    borderBottomLeftRadius: generateUnitValue({
      value: value.left,
      unit: value.unit,
    }),
  };
}

export function generateBoxShadow(value?: BoxShadow) {
  if (!value) return undefined;

  const { color, blur, spread, horizontal, vertical, position } = value;

  const boxShadowArray: string[] = [];

  if (horizontal !== undefined || vertical !== undefined) {
    const h = horizontal !== undefined ? `${horizontal}px` : "0";
    const v = vertical !== undefined ? `${vertical}px` : "0";
    boxShadowArray.push(`${h} ${v}`);
  }

  if (blur !== undefined) {
    boxShadowArray.push(`${blur}px`);
  }

  if (spread !== undefined) {
    boxShadowArray.push(`${spread}px`);
  }

  if (color !== undefined) {
    boxShadowArray.push(color);
  }

  if (position !== undefined) {
    boxShadowArray.push(position);
  }

  return boxShadowArray.join(" ");
}

export function generateTextShadow(value?: TextShadow) {
  if (!value) return undefined;

  const { color, blur, horizontal, vertical } = value;

  const textShadowArray: string[] = [];

  if (horizontal !== undefined || vertical !== undefined) {
    const h = horizontal !== undefined ? `${horizontal}px` : "0";
    const v = vertical !== undefined ? `${vertical}px` : "0";
    textShadowArray.push(`${h} ${v}`);
  }

  if (blur !== undefined) {
    textShadowArray.push(`${blur}px`);
  }

  if (color !== undefined) {
    textShadowArray.push(color);
  }

  return textShadowArray.join(" ");
}

export function generateResponsiveVisibility({
  hideOnDesktop,
  hideOnTablet,
  hideOnMobile,
  breakpoint,
}: {
  hideOnDesktop?: boolean;
  hideOnTablet?: boolean;
  hideOnMobile?: boolean;
  breakpoint: Breakpoint;
}) {
  if (hideOnDesktop && breakpoint === Breakpoint.DESKTOP) {
    return { display: "none" };
  }
  if (hideOnTablet && breakpoint === Breakpoint.TABLET) {
    return { display: "none" };
  }
  if (hideOnMobile && breakpoint === Breakpoint.MOBILE) {
    return { display: "none" };
  }

  return { display: undefined };
}

export function generateTypography(breakpoints: BreakpointConfig[], typography?: TypographyType) {
  return {
    ...generateResponsiveStyle(breakpoints, (breakpoint) => {
      return generateTypographyFromBreakpoint(breakpoint, typography);
    }),
  };
}

export function generateTypographyFromBreakpoint(
  breakpoint: Breakpoint,
  typography?: TypographyType
): Styles {
  const fontSize =
    typography?.fontSize?.[breakpoint] ??
    typography?.fontSize?.tablet ??
    typography?.fontSize?.desktop;
  const lineHeight =
    typography?.lineHeight?.[breakpoint] ??
    typography?.lineHeight?.tablet ??
    typography?.lineHeight?.desktop;
  const letterSpacing =
    typography?.letterSpacing?.[breakpoint] ??
    typography?.letterSpacing?.tablet ??
    typography?.letterSpacing?.desktop;
  const wordSpacing =
    typography?.wordSpacing?.[breakpoint] ??
    typography?.wordSpacing?.tablet ??
    typography?.wordSpacing?.desktop;

  const fontFamily =
    typography?.fontFamily?.[breakpoint] ??
    typography?.fontFamily?.tablet ??
    typography?.fontFamily?.desktop;
  const fontWeight =
    typography?.fontWeight?.[breakpoint] ??
    typography?.fontWeight?.tablet ??
    typography?.fontWeight?.desktop;
  const textTransform =
    typography?.textTransform?.[breakpoint] ??
    typography?.textTransform?.tablet ??
    typography?.textTransform?.desktop;
  const fontStyle =
    typography?.fontStyle?.[breakpoint] ??
    typography?.fontStyle?.tablet ??
    typography?.fontStyle?.desktop;
  const textDecoration =
    typography?.textDecoration?.[breakpoint] ??
    typography?.textDecoration?.tablet ??
    typography?.textDecoration?.desktop;

  return {
    fontFamily,
    fontWeight,
    textTransform,
    fontStyle,
    textDecoration,
    fontSize: generateUnitValue(fontSize),
    lineHeight: generateUnitValue(lineHeight),
    letterSpacing: generateUnitValue(letterSpacing),
    wordSpacing: generateUnitValue(wordSpacing),
  };
}

export function generateTypographyStyles(
  key: string,
  value: TypographyType,
  breakpoints: BreakpointConfig[]
) {
  const styles: Styles = {};

  if (isEmpty(value)) {
    return styles;
  }

  // styles.fontFamily = value.fontFamily ? `var(--${key}-font-family)` : undefined;
  // styles.fontWeight = value.fontWeight ? `var(--${key}-font-weight)` : undefined;
  // styles.textTransform = value.textTransform ? `var(--${key}-text-transform)` : undefined;
  // styles.fontStyle = value.fontStyle ? `var(--${key}-font-style)` : undefined;
  // styles.textDecoration = value.textDecoration ? `var(--${key}-text-decoration)` : undefined;

  const responsiveStyles = generateResponsiveStyle(breakpoints, (breakpoint) => {
    return {
      fontFamily: !isEmpty(value.fontFamily?.[breakpoint])
        ? `var(--${key}-${breakpoint}-font-family)`
        : undefined,
      fontWeight: !isEmpty(value.fontWeight?.[breakpoint])
        ? `var(--${key}-${breakpoint}-font-weight)`
        : undefined,
      fontSize: !isEmpty(value.fontSize?.[breakpoint])
        ? `var(--${key}-${breakpoint}-font-size)`
        : undefined,
      textTransform: !isEmpty(value.textTransform?.[breakpoint])
        ? `var(--${key}-${breakpoint}-text-transform)`
        : undefined,
      fontStyle: !isEmpty(value.fontStyle?.[breakpoint])
        ? `var(--${key}-${breakpoint}-font-style)`
        : undefined,
      textDecoration: !isEmpty(value.textDecoration?.[breakpoint])
        ? `var(--${key}-${breakpoint}-text-decoration)`
        : undefined,
      lineHeight: !isEmpty(value.lineHeight?.[breakpoint])
        ? `var(--${key}-${breakpoint}-line-height)`
        : undefined,
      letterSpacing: !isEmpty(value.letterSpacing?.[breakpoint])
        ? `var(--${key}-${breakpoint}-letter-spacing)`
        : undefined,
      wordSpacing: !isEmpty(value.wordSpacing?.[breakpoint])
        ? `var(--${key}-${breakpoint}-word-spacing)`
        : undefined,
    };
  });

  Object.assign(styles, responsiveStyles);

  return styles;
}
