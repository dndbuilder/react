import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Tutorials</h1>

          <p className="mb-8 text-xl text-gray-600">
            Learn how to use DnD Builder with these step-by-step tutorials.
          </p>

          <div className="space-y-8">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Getting Started with DnD Builder
                </h2>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Beginner
                </span>
              </div>
              <p className="mb-4 text-gray-600">
                This tutorial walks you through setting up your first project with DnD Builder,
                creating a simple page, and exporting the result.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Setup
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Basics
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Export
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">15 min read</span>
                <a
                  href="#"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Read Tutorial
                </a>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Creating Custom Components</h2>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                  Intermediate
                </span>
              </div>
              <p className="mb-4 text-gray-600">
                Learn how to create your own custom components that can be used in the DnD Builder.
                This tutorial covers component structure, props, and integration.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Components
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  React
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Integration
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">25 min read</span>
                <a
                  href="#"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Read Tutorial
                </a>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Advanced Layouts with DnD Builder
                </h2>
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                  Advanced
                </span>
              </div>
              <p className="mb-4 text-gray-600">
                Master complex layouts using nested containers, grids, and responsive design
                techniques. This tutorial shows how to create professional-grade page layouts.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Layouts
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Responsive
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Nesting
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">30 min read</span>
                <a
                  href="#"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Read Tutorial
                </a>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Saving and Loading Builder State
                </h2>
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                  Intermediate
                </span>
              </div>
              <p className="mb-4 text-gray-600">
                Learn how to save builder state to a database and load it back. This tutorial covers
                state serialization, storage options, and best practices.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  State
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Database
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                  Persistence
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">20 min read</span>
                <a
                  href="#"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Read Tutorial
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-between">
            <a
              href="/documentation"
              className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              View Documentation
            </a>
            <a
              href="/api-reference"
              className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              API Reference
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
