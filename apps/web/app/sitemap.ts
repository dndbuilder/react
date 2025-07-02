import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pagebuilder.example.com";

  // Define the main pages
  const routes = [
    "",
    "/builder",
    "/preview",
    "/docs",
    "/examples",
    "/tutorials",
    "/help",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/changelog",
    "/posts",
    "/community",
  ];

  // Current date for lastModified
  const date = new Date();

  // Generate sitemap entries
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: date,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
