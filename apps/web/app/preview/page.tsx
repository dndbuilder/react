import { fetchBuilderContent } from "@/lib/builder-content";
import { RenderContent } from "@repo/builder/components/server";
import "@repo/builder/dist/builder.css";

// This is a server component
export default async function PreviewPage() {
  // Fetch content from MongoDB using the utility function
  const content = await fetchBuilderContent();

  return (
    <>
      {/* Render the content with custom builder configuration */}
      <RenderContent content={content} />
    </>
  );
}
