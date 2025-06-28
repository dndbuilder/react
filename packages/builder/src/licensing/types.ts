/**
 * License-related types for the builder package
 */

/**
 * Enum representing the available license tiers
 */
export enum LicenseTier {
  FREE = 'free',
  PREMIUM = 'premium',
}

/**
 * Interface representing a license
 */
export interface License {
  /**
   * The license tier
   */
  tier: LicenseTier;
  
  /**
   * Optional license key
   */
  key?: string;
  
  /**
   * Optional expiration date
   */
  expiresAt?: Date;
  
  /**
   * Optional list of custom blocks allowed for this license
   */
  customBlocks?: string[];
}

/**
 * Interface for block license configuration
 */
export interface BlockLicenseConfig {
  /**
   * Whether the block is premium
   */
  isPremium: boolean;
  
  /**
   * The minimum license tier required to use this block
   */
  requiredTier: LicenseTier;
}