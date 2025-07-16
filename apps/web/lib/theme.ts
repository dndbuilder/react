"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { BASE_URL } from "./constants";
import { Theme } from "@dndbuilder.com/react";
import { signOut } from "next-auth/react";

/**
 * Fetches the active theme for the current user
 * @returns The active theme or null if no active theme exists
 */
export async function fetchActiveTheme(): Promise<Theme | null> {
  const session = await getServerSession(authOptions);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization header if session exists
  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/themes/active`, {
      method: "GET",
      headers,
      cache: "no-store", // Ensure we always fetch the latest theme
      next: {
        tags: ["theme"], // Tag this request for cache invalidation
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        signOut({
          callbackUrl: "/login",
        });
      }

      throw new Error(`Failed to fetch active theme: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Theme;
  } catch (error) {
    console.error("Error fetching active theme:", error);
    throw new Error("Failed to fetch active theme. Please try again later.");
  }
}

export async function saveActiveTheme(theme: Partial<Theme>): Promise<void> {
  const session = await getServerSession(authOptions);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization header if session exists
  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const response = await fetch(`${BASE_URL}/themes/active`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: theme.name,
      settings: theme.settings,
    }),
    cache: "no-store", // Ensure we always save the latest theme
    next: {
      tags: ["theme"], // Tag this request for cache invalidation
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      signOut({
        callbackUrl: "/login",
      });
    }

    throw new Error("Failed to save theme.");
  }
}
