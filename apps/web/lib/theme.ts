import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { BASE_URL } from "./constants";
import { Theme } from "@dndbuilder.com/react";

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
    });

    if (!response.ok) {
      if (response.status === 404) {
        // No active theme found, which is a valid state
        return null;
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

/**
 * Updates a theme's active status
 * @param id The ID of the theme to update
 * @param isActive Whether the theme should be active
 * @returns The updated theme
 */
export async function updateThemeActiveStatus({
  id,
  name,
  settings,
}: {
  id?: string;
  name: string;
  settings: Theme["settings"];
}): Promise<Theme> {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("Authentication required");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.accessToken}`,
  };

  try {
    const response = await fetch(`${BASE_URL}/themes/active`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        id,
        name,
        settings,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update theme: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Theme;
  } catch (error) {
    console.error("Error updating theme:", error);
    throw new Error("Failed to update theme. Please try again later.");
  }
}
