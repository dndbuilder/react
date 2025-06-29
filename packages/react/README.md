# Block Registration System

This directory contains the block registration system for the page builder. It provides an extensible approach for loading block configurations.

## Directory Structure

- `registry.ts`: Contains the `BlockRegistry` class for managing block configurations

## Usage

### Registering Blocks

```typescript
import { blockRegistry } from "./blocks/registry";
import { BlockGroup } from "@/types/block";
import { BannerConfig } from "@/blocks/banner";
import { ButtonConfig } from "@/blocks/button";
import { ContainerConfig } from "@/blocks/container";
// ... other block imports

// Register all blocks directly
blockRegistry.registerBlocks([
  ContainerConfig,
  HeadingConfig,
  TextConfig,
  ButtonConfig,
  // ... other blocks
]);

// Register blocks with a specific group
blockRegistry.registerBlocks([IconConfig, ImageConfig], BlockGroup.BASIC);

// Register a single block with a specific group
blockRegistry.registerBlock(SliderConfig, BlockGroup.ADVANCED);

// Export the block configuration
export const BlockConfiguration = blockRegistry.getRegisteredBlocks();
```

### Accessing Blocks by Group

```typescript
// Get all blocks organized by group
const allBlocksByGroup = blockRegistry.getBlocksByGroup();

// Get blocks from a specific group
const layoutBlocks = blockRegistry.getBlocksByGroup("Layout");
const ecommerceBlocks = blockRegistry.getBlocksByGroup("Ecommerce");

// Get a specific block config
const headingBlock = blockRegistry.getBlockConfig("heading");
```

### Conditional Block Loading

```typescript
import { blockRegistry } from "./blocks/registry";
import { BannerConfig } from "@/blocks/banner";
import { ButtonConfig } from "@/blocks/button";
// ... other block imports

// Register essential blocks (always included)
blockRegistry.registerBlocks([ContainerConfig, HeadingConfig, TextConfig, ButtonConfig]);

// Conditionally register additional blocks
if (process.env.ENABLE_ADVANCED_FEATURES === "true") {
  blockRegistry.registerBlocks([HtmlConfig, BannerConfig, SliderConfig]);
}

// Export the block configuration
export const BlockConfiguration = blockRegistry.getRegisteredBlocks();
```

### Adding Custom Blocks from a Next.js App

```typescript
// apps/web/src/lib/page-builder.ts
import { blockRegistry } from "@your-builder-package/config/blocks/registry";
import CustomBlockConfig from "../blocks/custom-block/custom-block.config";

export function registerCustomBlocks() {
  blockRegistry.registerBlocks([
    CustomBlockConfig,
    // Other custom blocks
  ]);

  return blockRegistry.getRegisteredBlocks();
}
```

### Using the Plugin System

```typescript
// apps/web/src/lib/page-builder.ts
import { blockRegistry } from "@your-builder-package/config/blocks/registry";
import { BlockGroup } from "@/types/block";
import CustomBlockConfig from "../blocks/custom-block/custom-block.config";

export function registerCustomBlocks() {
  // Register as a plugin
  blockRegistry.registerPlugin({
    name: "my-app-extension",
    blocks: [CustomBlockConfig],
    enabled: true,
  });

  // Register as a plugin with a specific group
  blockRegistry.registerPlugin(
    {
      name: "my-app-extension-advanced",
      blocks: [AdvancedCustomBlockConfig],
      enabled: true,
    },
    BlockGroup.ADVANCED
  );

  return blockRegistry.getRegisteredBlocks();
}
```

## Benefits

1. **Group Organization**: Blocks can be registered and accessed by groups
2. **Flexibility**: Access all blocks, blocks by group, or individual block configs
3. **Extensibility**: Easy to add new blocks without modifying existing files
4. **Conditional Loading**: Blocks can be conditionally loaded based on features or context
5. **Plugin Support**: Third-party blocks can be easily integrated
6. **Maintainability**: Easier to maintain as the number of blocks grows
