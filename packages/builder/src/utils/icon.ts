import {
  iconToSVG,
  replaceIDs,
  iconToHTML,
  IconifyIcon,
  IconifyIconCustomisations,
  getIconData,
} from "@iconify/utils";

/**
 * Generate SVG string from icon data
 * @param icon The icon data to convert to SVG
 * @param customizations Optional customizations for the icon (size, color, etc.)
 * @returns SVG string or null if icon not found
 */
export const generateSVG = (
  icon: IconifyIcon,
  customizations: IconifyIconCustomisations = {}
) => {
  const svgData = iconToSVG(icon, customizations);

  const svg = iconToHTML(replaceIDs(svgData.body), svgData.attributes);

  return svg;
};
