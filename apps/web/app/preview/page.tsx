import clientPromise from "@/lib/mongodb";
import { Block } from "@repo/builder";
import { StyleManager } from "@repo/builder/components";
import { RenderContent } from "@repo/builder/components/server";
import { ThemeConfiguration } from "@repo/builder/config";
import "@repo/builder/dist/builder.css";

// This is a server component
export default async function PreviewPage() {
  // Fetch content from MongoDB
  let content: Record<string, Block> = {};

  try {
    const client = await clientPromise;
    const db = client.db("pageBuilder");

    // Get the latest content
    const contentDoc = await db
      .collection("builderContent")
      .findOne({}, { sort: { _id: -1 } });

    if (contentDoc && contentDoc.data) {
      content = contentDoc.data;
    }
  } catch (error) {
    console.error("Error fetching content from database:", error);

    // We can't access localStorage on the server side
    // The client-side fallback will be handled in a client component if needed
  }

  return (
    <>
      {/* Render the content */}
      <RenderContent content={content} />

      {/* Render the StyleManager to apply styles (client component) */}
      <StyleManager
        content={content}
        themeSettings={ThemeConfiguration.settings}
      />
    </>
  );
}
