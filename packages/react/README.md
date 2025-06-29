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
npm install @dnd-page-builder/react

# Using yarn
yarn add @dnd-page-builder/react

# Using pnpm
pnpm add @dnd-page-builder/react
```

## Quick Start

```jsx
import React from "react";
import { Builder, BuilderProvider } from "@dnd-page-builder/react";
import "@dnd-page-builder/react/dist/style.css";

function App() {
  return (
    <BuilderProvider blocks={myBlockConfigs}>
      <Builder />
    </BuilderProvider>
  );
}

export default App;
```

## Saving Content

To save content, you can use the `useContent` hook to access the editor state.

```jsx
import { useContent } from "@dnd-page-builder/react";
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
import { RenderContent } from "@dnd-page-builder/react/components/server";
async function MyPage() {
  const content = await fetchContent(); // Fetch content from your backend
  return <RenderContent content={content} />;
}
```
