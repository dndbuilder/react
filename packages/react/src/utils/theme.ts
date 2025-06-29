import { Breakpoint, BreakpointConfig } from "@/types/responsive";
import { PseudoClass, TypographyType } from "@/types/style";
import { createStyle } from "@/utils";
import {
  generateBoxShadow,
  generatePseudoStyle,
  generateResponsiveStyle,
  generateSpacingValue,
  generateTypographyStyles,
  generateUnitValue,
} from "@/utils/style";
import { ThemeSettings } from "@/types/theme";
import { colord } from "colord";
import { Styles } from "free-style";
import { isEmpty } from "lodash";

export const generateThemeStyles = ({
  settings,
  breakpoints,
}: {
  settings: ThemeSettings;
  breakpoints: BreakpointConfig[];
}) => {
  const { color, typography, button, link, form, customCss } = settings;

  // console.log({ h1: typography.h1, h2: typography.h2 });

  const themeVariables = {
    // Color
    ...generateColorVariables(color),

    // Typography
    ...generateTypographyVariables({
      prefix: "body",
      value: typography.body ?? {},
      breakpoints,
    }),
    ...generateTypographyVariables({
      prefix: "h1",
      value: typography.h1 ?? {},
      breakpoints,
    }),
    ...generateTypographyVariables({
      prefix: "h2",
      value: typography.h2 ?? {},
      breakpoints,
    }),
    ...generateTypographyVariables({
      prefix: "h3",
      value: typography.h3 ?? {},
      breakpoints,
    }),
    ...generateTypographyVariables({
      prefix: "h4",
      value: typography.h4 ?? {},
      breakpoints,
    }),
    ...generateTypographyVariables({
      prefix: "h5",
      value: typography.h5 ?? {},
      breakpoints,
    }),
    ...generateTypographyVariables({
      prefix: "h6",
      value: typography.h6 ?? {},
      breakpoints,
    }),

    // Typography Presets
    ...generateTypographyPresetsVariables(typography.presets ?? [], breakpoints),

    // Button
    ...generateTypographyVariables({
      prefix: "button",
      value: button.typography ?? {},
      breakpoints,
    }),
    ...generatePseudoVariables((pseudoClass) => {
      const {
        top: borderTopWidth,
        right: borderRightWidth,
        bottom: borderBottomWidth,
        left: borderLeftWidth,
      } = generateSpacingValue(button.borderWidth?.[pseudoClass]);

      const {
        top: borderTopLeftRadius,
        right: borderTopRightRadius,
        bottom: borderBottomRightRadius,
        left: borderBottomLeftRadius,
      } = generateSpacingValue(button.borderRadius?.[pseudoClass]);

      return {
        [`--button-${pseudoClass}-color`]: button.color?.[pseudoClass],
        [`--button-${pseudoClass}-background-color`]: button.background?.color?.[pseudoClass],
        [`--button-${pseudoClass}-border-color`]: button.borderColor?.[pseudoClass],
        [`--button-${pseudoClass}-border-style`]: button.borderStyle?.[pseudoClass],
        // [`--button-${pseudoClass}-border-width`]: generateUnitValue(button.borderWidth?.[pseudoClass]),
        [`--button-${pseudoClass}-border-width`]: `${borderTopWidth ?? "0px"} ${borderRightWidth ?? "0px"} ${
          borderBottomWidth ?? "0px"
        } ${borderLeftWidth ?? "0px"}`,
        // [`--button-${pseudoClass}-border-radius`]: generateUnitValue(button.borderRadius?.[pseudoClass]),
        [`--button-${pseudoClass}-border-radius`]: `${borderTopLeftRadius ?? "0px"} ${borderTopRightRadius ?? "0px"} ${
          borderBottomRightRadius ?? "0px"
        } ${borderBottomLeftRadius ?? "0px"}`,
        [`--button-${pseudoClass}-box-shadow`]: generateBoxShadow(button.boxShadow?.[pseudoClass]),
      };
    }),
    ...generateResponsiveVariables(breakpoints, (breakpoint) => {
      return {
        ...generatePseudoVariables((pseudoClass) => {
          const {
            top: paddingTop,
            right: paddingRight,
            bottom: paddingBottom,
            left: paddingLeft,
          } = generateSpacingValue(button.padding?.[breakpoint]?.[pseudoClass]);
          return {
            [`--button-${pseudoClass}-${breakpoint}-padding`]: `${paddingTop ?? "0px"} ${paddingRight ?? "0px"} ${
              paddingBottom ?? "0px"
            } ${paddingLeft ?? "0px"}`,
          };
        }),
      };
    }),

    // Button Presets
    ...generateButtonPresetsVariables(button.presets ?? [], breakpoints),

    // Link
    ...generatePseudoVariables((pseudoClass) => ({
      [`--link-${pseudoClass}-color`]: link.color?.[pseudoClass],
    })),
    ...generateTypographyVariables({
      prefix: "link",
      value: link.typography ?? {},
      breakpoints,
    }),

    // Form Label
    "--label-color": form.label?.color,
    ...generateTypographyVariables({
      prefix: "label",
      value: form.label?.typography ?? {},
      breakpoints,
    }),

    // Form Input
    ...generateTypographyVariables({
      prefix: "input",
      value: form.input?.typography ?? {},
      breakpoints,
    }),
    ...generatePseudoVariables((pseudoClass) => {
      return {
        [`--input-${pseudoClass}-color`]: form.input?.color?.[pseudoClass],
        [`--input-${pseudoClass}-background-color`]: form.input?.backgroundColor?.[pseudoClass],
        [`--input-${pseudoClass}-border-color`]: form.input?.borderColor?.[pseudoClass],
        [`--input-${pseudoClass}-border-style`]: form.input?.borderStyle?.[pseudoClass],
        [`--input-${pseudoClass}-border-width`]: generateUnitValue(
          form.input?.borderWidth?.[pseudoClass]
        ),
        [`--input-${pseudoClass}-border-radius`]: generateUnitValue(
          form.input?.borderRadius?.[pseudoClass]
        ),
        [`--input-${pseudoClass}-box-shadow`]: generateBoxShadow(
          form.input?.boxShadow?.[pseudoClass]
        ),
      };
    }),

    // Breakpoints
    ...generateBreakpointVariables(breakpoints),
  };

  const bodyStyles = {
    backgroundColor: color.backgroundColor && "var(--background-color)",
    color: color.textColor && "var(--text-color)",
    ...generateTypographyStyles("body", typography.body ?? {}, breakpoints),
  };

  const h1Styles = generateTypographyStyles("h1", typography.h1 ?? {}, breakpoints);

  const h2Styles = generateTypographyStyles("h2", typography.h2 ?? {}, breakpoints);

  const h3Styles = generateTypographyStyles("h3", typography.h3 ?? {}, breakpoints);

  const h4Styles = generateTypographyStyles("h4", typography.h4 ?? {}, breakpoints);

  const h5Styles = generateTypographyStyles("h5", typography.h5 ?? {}, breakpoints);

  const h6Styles = generateTypographyStyles("h6", typography.h6 ?? {}, breakpoints);

  const buttionStyles = {
    display: "inline-flex",
    ...generateTypographyStyles("button", button.typography ?? {}, breakpoints),
    ...generatePseudoStyle((pseudoClass) => ({
      color: button.color?.[pseudoClass] && `var(--button-${pseudoClass}-color)`,
      backgroundColor:
        button.background?.color?.[pseudoClass] && `var(--button-${pseudoClass}-background-color)`,
      borderColor: button.borderColor?.[pseudoClass] && `var(--button-${pseudoClass}-border-color)`,
      borderStyle: button.borderStyle?.[pseudoClass]
        ? `var(--button-${pseudoClass}-border-style)`
        : undefined,
      borderWidth: button.borderWidth?.[pseudoClass] && `var(--button-${pseudoClass}-border-width)`,
      borderRadius:
        button.borderRadius?.[pseudoClass] && `var(--button-${pseudoClass}-border-radius)`,
      boxShadow: button.boxShadow?.[pseudoClass] && `var(--button-${pseudoClass}-box-shadow)`,
    })),
    ...generateResponsiveStyle(breakpoints, (breakpoint) => ({
      ...generatePseudoStyle((pseudoClass) => ({
        padding:
          button.padding?.[breakpoint]?.[pseudoClass] &&
          `var(--button-${pseudoClass}-${breakpoint}-padding)`,
      })),
    })),
  };

  const linkStyles = {
    ...generateTypographyStyles("link", link.typography ?? {}, breakpoints),
    ...generatePseudoStyle((pseudoClass) => ({
      color: link.color?.[pseudoClass] && `var(--link-${pseudoClass}-color)`,
    })),
  };

  const labelStyles = {
    color: form.label?.color && "var(--label-color)",
    ...generateTypographyStyles("label", form.label?.typography ?? {}, breakpoints),
  };

  const inputStyles = {
    ...generateTypographyStyles("input", form.input?.typography ?? {}, breakpoints),
    ...generatePseudoStyle((pseudoClass) => ({
      color: form.input?.color?.[pseudoClass] && `var(--input-${pseudoClass}-color)`,
      backgroundColor:
        form.input?.backgroundColor?.[pseudoClass] &&
        `var(--input-${pseudoClass}-background-color)`,
      borderColor:
        form.input?.borderColor?.[pseudoClass] && `var(--input-${pseudoClass}-border-color)`,
      borderStyle: form.input?.borderStyle?.[pseudoClass]
        ? `var(--input-${pseudoClass}-border-style)`
        : undefined,
      borderWidth:
        form.input?.borderWidth?.[pseudoClass] && `var(--input-${pseudoClass}-border-width)`,
      borderRadius:
        form.input?.borderRadius?.[pseudoClass] && `var(--input-${pseudoClass}-border-radius)`,
      boxShadow: form.input?.boxShadow?.[pseudoClass] && `var(--input-${pseudoClass}-box-shadow)`,
    })),
  };

  const styles = createStyle();

  styles.register({
    $global: true,
    ":root": themeVariables,
    body: bodyStyles,
    "h1:not(.reset)": h1Styles,
    "h2:not(.reset)": h2Styles,
    "h3:not(.reset)": h3Styles,
    "h4:not(.reset)": h4Styles,
    "h5:not(.reset)": h5Styles,
    "h6:not(.reset)": h6Styles,
    // button: buttionStyles,
    // '.btn': buttionStyles,
    ["button:not(.reset)"]: buttionStyles,
    [".btn:not(.reset)"]: buttionStyles,
    "a:not(.reset)": linkStyles,
    "label:not(.reset)": labelStyles,
    // input: inputStyles,
    ['[type="checkbox"]:focus']: {
      color: "var(--accent-color)",
    },
  });

  if (customCss) {
    return styles.get() + customCss;
  }

  return styles.get();
};

