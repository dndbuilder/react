import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Documentation</h1>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Getting Started</h2>

            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Installation</h3>
              <p className="mb-4 text-gray-600">
                Install the DnD Builder package using your preferred package manager:
              </p>
              <div className="mb-4 rounded-md bg-gray-900 p-4">
                <code className="text-sm text-white">npm install @dnd-builder/react</code>
              </div>
              <p className="text-gray-600">Or with yarn:</p>
              <div className="rounded-md bg-gray-900 p-4">
                <code className="text-sm text-white">yarn add @dnd-builder/react</code>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Basic Usage</h3>
              <p className="mb-4 text-gray-600">
                Import and use the Builder component in your React application:
              </p>
              <div className="rounded-md bg-gray-900 p-4">
                <pre className="text-sm text-white">
                  {`import { Builder } from '@dnd-builder/react';

function App() {
  return (
    <Builder
      components={yourComponents}
      onChange={handleChange}
      value={builderState}
    />
  );
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Configuration</h3>
              <p className="mb-4 text-gray-600">
                Configure the builder with your custom components and settings:
              </p>
              <div className="rounded-md bg-gray-900 p-4">
                <pre className="text-sm text-white">
                  {`const yourComponents = {
  text: {
    component: TextComponent,
    label: 'Text',
    icon: TextIcon,
    initialData: { text: 'Hello World' }
  },
  image: {
    component: ImageComponent,
    label: 'Image',
    icon: ImageIcon,
    initialData: { src: '', alt: '' }
  }
};`}
                </pre>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Concepts</h2>

            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Components</h3>
              <p className="text-gray-600">
                Components are the building blocks of your pages. Each component has a unique type,
                properties, and can be configured through the builder interface. Components can be
                dragged and dropped to create complex layouts.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Layouts</h3>
              <p className="text-gray-600">
                Layouts define how components are arranged on the page. DnD Builder supports various
                layout types including columns, rows, and grids. Layouts can be nested to create
                complex page structures.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">State Management</h3>
              <p className="text-gray-600">
                The builder maintains its state as a JSON object that represents the structure and
                properties of all components on the page. This state can be saved, loaded, and
                manipulated programmatically.
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <a
              href="/examples"
              className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              View Examples
            </a>
            <a
              href="/tutorials"
              className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Explore Tutorials
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
