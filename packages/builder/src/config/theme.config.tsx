import { Breakpoint } from "@/types/responsive";
import { BackgroundType, PseudoClass, Unit } from "@/types/style";
import { createId } from "@/utils";
import { ThemeConfig } from "@/types/theme";
import colors from "tailwindcss/colors";

export const ThemeConfiguration: ThemeConfig = {
  settings: {
    layout: {},
    color: {
      backgroundColor: colors.white,
      textColor: "#000000",
      accentColor: "#1e293b",
      presets: [
        { id: createId(), name: "Primary", value: "#1e293b" },
        {
          id: createId(),
          name: "Secondary",
          value: "#cbd5e1",
        },
      ],
    },
    typography: {
      body: {
        fontFamily: { desktop: "Lato", tablet: "Lato", mobile: "Lato" },
        fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 14 } },
        fontWeight: { desktop: 500, tablet: 500, mobile: 500 },
        fontStyle: { desktop: "" },
        lineHeight: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 24 } },
        letterSpacing: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 0 } },
        wordSpacing: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 0 } },
      },
      h1: {
        fontFamily: { desktop: "Roboto", tablet: "Roboto", mobile: "Roboto" },
        fontSize: {
          [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 48 },
          [Breakpoint.MOBILE]: {
            unit: Unit.PX,
            value: 36,
          },
        },
        fontStyle: { desktop: "bold", tablet: "bold", mobile: "bold" },
        lineHeight: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 56 } },
      },
      h2: {
        fontFamily: { desktop: "Roboto", tablet: "Roboto", mobile: "Roboto" },
        fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 36 } },
        fontStyle: { desktop: "bold", tablet: "bold", mobile: "bold" },
        lineHeight: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 40 } },
      },
      h3: {
        fontFamily: { desktop: "Roboto", tablet: "Roboto", mobile: "Roboto" },
        fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 24 } },
        fontStyle: { desktop: "bold", tablet: "bold", mobile: "bold" },
        lineHeight: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 32 } },
      },
      h4: {
        fontFamily: { desktop: "Roboto", tablet: "Roboto", mobile: "Roboto" },
        fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 20 } },
        fontStyle: { desktop: "bold", tablet: "bold", mobile: "bold" },
        lineHeight: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 24 } },
      },
      h5: {
        fontFamily: { desktop: "Roboto", tablet: "Roboto", mobile: "Roboto" },
        fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 16 } },
        fontStyle: { desktop: "bold", tablet: "bold", mobile: "bold" },
        lineHeight: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 20 } },
      },
      h6: {
        fontFamily: { desktop: "Roboto", tablet: "Roboto", mobile: "Roboto" },
        fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 14 } },
        fontStyle: { desktop: "bold", tablet: "bold", mobile: "bold" },
        lineHeight: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 20 } },
      },
      presets: [
        {
          id: createId(),
          name: "Display 1",
          value: {
            fontFamily: { desktop: "Lato", tablet: "Lato", mobile: "Lato" },
            fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 16 } },
            fontWeight: { desktop: 500, tablet: 500, mobile: 500 },
            lineHeight: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 24 } },
          },
        },
      ],
    },
    button: {
      typography: {
        fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 14 } },
      },
      color: {
        [PseudoClass.DEFAULT]: colors.white,
      },
      background: {
        color: {
          [PseudoClass.DEFAULT]: "#1e293b",
          [PseudoClass.HOVER]: "#09090b",
        },
        type: {
          [PseudoClass.DEFAULT]: BackgroundType.CLASSIC,
          [PseudoClass.HOVER]: BackgroundType.CLASSIC,
        },
      },
      borderRadius: {
        default: { unit: Unit.PX, top: 5, right: 5, bottom: 5, left: 5 },
      },
      padding: {
        desktop: {
          default: {
            top: 0.5,
            right: 1,
            bottom: 0.5,
            left: 1,
            linked: true,
            unit: Unit.REM,
          },
        },
        tablet: {
          default: {
            top: 0.5,
            right: 1,
            bottom: 0.5,
            left: 1,
            linked: true,
            unit: Unit.REM,
          },
        },
        mobile: {
          default: {
            top: 0.5,
            right: 1,
            bottom: 0.5,
            left: 1,
            linked: true,
            unit: Unit.REM,
          },
        },
      },

      presets: [
        {
          id: createId(),
          name: "Primary",
          value: {
            typography: {
              fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 14 } },
              lineHeight: {
                [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 20 },
              },
            },
            background: {
              color: {
                [PseudoClass.DEFAULT]: "#1e293b",
                [PseudoClass.HOVER]: "#09090b",
              },
              type: {
                [PseudoClass.DEFAULT]: BackgroundType.CLASSIC,
                [PseudoClass.HOVER]: BackgroundType.CLASSIC,
              },
            },
          },
        },
      ],
    },
    link: {
      color: {
        [PseudoClass.DEFAULT]: "#1e293b",
        [PseudoClass.HOVER]: "#09090b",
      },
    },
    form: {
      label: {
        typography: {
          fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 14 } },
        },
        color: "#000000",
      },
      input: {
        typography: {
          fontSize: { [Breakpoint.DESKTOP]: { unit: Unit.PX, value: 14 } },
        },
        color: {
          [PseudoClass.DEFAULT]: "#000000",
          [PseudoClass.FOCUS]: "#000000",
        },
        backgroundColor: {
          [PseudoClass.DEFAULT]: colors.white,
          [PseudoClass.FOCUS]: colors.white,
        },
        borderRadius: {
          [PseudoClass.DEFAULT]: {
            unit: Unit.PX,
            top: 5,
            right: 5,
            bottom: 5,
            left: 5,
          },
          [PseudoClass.FOCUS]: {
            unit: Unit.PX,
            top: 5,
            right: 5,
            bottom: 5,
            left: 5,
          },
        },
        borderWidth: {
          [PseudoClass.DEFAULT]: {
            unit: Unit.PX,
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
          },
          [PseudoClass.FOCUS]: {
            unit: Unit.PX,
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
          },
        },
        borderColor: {
          [PseudoClass.DEFAULT]: "#E0E0E0",
          [PseudoClass.FOCUS]: "#1e293b",
        },
        boxShadow: {
          [PseudoClass.DEFAULT]: {
            horizontal: 0,
            vertical: 0,
            blur: 0,
            spread: 0,
            color: "transparent",
            position: "none",
          },
          [PseudoClass.FOCUS]: {
            horizontal: 0,
            vertical: 0,
            blur: 0,
            spread: 0,
            color: "transparent",
            position: "none",
          },
        },
        padding: {
          [Breakpoint.DESKTOP]: {
            [PseudoClass.DEFAULT]: {
              unit: Unit.PX,
              top: 8,
              right: 8,
              bottom: 8,
              left: 8,
            },
            [PseudoClass.FOCUS]: {
              unit: Unit.PX,
              top: 8,
              right: 8,
              bottom: 8,
              left: 8,
            },
          },
        },
      },
    },
  },
};
