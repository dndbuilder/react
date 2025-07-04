# DnD Page Builder

A powerful drag-and-drop page builder for React applications. This package provides a comprehensive set of components, hooks, and utilities for building customizable page editors with a block-based approach.

## Features

- 🧩 **Block-Based Architecture**: Build pages using pre-defined or custom blocks
- 🖱️ **Drag and Drop Interface**: Intuitive drag-and-drop functionality using React DND
- 🔄 **Undo/Redo Support**: Built-in history management with Redux Undo
- 📱 **Responsive Design**: Create responsive layouts that work across devices
- 🎨 **Customizable UI**: Extensive styling options with Tailwind CSS
- 🧰 **Extensible API**: Easily extend with custom blocks and functionality
- 🔌 **Plugin System**: Support for third-party plugins and extensions
- 📦 **Tree-Shakable**: Import only what you need

## Installation

```bash
# Using npm
npm install @dndbuilder.com/react

# Using yarn
yarn add @dndbuilder.com/react

# Using pnpm
pnpm add @dndbuilder.com/react
```

## Quick Start

```jsx
import React from "react";
import { Editor, BuilderProvider } from "@dndbuilder.com/react";
import { store } from "@dndbuilder.com/react";
import "@dndbuilder.com/react/dist/style.css";

function App() {
  // Optional: Initial content for the editor
  const [initialContent, setInitialContent] = useState({});

  return (
    <BuilderProvider store={store}>
      <Editor 
        content={initialContent}
        builderConfig={editorConfig} 
      />
    </BuilderProvider>
  );
}

export default App;
```

## Saving Content

To save content, you can use the `useContent` hook to access the editor state.

```jsx
import { useContent } from "@dndbuilder.com/react";
function MyComponent() {
  const { content, saveContent } = useContent();

  const handleSave = () => {
    // Save content to your backend or local storage
    console.log("Saving content:", content);
    saveContent();
  };

  return <button onClick={handleSave}>Save Content</button>;
}
```

## Rendering Content

To render content on the frontend, use the `RenderContent` component.

```jsx
import { RenderContent } from "@dndbuilder.com/react/components/server";
async function MyPage() {
  const content = await fetchContent(); // Fetch content from your backend
  return <RenderContent content={content} />;
}
```

## Custom Block

The page builder allows you to create custom blocks or override existing block configurations.

### Creating a Custom Block

To create a custom block, you need to:

1. Create a component for your block
2. Define the block configuration using `createBlockConfig` utility
3. Include the block in your editor configuration

#### Example: Card Block

The Card block is a versatile component that can be used to display content in a structured format. Here's how it's implemented in the Testimonial block:

