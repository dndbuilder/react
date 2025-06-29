import { ThemeConfiguration } from "@/config";
import { BuilderConfiguration } from "@/config/builder.config";
import { Block } from "@/types/block";
import { Breakpoint } from "@/types/responsive";
import { ThemeSettings } from "@/types/theme";
import { createStyle } from "@/utils";
import { generateContentStyles, generateFontsUrl } from "@/utils/style";
import { generateThemeStyles } from "@/utils/theme";
import cssBeautify from "cssbeautify";
import { FC, memo } from "react";

export type StyleManagerProps = {
  content: Record<string, Block>;
  themeSettings?: ThemeSettings;
};

export const StyleManager: FC<StyleManagerProps> = memo(
  ({ content, themeSettings = ThemeConfiguration.settings }) => {
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
        <link href={fontsUrl} id="fonts" rel="stylesheet"></link>
        <style dangerouslySetInnerHTML={{ __html: beautifiedStyles }}></style>
        <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>
      </>
    );
  }
);

StyleManager.displayName = "StyleManager";
