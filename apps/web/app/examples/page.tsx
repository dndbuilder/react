import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Examples</h1>

          <p className="mb-8 text-xl text-gray-600">
            Explore these examples to see what you can build with DnD Builder.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                <img
                  src="https://placehold.co/600x400/e2e8f0/475569?text=Landing+Page+Example"
                  alt="Landing Page Example"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">Landing Page</h2>
              <p className="mb-4 text-gray-600">
                A complete landing page with hero section, features, pricing, and contact form.
              </p>
              <a
                href="#"
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                View Demo
              </a>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                <img
                  src="https://placehold.co/600x400/e2e8f0/475569?text=Blog+Layout+Example"
                  alt="Blog Layout Example"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">Blog Layout</h2>
              <p className="mb-4 text-gray-600">
                A blog layout with featured posts, sidebar, and newsletter signup.
              </p>
              <a
                href="#"
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                View Demo
              </a>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                <img
                  src="https://placehold.co/600x400/e2e8f0/475569?text=Product+Page+Example"
                  alt="Product Page Example"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">Product Page</h2>
              <p className="mb-4 text-gray-600">
                A product showcase with image gallery, specifications, and purchase options.
              </p>
              <a
                href="#"
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                View Demo
              </a>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="mb-4 aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                <img
                  src="https://placehold.co/600x400/e2e8f0/475569?text=Dashboard+Example"
                  alt="Dashboard Example"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">Dashboard</h2>
              <p className="mb-4 text-gray-600">
                An admin dashboard with charts, tables, and interactive components.
              </p>
              <a
                href="#"
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                View Demo
              </a>
            </div>
          </div>

          <div className="mt-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Code Example</h2>
            <p className="mb-4 text-gray-600">
              Here's how to create a simple layout with DnD Builder:
            </p>
            <div className="rounded-md bg-gray-900 p-4">
              <pre className="text-sm text-white">
                {`import { Builder, useBuilderState } from '@dnd-builder/react';
import { TextBlock, ImageBlock, ButtonBlock } from './components';

function BuilderExample() {
  const [state, setState] = useBuilderState({
    blocks: [],
    root: { id: 'root', children: [] }
  });

  const components = {
    text: TextBlock,
    image: ImageBlock,
    button: ButtonBlock
  };

  return (
    <div className="builder-container">
      <Builder
        components={components}
        value={state}
        onChange={setState}
      />
    </div>
  );
}`}
              </pre>
            </div>
          </div>

          <div className="mt-8 text-center">
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
