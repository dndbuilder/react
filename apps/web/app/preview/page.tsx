import clientPromise from "@/lib/mongodb";
import { Block } from "@dnd-page-builder/react";
import { RenderContent } from "@dnd-page-builder/react/components/server";
import "@dnd-page-builder/react/dist/style.css";

async function fetchContent(): Promise<Record<string, Block>> {
  let content: Record<string, Block> = {};

  try {
    const client = await clientPromise;
    const db = client.db("pageBuilder");

    // Get the latest content
    const contentDoc = await db.collection("builderContent").findOne({}, { sort: { _id: -1 } });

    if (contentDoc && contentDoc.data) {
      content = contentDoc.data;
    }
  } catch (error) {
    console.error("Error fetching content from database:", error);
    // We can't access localStorage on the server side
    // The client-side fallback will be handled in a client component if needed
  }

  return content;
}

// This is a server component
export default async function PreviewPage() {
  // Fetch content from MongoDB using the utility function
  const content = await fetchContent();

  return (
    <>
      {/* Render the content with custom builder configuration */}
      <RenderContent content={content} />
    </>
  );
}