```jsx
// 1. Create your block component (testimonial-card.tsx)
import { FC } from "react";
import { TestimonialItemType, TestimonialSettingsType } from "../types";
import { renderPreset } from "../utils";
import { BlockMeta } from "@/types/block";

type Props = {
  data: TestimonialItemType;
  settings: TestimonialSettingsType;
  meta?: BlockMeta;
};

const TestimonialCard: FC<Props> = ({ data, settings, meta }) => {
  return renderPreset(data, settings, meta);
};

export default TestimonialCard;

// 2. Create a preset component (preset-one.tsx)
const PresetOne: FC<PresetPropsType> = ({ data, meta }) => {
  const locale = meta?.locale || "en";
  const name = data.name?.[locale];
  const position = data.position?.[locale];
  const content = data.content?.[locale];

  return (
    <figure className="testimonial-card">
      <blockquote className="review-msg text-dark-800 text-lg tracking-tight">
        <p>{content}</p>
      </blockquote>

      {data.showRating && (
        <div className="text-dark-700 mt-3 flex gap-x-1">
          <Rating count={5} value={data.rating ?? 0} size={14} />
        </div>
      )}

      <figcaption className="mt-4 flex items-center gap-x-6">
        {/* Image */}
        <div className="image-wrapper flex h-12 w-12 items-center justify-center rounded-full border">
          {data.image ? (
            <img
              className="bg-dark-50 h-full w-full rounded-full"
              src={data.image.url}
              alt={name}
            />
          ) : (
            <MdFaceRetouchingNatural className="text-dark-400 text-lg" />
          )}
        </div>

        <div className="text-sm leading-4">
          {/* Name */}
          <div className="text-dark-900 font-semibold">{name}</div>

          {/* Position */}
          {position && <div className="text-dark-600 mt-0.5">{position}</div>}
        </div>
      </figcaption>
    </figure>
  );
};

// 3. Define your block configuration (testimonial.config.ts)
import { createBlockConfig } from "@dndbuilder.com/react/utils";
import { lazy } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { TestimonialSettingsType } from "./types";

const TestimonialConfig = createBlockConfig<TestimonialSettingsType>({
  type: "testimonial",
  label: "Testimonial",
  icon: FiMessageSquare,
  component: lazy(() => import("./components/testimonial.block")),
  isVisible: () => true,
  group: "Content",
  settings: {
    // Default settings including card configuration
    card: {
      alignment: { desktop: "left" },
      backgroundColor: { desktop: { default: "#ffffff" } },
      padding: { desktop: { top: 24, right: 24, bottom: 24, left: 24 } },
      border: {
        radius: { default: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 } },
        type: { default: "solid" },
        color: { default: "#e5e7eb" },
        width: { desktop: { default: { top: 1, right: 1, bottom: 1, left: 1 } } }
      },
      boxShadow: {
        default: {
          color: "#00000014",
          horizontal: 0,
          vertical: 1,
          blur: 3,
          spread: 0,
          position: "outset"
        }
      }
    },
    // Other settings...
  },
  style: ({ settings, breakpoints }) => {
    // Generate styles for the card
    return {
      "& .testimonial-card": {
        backgroundColor: settings.card?.backgroundColor?.desktop?.default,
        textAlign: settings.card?.alignment?.desktop,
        // Other styles...
      }
    };
  },
  controls: [
    {
      label: "Style",
      component: lazy(() => import("./components/testimonial-style.control")),
    },
    {
      label: "Content",
      component: lazy(() => import("./components/testimonial-content.control")),
    },
  ],
});

export default TestimonialConfig;

// 4. Include the block in your editor configuration (editor.config.ts)
import TestimonialConfig from "../blocks/testimonial/testimonial.config";

export const editorConfig = {
  blocks: [
    TestimonialConfig,
    // Other blocks...
  ],
  // Other configuration options...
};
```

The Card block in this example has the following features:

- **Responsive Design**: Supports different layouts for different screen sizes
- **Customizable Styling**: Configure background color, padding, border, and box shadow
- **Text Alignment**: Align content left, center, or right
- **Multiple Presets**: Choose from different preset layouts
- **Hover Effects**: Apply different styles on hover using pseudo-classes

### Overriding an Existing Block

You can override the configuration of an existing block by extending the existing block configuration:

```jsx
import { BlockType } from "@dndbuilder.com/react";
import { createBlockConfig } from "@dndbuilder.com/react/utils";
import { lazy } from "react";

// Create a custom component for the existing block type
const CustomHeadingBlock = ({ settings, meta }) => {
  return (
    <h2 className="my-custom-heading-style">
      {settings.text}
    </h2>
  );
};

// Override the Heading block configuration
const CustomHeadingConfig = createBlockConfig({
  type: BlockType.HEADING, // Use the existing block type
  component: lazy(() => import("./components/custom-heading.block")),
  // Override other properties as needed
  controls: [
    {
      label: "Custom Style",
      component: lazy(() => import("./components/custom-heading-style.control")),
    },
  ],
});

// Include the overridden block in your editor configuration
export const editorConfig = {
  blocks: [
    CustomHeadingConfig,
    // Other blocks...
  ],
};

// Use the custom configuration when rendering content
function PreviewPage() {
  const content = fetchContent();
  return <RenderContent content={content} builderConfig={editorConfig} />;
}
```

You can override any property of an existing block, including:

- `component`: The component used in the editor
- `previewComponent`: The component used for preview
- `settings`: Default settings for the block
- `controls`: Controls for the block settings
- `style`: Function to generate CSS styles for the block

The custom configuration is deep-merged with the existing configuration, so you only need to specify the properties you want to override.
