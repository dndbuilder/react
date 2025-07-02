import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DnD Builder - Create Beautiful Pages with Drag and Drop",
    short_name: "DnD Builder",
    description:
      "A powerful drag-and-drop page builder for creating beautiful, responsive web pages without coding.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a202c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
