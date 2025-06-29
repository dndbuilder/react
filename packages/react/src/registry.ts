import { BreakpointConfig, BuilderConfig } from "@/types";
import { BlockGroup, BlockConfig } from "@/types/block";
import deepmerge from "deepmerge";

/**
 * BlockRegistry class for managing block configurations
 */
export class BuilderRegistry {
  private registeredBlocks: Record<string, BlockConfig> = {};

  private groupOrder: BlockGroup[] = [];

  private breakpoints: Record<string, BreakpointConfig> = {};

  /**
   * Register multiple blocks at once
   * @param blocks - Array of block configurations to register
   */
  registerBlocks(blocks: BlockConfig[]) {
    blocks.forEach((block) => {
      this.registerBlock(block);
    });
    return this;
  }

  /**
   * Register a single block configuration
   * @param block - Block configuration to register
   * @throws Error if the block type is already registered
   */
  registerBlock(block: BlockConfig) {
    if (this.registeredBlocks[block.type]) {
      throw new Error(`Block type "${block.type}" already registered`);
    }
    this.registeredBlocks[block.type] = block;

    return this;
  }

  getRegisteredBlocks(): Record<string, BlockConfig> {
    return this.registeredBlocks;
  }

  /**
   * Get all registered blocks
   * @returns Object containing all registered blocks
   */
  getBlocks(): BlockConfig[] {
    return Object.values(this.registeredBlocks);
  }

  /**
   * Get a block by its type
   * @param type - The type of the block to retrieve
   * @returns The block configuration if found, otherwise undefined
   */
  getBlock(type: string): BlockConfig {
    if (!this.registeredBlocks[type]) {
      throw new Error(`Block type "${type}" is not registered`);
    }

    return this.registeredBlocks[type];
  }

  /**
   * Get blocks by their group
   * @param group - The group to filter blocks by
   * @returns Array of blocks that belong to the specified group
   */
  getBlocksByGroup(group: string): BlockConfig[] {
    return Object.values(this.registeredBlocks).filter((block) => block.group === group);
  }

  /**
   * Get all registered block types
   * @returns Array of block type strings
   */
  getBlockTypes(): string[] {
    return Object.keys(this.registeredBlocks);
  }

  /**
   * Get all registered groups
   * @returns Array of group configurations
   */
  setGroupsOrder(groups: BlockGroup[]) {
    this.groupOrder = groups;
    return this;
  }

  /**
   * Get the order of registered groups
   * @returns Array of block groups in the order they were registered
   */
  getGroupsOrder(): BlockGroup[] {
    return this.groupOrder;
  }

  /**
   * Get the order index of a specific group
   * @param group - The group to find the order index for
   * @returns The index of the group in the registered order, or -1 if not found
   */
  getGroupOrder(group: BlockGroup): number {
    return this.groupOrder.indexOf(group);
  }

  /**
   * Get all registered breakpoints
   * @returns Object containing all registered breakpoints
   */
  registerBreakpoints(breakpoints: BreakpointConfig[]) {
    breakpoints.forEach((breakpoint) => {
      this.registerBreakpoint(breakpoint);
    });

    return this;
  }

  /**
   * Register a single breakpoint configuration
   * @param breakpoint - The breakpoint configuration to register
   * @throws Error if the breakpoint key is already registered
   */
  registerBreakpoint(breakpoint: BreakpointConfig) {
    if (this.breakpoints[breakpoint.key]) {
      throw new Error(`Breakpoint "${breakpoint.key}" is already registered`);
    }
    this.breakpoints[breakpoint.key] = breakpoint;

    return this;
  }

  /**
   * Get a specific breakpoint by its key
   * @param key - The key of the breakpoint to retrieve
   * @returns The breakpoint configuration if found, otherwise undefined
   */
  getBreakpoint(key: string): BreakpointConfig {
    if (!this.breakpoints[key]) {
      throw new Error(`Breakpoint "${key}" is not registered`);
    }
    return this.breakpoints[key];
  }

  /**
   * Get all registered breakpoints
   * @returns Array of all registered breakpoint configurations
   */
  getBreakpoints(): BreakpointConfig[] {
    return Object.values(this.breakpoints);
  }
  /**
   * Get a media query string for a specific breakpoint
   * @param key - The key of the breakpoint to generate the media query for
   * @returns Media query string for the specified breakpoint
   */
  getMediaQuery(key: string): string {
    const breakpoint = this.getBreakpoint(key);
    return `@media (max-width: ${breakpoint.maxWidth}px) and (min-width: ${breakpoint.minWidth}px)`;
  }

  /**
   * Merge custom configuration with existing configuration
   * @param config - Custom builder configuration to merge
   * @returns The BuilderRegistry instance for method chaining
   */
  mergeConfig(config: BuilderConfig): BuilderRegistry {
    // Process blocks if provided
    if (config.blocks && config.blocks.length > 0) {
      // For each block in the config
      config.blocks.forEach((block) => {
        const existingBlock = this.registeredBlocks[block.type];

        if (existingBlock) {
          // If block already exists, deep merge it with the existing one
          this.registeredBlocks[block.type] = deepmerge(existingBlock, block);
        } else {
          // If block doesn't exist, register it
          this.registerBlock(block);
        }
      });
    }

    // Process groups if provided - OVERRIDE existing order
    if (config.groups && config.groups.length > 0) {
      // Completely replace the existing group order with the new one
      this.setGroupsOrder(config.groups);
    }

    // Process breakpoints if provided
    if (config.breakpoints && config.breakpoints.length > 0) {
      // For each breakpoint in the config
      config.breakpoints.forEach((breakpoint) => {
        const existingBreakpoint = this.breakpoints[breakpoint.key];

        if (existingBreakpoint) {
          // If breakpoint already exists, deep merge it with the existing one
          this.breakpoints[breakpoint.key] = deepmerge(existingBreakpoint, breakpoint);
        } else {
          // If breakpoint doesn't exist, register it
          this.registerBreakpoint(breakpoint);
        }
      });
    }

    return this;
  }
}
