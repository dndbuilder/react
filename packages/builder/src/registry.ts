import { BreakpointConfig } from "@/types";
import { BlockGroup, EditorBlockConfig } from "@/types/block";

/**
 * BlockRegistry class for managing block configurations
 */
export class BuilderRegistry {
  private registeredBlocks: Record<string, EditorBlockConfig> = {};

  private groupOrder: BlockGroup[] = [];

  private breakpoints: Record<string, BreakpointConfig> = {};

  /**
   * Register multiple blocks at once
   * @param blocks - Array of block configurations to register
   */
  registerBlocks(blocks: EditorBlockConfig[]) {
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
  registerBlock(block: EditorBlockConfig) {
    if (this.registeredBlocks[block.type]) {
      throw new Error(`Block type "${block.type}" already registered`);
    }
    this.registeredBlocks[block.type] = block;

    return this;
  }

  getRegisteredBlocks(): Record<string, EditorBlockConfig> {
    return this.registeredBlocks;
  }

  /**
   * Get all registered blocks
   * @returns Object containing all registered blocks
   */
  getBlocks(): EditorBlockConfig[] {
    return Object.values(this.registeredBlocks);
  }

  /**
   * Get a block by its type
   * @param type - The type of the block to retrieve
   * @returns The block configuration if found, otherwise undefined
   */
  getBlock(type: string): EditorBlockConfig {
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
  getBlocksByGroup(group: string): EditorBlockConfig[] {
    return Object.values(this.registeredBlocks).filter(
      (block) => block.group === group
    );
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
}
