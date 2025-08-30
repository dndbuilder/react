import CustomLinkBlock from "@/components/blocks/link/link.preview";
import { fetchPage } from "@/lib/page";
import { BlockType, BuilderConfig } from "@dndbuilder.com/react";
import { RenderContent } from "@dndbuilder.com/react/components/server";
import "@dndbuilder.com/react/dist/style.css";

// async function fetchContent(): Promise<Record<string, Block>> {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api";
//   const session = await getServerSession(authOptions);

//   let content: Record<string, Block> = {};

//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//   };

//   // Add authorization header if session exists
//   if (session?.accessToken) {
//     headers["Authorization"] = `Bearer ${session.accessToken}`;
//   }

//   const response = await fetch(`${baseUrl}/pages`, {
//     method: "GET",
//     headers,
//     cache: "no-store", // Ensure we always fetch the latest content
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch content.");
//   }

//   const data = await response.json();

//   // API returns an array of pages, so we'll use the first page's content
//   if (data && data.length > 0 && data[0].content && Object.keys(data[0].content).length > 0) {
//     content = data[0].content as Record<string, Block>;
//   } else {
//     // Fallback to an empty content object if no content is found
//     console.warn("No content found, using empty content.");
//   }

//   return content;
// }

// This is a server component
export default async function PreviewPage() {
  // Fetch content from MongoDB using the utility function
  const page = await fetchPage();

  if (!page || !page.content || Object.keys(page.content).length === 0) {
    return null;
  }

  // Create a custom builder configuration that overrides the Link block
  const builderConfig: BuilderConfig = {
    blocks: [
      {
        type: BlockType.LINK,
        previewComponent: CustomLinkBlock,
      },
      // CardConfig,
    ],
  };

  return <RenderContent content={page.content} builderConfig={builderConfig} />;
}
