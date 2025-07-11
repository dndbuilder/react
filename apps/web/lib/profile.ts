"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { BASE_URL } from "./constants";

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  role: "customer" | "admin";
  licenseKey: string;
};

export async function getUserProfile() {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return (await response.json()) as UserProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export async function updateUserProfile(profileData: Partial<UserProfile>) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user profile");
    }

    return (await response.json()) as UserProfile;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

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