export const generateColorPresetsVariables = (presets: ThemeSettings["color"]["presets"]) => {
  return presets?.reduce(
    (acc, preset) => {
      acc[`--color-preset-${preset.id}`] = preset.value;
      return acc;
    },
    {} as Record<string, string>
  );
};

export const generateColorVariables = (color: ThemeSettings["color"]) => {
  const variables: Record<string, string> = {
    // Color
    "--accent-color": color.accentColor,
    "--accent-color-50": colord(color.accentColor).lighten(0.5).toHex(),
    "--accent-color-100": colord(color.accentColor).lighten(0.3).toHex(),
    "--accent-color-200": colord(color.accentColor).lighten(0.2).toHex(),
    "--accent-color-300": colord(color.accentColor).lighten(0.15).toHex(),
    "--accent-color-400": colord(color.accentColor).lighten(0.1).toHex(),
    "--accent-color-500": color.accentColor,
    "--accent-color-600": colord(color.accentColor).darken(0.1).toHex(),
    "--accent-color-700": colord(color.accentColor).darken(0.15).toHex(),
    "--accent-color-800": colord(color.accentColor).darken(0.2).toHex(),
    "--accent-color-900": colord(color.accentColor).darken(0.3).toHex(),
    "--accent-color-950": colord(color.accentColor).darken(0.4).toHex(),

    "--background-color": color.backgroundColor,
    "--text-color": color.textColor,

    // Color Presets
    ...generateColorPresetsVariables(color.presets ?? []),
  };

  return variables;
};

