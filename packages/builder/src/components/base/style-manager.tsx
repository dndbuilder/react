"use client";

import { BuilderConfiguration } from "@/config/builder.config";
import { Block } from "@/types/block";
import { Breakpoint } from "@/types/responsive";
import { createStyle } from "@/utils";
import { generateContentStyles, generateFontsUrl } from "@/utils/style";
import { generateThemeStyles } from "@/utils/theme";
import { ThemeSettings } from "@/types/theme";
import cssBeautify from "cssbeautify";
import { FC, memo } from "react";
import { createPortal } from "react-dom";

export type StyleManagerProps = {
  content: Record<string, Block>;
  themeSettings: ThemeSettings;
};

export const StyleManager: FC<StyleManagerProps> = memo(
  ({ content, themeSettings }) => {
    if (typeof window === "undefined") return null;

    const breakpoints = BuilderConfiguration.getBreakpoints();

    const style = createStyle();

    style.register({
      $global: true,
      ".hide-on-desktop": {
        [BuilderConfiguration.getMediaQuery(Breakpoint.DESKTOP)]: {
          display: "none !important",
        },
      },
      ".hide-on-tablet": {
        [BuilderConfiguration.getMediaQuery(Breakpoint.TABLET)]: {
          display: "none !important",
        },
      },
      ".hide-on-mobile": {
        [BuilderConfiguration.getMediaQuery(Breakpoint.MOBILE)]: {
          display: "none !important",
        },
      },
    });

    const defaultStyles = style.get();

    const contentStyles = generateContentStyles({
      content,
      themeSettings,
      breakpoints,
      config: BuilderConfiguration.getRegisteredBlocks(),
    });

    const themeStyles = generateThemeStyles({
      settings: themeSettings,
      breakpoints,
    });

    const styles = defaultStyles + themeStyles + contentStyles;

    const fontsUrl = generateFontsUrl(styles);

    const beautifiedStyles = cssBeautify(styles);

    return (
      <>
        {createPortal(
          <>
            <link href={fontsUrl} id="fonts" rel="stylesheet"></link>
            <style
              dangerouslySetInnerHTML={{ __html: beautifiedStyles }}
            ></style>
          </>,
          document.head
        )}
      </>
    );
  }
);

StyleManager.displayName = "StyleManager";
