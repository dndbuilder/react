/**
 * License management for the builder package
 */
import { License, LicenseTier } from "./types";
import { LicenseConfig } from "./license.config";
import { BlockType } from "@/types/block";

/**
 * Singleton class to manage the current license
 */
class LicenseManager {
  private static instance: LicenseManager;
  private currentLicense: License = { tier: LicenseTier.FREE };

  private constructor() {}

  /**
   * Get the singleton instance of the LicenseManager
   * @returns The LicenseManager instance
   */
  public static getInstance(): LicenseManager {
    if (!LicenseManager.instance) {
      LicenseManager.instance = new LicenseManager();
    }
    return LicenseManager.instance;
  }

  /**
   * Set the current license
   * @param license - The license to set
   */
  public setLicense(license: License): void {
    this.currentLicense = license;
  }

  /**
   * Get the current license
   * @returns The current license
   */
  public getLicense(): License {
    return this.currentLicense;
  }

  /**
   * Check if a block is premium
   * @param blockType - The type of block to check
   * @returns Whether the block is premium
   */
  public isBlockPremium(blockType: string): boolean {
    return LicenseConfig[LicenseTier.PREMIUM].includes(blockType as BlockType);
  }

  /**
   * Get the required license tier for a block
   * @param blockType - The type of block to check
   * @returns The required license tier for the block
   */
  public getBlockRequiredTier(blockType: string): LicenseTier {
    // Check if the block is in the PREMIUM tier
    if (LicenseConfig[LicenseTier.PREMIUM].includes(blockType as BlockType)) {
      return LicenseTier.PREMIUM;
    }

    // If not found in PREMIUM, it's a FREE block
    return LicenseTier.FREE;
  }

  /**
   * Check if a user can use a block based on their license
   * @param blockType - The type of block to check
   * @returns Whether the user can use the block
   */
  public canUseBlock(blockType: string): boolean {
    const requiredTier = this.getBlockRequiredTier(blockType);

    // If the block requires a free license, anyone can use it
    if (requiredTier === LicenseTier.FREE) {
      return true;
    }

    // If the block requires a premium license, check if the user has a premium license
    return this.currentLicense.tier === LicenseTier.PREMIUM;
  }

  /**
   * Validate a license key
   * @param licenseKey - The license key to validate
   * @returns A promise that resolves to whether the license key is valid
   */
  public validateLicense(licenseKey: string): Promise<boolean> {
    // This is a placeholder for license validation logic
    // In a real application, this would involve API calls to a license server
    return Promise.resolve(true);
  }
}

// Export the singleton instance
export const licenseManager = LicenseManager.getInstance();

export { LicenseConfig } from "./license.config";