export const generateTypographyVariables = ({
  prefix,
  value,
  breakpoints,
}: {
  prefix: string;
  value: TypographyType;
  breakpoints: BreakpointConfig[];
}) => {
  const variables: Styles = {};

  if (isEmpty(value)) {
    return variables;
  }

  const responsiveVariables = generateResponsiveVariables(breakpoints, (breakpoint) => {
    return {
      [`--${prefix}-${breakpoint}-font-family`]: value.fontFamily?.[breakpoint],
      [`--${prefix}-${breakpoint}-font-weight`]: value.fontWeight?.[breakpoint],
      [`--${prefix}-${breakpoint}-text-transform`]: value.textTransform?.[breakpoint],
      [`--${prefix}-${breakpoint}-font-style`]: value.fontStyle?.[breakpoint],
      [`--${prefix}-${breakpoint}-text-decoration`]: value.textDecoration?.[breakpoint],
      [`--${prefix}-${breakpoint}-font-size`]: generateUnitValue(value.fontSize?.[breakpoint]),
      [`--${prefix}-${breakpoint}-line-height`]: generateUnitValue(value.lineHeight?.[breakpoint]),
      [`--${prefix}-${breakpoint}-letter-spacing`]: generateUnitValue(
        value.letterSpacing?.[breakpoint]
      ),
      [`--${prefix}-${breakpoint}-word-spacing`]: generateUnitValue(
        value.wordSpacing?.[breakpoint]
      ),
    };
  });

  Object.assign(variables, responsiveVariables);

  return variables;
};

