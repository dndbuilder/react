# Page Builder

A modern, extensible drag-and-drop page builder for React, built as a monorepo using pnpm workspaces and Turborepo.

## Project Structure

- **apps/web**: Next.js application that uses the page builder
- **packages/builder**: The main drag-and-drop page builder library
- **packages/config-eslint**: Shared ESLint configurations
- **packages/config-typescript**: Shared TypeScript configurations

## Features

- Drag-and-drop editor for building pages visually
- Customizable blocks (Button, Container, Drawer, Heading, Icon, Image, Link, Tabs, Text, etc.)
- Responsive design with configurable breakpoints
- Built with React, TypeScript, Tailwind CSS, and Vite
- State management with Redux Toolkit
- Extensible via custom blocks and configuration
- Monorepo structure for scalable development

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- pnpm v9.1.1 or later

### Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Build all packages:
   ```bash
   pnpm build
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```

### Package-specific Commands

#### Builder Package

```bash
cd packages/builder
pnpm build
```

#### Web Application

```bash
cd apps/web
pnpm build
pnpm start
```

## Testing

- Uses Jest and React Testing Library
- To run tests for a package:
  ```bash
  cd packages/builder
  pnpm test
  ```

## Code Style & Development

- TypeScript with strict type checking
- ESLint for linting
- Tailwind CSS for styling
- Follow feature-branch workflow and ensure all tests pass before merging

## Troubleshooting

- **Build Failures**: Clean cache with `rm -rf .turbo` and rebuild
- **Dependency Issues**: Remove `node_modules` and reinstall with `pnpm install`
- **TypeScript Errors**: Ensure code follows the shared TypeScript config

## License

MIT

## TODO

- [ ] Refactor `.reset` class to reset global styles
- [ ] Add more pre-built blocks/components
- [ ] Improve documentation and usage examples
- [ ] Add support for block-level theming
- [ ] Enhance accessibility (a11y) features
- [ ] Add export/import functionality for page data
- [ ] Add integration tests for the builder UI
- [ ] Enable collaborative editing
- [ ] Add plugin system for third-party extensions
