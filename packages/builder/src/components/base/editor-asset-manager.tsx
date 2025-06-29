"use client";

import { BuilderConfiguration } from "@/config/builder.config";
import { useFrame } from "@/hooks/use-frame";
import { Block } from "@/types/block";
import { Breakpoint } from "@/types/responsive";
import { ThemeSettings } from "@/types/theme";
import { createStyle } from "@/utils";
import { generateContentStyles, generateFontsUrl } from "@/utils/style";
import { generateThemeStyles } from "@/utils/theme";
import cssBeautify from "cssbeautify";
import { FC, memo, useEffect } from "react";

export type EditorAssetManagerProps = {
  content: Record<string, Block>;
  themeSettings: ThemeSettings;
};

export const EditorAssetManager: FC<EditorAssetManagerProps> = memo(
  ({ content, themeSettings }) => {
    const { document } = useFrame();

    const breakpoints = BuilderConfiguration.getBreakpoints();

    const style = createStyle();

    style.register({
      $global: true,
      ["html, body, #builder-root, .frame-content"]: {
        height: "100%",
      },
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

    // Manage styles
    useEffect(() => {
      if (!document) return;

      const beautifiedStyles = cssBeautify(styles);

      const styleElement = document.head.querySelector("#builder-styles");

      if (styleElement) {
        styleElement.innerHTML = beautifiedStyles;
        return;
      }

      const newStyleElement = document.createElement("style");
      newStyleElement.setAttribute("id", "builder-styles");

      newStyleElement.innerHTML = beautifiedStyles;

      document.head.appendChild(newStyleElement);

      return () => {
        document.head.querySelector("#builder-styles")?.remove();
      };
    }, [document, styles]);

    // Manage fonts
    useEffect(() => {
      if (!document) return;

      const linkElement = document.head.querySelector("#fonts");

      //   Update existing link element
      if (linkElement) {
        linkElement.setAttribute("href", fontsUrl);
        return;
      }

      //   Add new link element
      const newLinkElement = document.createElement("link");
      newLinkElement.setAttribute("id", "fonts");
      newLinkElement.setAttribute("href", fontsUrl);
      newLinkElement.setAttribute("rel", "stylesheet");

      document.head.appendChild(newLinkElement);

      // Add iconify script if not already present
      const iconifyScript = document.createElement("script");
      iconifyScript.src = "https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js";
      document.head.appendChild(iconifyScript);

      return () => {
        document.head.removeChild(newLinkElement);
      };
    }, [document, fontsUrl]);

    return null;
  }
);

EditorAssetManager.displayName = "StyleManager";
