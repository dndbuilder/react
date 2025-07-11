"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { BASE_URL } from "./constants";

export async function regenerateLicenseKey() {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/auth/regenerate-license-key`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to regenerate license key");
    }

    const data = await response.json();
    return data.licenseKey as string;
  } catch (error) {
    console.error("Error regenerating license key:", error);
    throw error;
  }
}
