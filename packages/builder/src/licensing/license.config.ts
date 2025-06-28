/**
 * License configuration for the builder package
 */
import { BlockType } from "@/types/block";
import { LicenseTier } from "./types";

/**
 * List of premium blocks
 */
export const LicenseConfig: Record<LicenseTier, BlockType[]> = {
  [LicenseTier.FREE]: [],
  [LicenseTier.PREMIUM]: [
    // BlockType.TABS,
    // BlockType.DROPDOWN,
    // BlockType.SLIDER,
    // BlockType.DRAWER,
    // BlockType.ICON,
  ],
};
