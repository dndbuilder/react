"use server";

import { Block } from "@dndbuilder.com/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { BASE_URL } from "./constants";
import { revalidateTag } from "next/cache";
import { signOut } from "next-auth/react";

export type Page = {
  id?: string;
  name: string;
  content: Record<string, Block>;
};

export async function fetchPage(): Promise<Page | null> {
  const session = await getServerSession(authOptions);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization header if session exists
  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const response = await fetch(`${BASE_URL}/pages`, {
    method: "GET",
    headers,
    cache: "no-store", // Ensure we always fetch the latest content
    next: {
      tags: ["page"], // Tag this request for cache invalidation
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      signOut({
        callbackUrl: "/login",
      });
    }

    throw new Error("Failed to fetch content.");
  }

  const data = await response.json();

  // API returns an array of pages, so we'll use the first page's content
  if (data && data.length > 0 && data[0].content && Object.keys(data[0].content).length > 0) {
    return {
      id: data[0].id,
      name: data[0].name,
      content: data[0].content as Record<string, Block>,
    };
  } else {
    // Fallback to an empty content object if no content is found
    console.warn("No content found, using empty content.");
  }

  return null;
}

export async function savePage(page: Page): Promise<void> {
  const session = await getServerSession(authOptions);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization header if session exists
  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const url = page.id ? `${BASE_URL}/pages/${page.id}` : `${BASE_URL}/pages`;

  const method = page.id ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify({
      name: page.name,
      content: page.content,
    }),
  });

  revalidateTag("page"); // Invalidate the page tag to refresh cache

  if (!response.ok) {
    if (response.status === 401) {
      signOut({
        callbackUrl: "/login",
      });
    }

    throw new Error("Failed to save content.");
  }

  const data = await response.json();

  return data;
}
