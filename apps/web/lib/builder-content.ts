import { Block } from "@repo/builder";
import clientPromise from "./mongodb";

/**
 * Fetches the latest builder content from the database
 * @returns A promise that resolves to the builder content
 */
export async function fetchBuilderContent(): Promise<Record<string, Block>> {
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

  return content;
}