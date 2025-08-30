import { fetchActiveTheme } from "@/lib/theme";
import "@dndbuilder.com/react/dist/style.css";
import { BuilderInterface } from "./_components/builder-interface";
import { fetchPage } from "@/lib/page";

// Server Component
export default async function BuilderPage() {
  // Fetch both resources in parallel
  const [page, theme] = await Promise.all([fetchPage(), fetchActiveTheme()]);

  // Pass the data to the client component
  return <BuilderInterface initialPage={page} initialTheme={theme} />;
}