export const generateTypographyPresetsVariables = (
  presets: ThemeSettings["typography"]["presets"],
  breakpoints: BreakpointConfig[]
) => {
  return presets?.reduce((acc, preset) => {
    const presetVariables = generateTypographyVariables({
      prefix: `typography-preset-${preset.id}`,
      value: preset.value,
      breakpoints,
    });
    Object.assign(acc, presetVariables);
    return acc;
  }, {} as Styles);
};

export const generateButtonPresetsVariables = (
  presets: ThemeSettings["button"]["presets"],
  breakpoints: BreakpointConfig[]
) => {
  return presets?.reduce((acc, preset) => {
    const presetVariables = generatePseudoVariables((pseudoClass) => ({
      ...generateTypographyVariables({
        prefix: `button-preset-${preset.id}`,
        value: preset.value.typography ?? {},
        breakpoints,
      }),
      [`--button-preset-${preset.id}-${pseudoClass}-color`]: preset.value.color?.[pseudoClass],
      [`--button-preset-${preset.id}-${pseudoClass}-background-color`]:
        preset.value.background?.color?.[pseudoClass],
      [`--button-preset-${preset.id}-${pseudoClass}-border-color`]:
        preset.value.borderColor?.[pseudoClass],
      [`--button-preset-${preset.id}-${pseudoClass}-border-style`]:
        preset.value.borderStyle?.[pseudoClass],
      [`--button-preset-${preset.id}-${pseudoClass}-border-width`]: generateUnitValue(
        preset.value.borderWidth?.[pseudoClass]
      ),
      [`--button-preset-${preset.id}-${pseudoClass}-border-radius`]: generateUnitValue(
        preset.value.borderRadius?.[pseudoClass]
      ),
      [`--button-preset-${preset.id}-${pseudoClass}-box-shadow`]: generateBoxShadow(
        preset.value.boxShadow?.[pseudoClass]
      ),
    }));

    Object.assign(acc, presetVariables);

    const responsiveVariables = generateResponsiveVariables(breakpoints, (breakpoint) => ({
      ...generatePseudoVariables((pseudoClass) => {
        const {
          top: paddingTop,
          right: paddingRight,
          bottom: paddingBottom,
          left: paddingLeft,
        } = generateSpacingValue(preset.value.padding?.[breakpoint]?.[pseudoClass]);
        return {
          [`--button-preset-${preset.id}-${pseudoClass}-${breakpoint}-padding`]: {
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
          },
        };
      }),
    }));

    Object.assign(acc, responsiveVariables);

    return acc;
  }, {} as Styles);
};

export const generatePseudoVariables = (callback: (pseudoClass: PseudoClass) => Styles) => {
  const variables: Styles = {};

  const pseudoClasses = Object.values(PseudoClass);

  pseudoClasses.forEach((pseudoClass) => {
    const pseudoVariables = callback(pseudoClass);
    Object.assign(variables, pseudoVariables);
  });

  return variables;
};

export const generateResponsiveVariables = (
  breakpoints: BreakpointConfig[],
  callback: (breakpoint: Breakpoint) => Styles
) => {
  const variables: Styles = {};

  breakpoints.forEach((breakpoint) => {
    const breakpointVariables = callback(breakpoint.key);
    Object.assign(variables, breakpointVariables);
  });

  return variables;
};

export const generateBreakpointVariables = (breakpoints: BreakpointConfig[]) => {
  const variables: Styles = {};

  breakpoints.forEach((breakpoint) => {
    if (breakpoint.maxWidth) {
      variables[`--breakpoint-${breakpoint.key}-max-width`] = `${breakpoint.maxWidth}px`;
    }
    if (breakpoint.minWidth) {
      variables[`--breakpoint-${breakpoint.key}-min-width`] = `${breakpoint.minWidth}px`;
    }
  });

  return variables;
};
